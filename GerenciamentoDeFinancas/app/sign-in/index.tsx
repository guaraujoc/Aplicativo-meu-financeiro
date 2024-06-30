import Button from "@/components/Button";
import { Input } from "@/components/Input";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormFields, formValidationSchema } from "./types";
import { styles } from "./styles";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { SIGN_IN } from "@/api";
import { useGlobalContext } from "@/store";

export default function Index() {
	const { saveToken, user } = useGlobalContext();

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

		register("email");
		register("password");
	}, [register]);

	const postLoginData = async (data: FormFields) => {
		const res = await fetch(SIGN_IN, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (!res.ok) {
			const responseData = await res.json();
			throw new Error(responseData.message ?? "Erro ao autenticar usuário");
		}

		return res.json();
	};

	const { mutateAsync, error, isError } = useMutation({
		mutationFn: postLoginData,
		onSuccess: (data) => {
			const { access_token } = data;

			saveToken(access_token);

			router.navigate("/home");
		},
	});

	const onSubmit = async (data: FormFields) => await mutateAsync(data);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>
				Login<Text style={styles.point}>.</Text>
			</Text>

			<View style={styles.inputs}>
				<Input
					label="E-mail"
					placeholder="Insira seu e-mail"
					onChangeText={(text) => setValue("email", text)}
					errorMessage={isError ? undefined : errors.email?.message}
				/>

				<Input
					label="Senha"
					placeholder="Insira sua senha"
					onChangeText={(text) => setValue("password", text)}
					errorMessage={isError ? error.message : errors.password?.message}
				/>
			</View>

			<Button text="Entrar" onPress={handleSubmit(onSubmit)} />
		</View>
	);
}
