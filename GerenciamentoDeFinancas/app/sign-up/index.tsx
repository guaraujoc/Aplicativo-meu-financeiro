import { useForm } from "react-hook-form";
import { FormFields, formValidationSchema } from "./types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { USERS } from "@/api";
import { useMutation } from "@tanstack/react-query";
import { Link, router } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { styles } from "./styles";
import { Input } from "@/components/Input";
import Button from "@/components/Button";
import { useGlobalContext } from "@/store";

export default function Index() {
	const { user, saveUser } = useGlobalContext();

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
			saveUser(data);
			return router.navigate("/home");
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
