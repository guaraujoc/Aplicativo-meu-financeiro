import React, { useState, useEffect } from "react";
import {
	ScrollView,
	Text,
	View,
	TouchableOpacity,
	StyleSheet,
} from "react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Icon from "react-native-vector-icons/Ionicons";
import { Link, router } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { USERS } from "@/api";
import { FormFields, formValidationSchema } from "./types";
import { Input } from "@/components/Input";
import Button from "@/components/Button";
import { useGlobalContext } from "@/store";
import { styles } from "./styles";

function debounce<T extends (...args: any[]) => void>(func: T, delay: number): T {
	let timeout: ReturnType<typeof setTimeout>;

	return function (this: any, ...args: Parameters<T>) {
		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(this, args), delay);
	} as T;
}

export default function Index() {
	const { token, saveToken, user, saveUser } = useGlobalContext();
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isPasswordConfirmationVisible, setIsPasswordConfirmationVisible] =
		useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<FormFields>({
		resolver: yupResolver(formValidationSchema),
	});

	useEffect(() => {
		if (user) {
			return router.navigate("/home");
		}

		register("firstName");
		register("lastName");
		register("email");
		register("password");
		register("passwordConfirmation");
	}, [register]);

	const postUserData = async (
		data: Omit<FormFields, "passwordConfirmation">
	) => {
		const res = await fetch(USERS, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (!res.ok) {
			const responseData = await res.json();
			throw new Error(responseData.message ?? "Erro ao cadastrar usuário");
		}

		return res.json();
	};

	const { mutateAsync, error, isError } = useMutation({
		mutationFn: postUserData,
		onSuccess: (data) => {
			const { access_token, user } = data;

			saveToken(access_token);
			saveUser(user);

			router.navigate("/home");
		},
	});

	const onSubmit = async ({ passwordConfirmation, ...data }: FormFields) => {
		if (isSubmitting) return;

		setIsSubmitting(true);
		try {
			await mutateAsync(data);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<ScrollView style={styles.container}>
			<Text style={styles.title}>
				Cadastro<Text style={styles.point}>.</Text>
			</Text>

			<View style={styles.inputs}>
				<Input
					label="Primeiro nome"
					placeholder="Insira seu primeiro nome"
					onChangeText={(text) => setValue("firstName", text)}
					errorMessage={errors.firstName?.message}
				/>

				<Input
					label="Sobrenome"
					placeholder="Insira seu sobrenome"
					onChangeText={(text) => setValue("lastName", text)}
					errorMessage={errors.lastName?.message}
				/>

				<Input
					label="E-mail"
					placeholder="Insira seu e-mail"
					onChangeText={(text) => setValue("email", text)}
					errorMessage={isError ? error.message : errors.email?.message}
				/>

				<Input
					label="Senha"
					placeholder="Crie uma senha"
					secureTextEntry={!isPasswordVisible}
					onChangeText={(text) => setValue("password", text)}
					errorMessage={errors.password?.message}
				/>

				<Input
					label="Confirme sua senha"
					placeholder="Confirme sua senha"
					secureTextEntry={!isPasswordConfirmationVisible}
					onChangeText={(text) => setValue("passwordConfirmation", text)}
					errorMessage={errors.passwordConfirmation?.message}
				/>
			</View>

			<Button
				text="Criar conta"
				onPress={debounce(handleSubmit(onSubmit), 300)}
				disabled={isSubmitting}
			/>

			<Text style={styles.loginText}>
				Já possui uma conta?{" "}
				<Link href="/sign-in" style={styles.loginTextStrong}>
					Faça o login.
				</Link>
			</Text>
		</ScrollView>
	);
}