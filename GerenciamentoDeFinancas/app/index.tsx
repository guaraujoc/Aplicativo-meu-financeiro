import { Input } from "@/components/Input";
import { Link, router } from "expo-router";
import React, { useEffect } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { USERS } from "@/api";

interface FormFields {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	passwordConfirmation: string;
}

const formValidationSchema = yup.object().shape({
	firstName: yup
		.string()
		.required("O nome não pode ser vazio")
		.max(20, "O nome deve conter no máximo 20 dígitos")
		.trim(),
	lastName: yup
		.string()
		.required("O sobrenome não pode ser vazio")
		.max(20, "O sobrenome deve conter no máximo 20 dígitos")
		.trim(),
	email: yup
		.string()
		.required("O email não pode ser vazio")
		.email("Digite um email válido")
		.trim()
		.lowercase(),
	password: yup
		.string()
		.required("A senha não pode ser vazia")
		.min(6, "A senha deve conter pelo menos 6 dígitos")
		.trim(),
	passwordConfirmation: yup
		.string()
		.required("A confirmação da senha não pode ser vazia")
		.oneOf([yup.ref("password")], "As senhas devem ser iguais"),
});

export default function Index() {
	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<FormFields>({
		resolver: yupResolver(formValidationSchema),
	});

	useEffect(() => {
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
			console.log("data", data);
			router.navigate("/home");
		},
	});

	const onSubmit = async ({ passwordConfirmation, ...data }: FormFields) =>
		await mutateAsync(data);

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
					onChangeText={(text) => setValue("password", text)}
					errorMessage={errors.password?.message}
				/>

				<Input
					label="Senha"
					placeholder="Confirme sua senha"
					onChangeText={(text) => setValue("passwordConfirmation", text)}
					errorMessage={errors.passwordConfirmation?.message}
				/>
			</View>

			<Button text="Criar conta" onPress={handleSubmit(onSubmit)} />

			<Text style={styles.loginText}>
				Já possui uma conta?{" "}
				<Link href="/sign-in" style={styles.loginTextStrong}>
					Faça o login.
				</Link>
			</Text>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		minHeight: Dimensions.get("window").height,
		backgroundColor: "#F8FAFC",
		paddingTop: 48,
		paddingHorizontal: 16,
	},
	title: {
		fontSize: 36,
		lineHeight: 40,
		color: "#0F172A",
		marginBottom: 24,
		fontFamily: "Poppins_600SemiBold",
		textAlign: "center",
	},
	point: {
		color: "#6366F1",
	},
	inputs: {
		display: "flex",
		gap: 16,
		marginBottom: 32,
	},
	loginText: {
		fontFamily: "Inter_400Regular",
		fontSize: 16,
		lineHeight: 24,
		marginTop: 12,
		marginBottom: 80,
		textAlign: "center",
		color: "#0F172A",
	},
	loginTextStrong: {
		fontFamily: "Inter_700Bold",
	},
});
