import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, Switch } from "react-native";
import { styles } from "./styles";
import { Input } from "@/components/Input";
import Selector from "@/components/Selector";
import Button from "@/components/Button";

import { TransactionFields, transactionValidationSchema } from "./types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { TRANSACTION } from "@/api";
import { useGlobalContext } from "@/store";
import Header from "@/components/Header";

export default function TransactionScreen() {
	const { token } = useGlobalContext();

	const [categories] = useState([
		"Alimentação",
		"Transporte",
		"Lazer",
		"Casa",
		"Outros",
	]);
	const [type, setType] = useState("Despesa");
	const [category, setCategory] = useState("");
	const [isInstallment, setIsInstallment] = useState(false);

	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<TransactionFields>({
		resolver: yupResolver(transactionValidationSchema),
	});

	useEffect(() => {
		register("title");
		register("amount");
		register("type");
		register("category");
		register("installmentCount");
	}, [register]);

	useEffect(() => {
		setValue("type", "Despesa");
		setValue("isInstallment", false);
		setValue("installmentCount", 1);
	}, []);

	const postTransactionData = async (data: TransactionFields) => {
		const res = await fetch(TRANSACTION, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(data),
		});

		if (!res.ok) {
			const responseData = await res.json();
			throw new Error(responseData.message ?? "Erro ao registrar transação");
		}

		return res.json();
	};

	const { mutateAsync, isError } = useMutation({
		mutationFn: postTransactionData,
		onSuccess: (data) => {
			console.log(data);
			router.navigate("/home");
		},
		onError: (e) => {
			console.log(e);
		},
	});

	const onSubmit = async (data: TransactionFields) => {
		console.log("vou enviar", data);
		await mutateAsync(data);
	};

	return (
		<ScrollView style={styles.container}>
			<Header title="Transação" />

			<View style={styles.content}>
				<View style={styles.inputs}>
					<Input
						label="Título"
						placeholder="Identifique sua transação"
						onChangeText={(text) => setValue("title", text)}
						errorMessage={isError ? undefined : errors.title?.message}
					/>

					<Input
						label="Valor"
						placeholder="R$ 0,00"
						maskType="money"
						keyboardType="numeric"
						onChangeText={(text) => {
							const numericValue = parseFloat(
								text.replace(/[^\d,-]/g, "").replace(",", ".")
							);
							setValue("amount", isNaN(numericValue) ? 0 : numericValue);
						}}
						errorMessage={isError ? undefined : errors.amount?.message}
					/>

					<Text style={[styles.typeButtonText]}>Tipo</Text>
					<View style={styles.typeContainer}>
						<TouchableOpacity
							style={[
								styles.typeButton,
								type === "Despesa" && styles.typeButtonSelected,
							]}
							onPress={() => {
								setType("Despesa");
								setValue("type", "Despesa");
							}}
						>
							<Text
								style={[
									styles.typeButtonText,
									type === "Despesa" && styles.typeButtonTextSelected,
								]}
							>
								Despesa
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[
								styles.typeButton,
								type === "Receita" && styles.typeButtonSelected,
							]}
							onPress={() => {
								setType("Receita");
								setValue("type", "Receita");
							}}
						>
							<Text
								style={[
									styles.typeButtonText,
									type === "Receita" && styles.typeButtonTextSelected,
								]}
							>
								Receita
							</Text>
						</TouchableOpacity>
					</View>

					{type !== "Receita" && (
						<>
							<Text style={[styles.typeButtonText]}>Categoria</Text>
							<Selector
								categories={categories}
								selectedCategory={category}
								onCategorySelect={(selectedCategory) => {
									setCategory(selectedCategory);
									setValue("category", selectedCategory);
								}}
								errorMessage={isError ? undefined : errors.title?.message}
							/>
							<View style={styles.switchContainer}>
								<Text style={[styles.typeButtonText]}>Parcelado?</Text>
								<Switch
									value={isInstallment}
									onValueChange={(value) => {
										setIsInstallment(value);
										setValue("isInstallment", value);
										if (value === false) {
											setValue("installmentCount", 1);
										}
									}}
								/>
							</View>

							{isInstallment && (
								<Input
									label="Quantidade de parcelas"
									placeholder="1"
									onChangeText={(text) =>
										setValue(
											"installmentCount",
											parseInt(text.replace(/[^0-9]/g, ""))
										)
									}
									keyboardType="numeric"
									errorMessage={errors.installmentCount?.message}
								/>
							)}
						</>
					)}
				</View>

				<Button text="Salvar" onPress={handleSubmit(onSubmit)} />
			</View>
		</ScrollView>
	);
}
