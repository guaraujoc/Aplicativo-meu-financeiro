import React, { useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { useMutation } from "@tanstack/react-query";
import { styles } from "./styles";
import Header from "@/components/Header";
import { Input } from "@/components/Input";
import Button from "@/components/Button";
import { FormFields, formValidationSchema } from "./types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGlobalContext } from "@/store";
import { MEMBERS } from "@/api";
import { router } from "expo-router";

function debounce<T extends (...args: any[]) => void>(func: T, delay: number): T {
	let timeout: ReturnType<typeof setTimeout>;

	return function (this: any, ...args: Parameters<T>) {
		clearTimeout(timeout);
		timeout = setTimeout(() => func.apply(this, args), delay);
	} as T;
}

export default function Index() {
	const { token } = useGlobalContext();
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
		register("email");
	}, [register]);

	const postNewMemberData = async (email: string) => {
		const res = await fetch(MEMBERS, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ email }),
		});

		if (!res.ok) {
			const responseData = await res.json();
			throw new Error(responseData.message ?? "Erro ao adicionar novo membro");
		}

		return;
	};

	const { mutateAsync, error, isError } = useMutation({
		mutationFn: postNewMemberData,
		onSuccess: () => {
			router.navigate("/home");
		},
	});

	const onSubmit = async (data: FormFields) => {
		if (isSubmitting) return;

		setIsSubmitting(true);
		try {
			await mutateAsync(data.email);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<Header title="Novo membro" />

			<View style={styles.content}>
				<Input
					label="E-mail"
					placeholder="E-mail do novo membro"
					keyboardType="email-address"
					errorMessage={isError ? error.message : errors.email?.message}
					onChangeText={(text) => setValue("email", text)}
				/>

				<Button
					text="Adicionar"
					onPress={debounce(handleSubmit(onSubmit), 300)}
					disabled={isSubmitting}
				/>
			</View>
		</SafeAreaView>
	);
}