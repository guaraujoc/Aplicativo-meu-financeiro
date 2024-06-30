import Button from "@/components/Button";
import CurrencyInput from "@/components/CurrencyInput";
import Header from "@/components/Header";
import { Input } from "@/components/Input";
import { View } from "react-native";
import { styles } from "./styles";
import { useForm } from "react-hook-form";
import { FormFields, PostObjectiveData, formValidationSchema } from "./types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { OBJECTIVES } from "@/api";
import { useGlobalContext } from "@/store";
import { router } from "expo-router";

export default function Index() {
	const { token } = useGlobalContext();

	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<FormFields>({
		resolver: yupResolver(formValidationSchema),
	});

	useEffect(() => {
		register("title");
		register("total");
	}, [register]);

	const postObjectiveData = async (data: PostObjectiveData) => {
		const res = await fetch(OBJECTIVES, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(data),
		});

		if (!res.ok) {
			const responseData = await res.json();
			throw new Error(responseData.message ?? "Erro ao criar objetivo");
		}

		return await res.json();
	};

	const { mutateAsync, error, isError } = useMutation({
		mutationFn: postObjectiveData,
		onSuccess: (data) => {
			console.log(data);
			router.navigate("/home");
		},
		onError: (error) => {
			console.log("erro", error);
		},
	});

	const onSubmit = async (data: FormFields) => {
		const numberTotal = Number(
			data.total.replace(/\./g, "").replace(/\,/, ".")
		);

		await mutateAsync({ title: data.title, total: numberTotal });
	};

	return (
		<View style={styles.container}>
			<Header title="Novo Objetivo" />
			<View style={styles.content}>
				<View style={styles.inputs}>
					<Input
						label="Título"
						placeholder="Identifique seu objetivo"
						errorMessage={errors.title?.message}
						onChangeText={(text) => setValue("title", text)}
					/>

					<CurrencyInput
						label="Valor total"
						errorMessage={errors.total?.message}
						onChangeText={(text) => setValue("total", text)}
					/>
				</View>

				<Button text="Salvar" onPress={handleSubmit(onSubmit)} />
			</View>
		</View>
	);
}
