import Header from "@/components/Header";
import { useGlobalContext } from "@/store";
import { router, useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { styles } from "./styles";
import { Input } from "@/components/Input";
import CurrencyInput from "@/components/CurrencyInput";
import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import { FormFields, PutObjectiveData, formValidationSchema } from "./types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { OBJECTIVES } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function Index() {
	const { token } = useGlobalContext();
	const { id } = useLocalSearchParams();
	const queryClient = useQueryClient();

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

	const putLoginData = async (data: PutObjectiveData) => {
		const res = await fetch(`${OBJECTIVES}/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(data),
		});

		if (!res.ok) {
			throw new Error("Erro ao editar objetivo");
		}

		return;
	};

	const { mutateAsync, error, isError } = useMutation({
		mutationFn: putLoginData,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["objectives"] });
			return router.back();
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
			<Header title="Editar Objetivo" />

			<View style={styles.content}>
				<View style={styles.inputs}>
					<Input
						label="Título"
						placeholder="Identifique seu objetivo"
						errorMessage={isError ? error.message : errors.title?.message}
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
