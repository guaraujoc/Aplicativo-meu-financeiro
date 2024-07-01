import React, { useState } from "react";
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Switch,
} from "react-native";
import { styles } from "./styles";
import GoBack from "@/components/GoBack";
import { Input } from "@/components/Input";
import Selector from '@/components/Selector';
import Button from "@/components/Button";

import { TransactionFields, transactionValidationSchema } from "./types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { NEW_TRANSACTION } from "@/api";

export default function TransactionScreen() {
    const [categories] = useState(['Alimentação', 'Transporte', 'Lazer', 'Casa', 'Outros']);
    const [type, setType] = useState("Despesa");
    const [category, setCategory] = useState(""); 
    const [isInstallment, setIsInstallment] = useState(false);
    const { register, setValue, handleSubmit, formState: { errors } } = useForm<TransactionFields>({
		resolver: yupResolver(transactionValidationSchema),
	});
    
    const postTransactionData = async (data: TransactionFields) => {
        const res = await fetch(NEW_TRANSACTION, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            const responseData = await res.json();
            throw new Error(responseData.message ?? "Erro ao registrar transação");
        }

        return res.json();
    };

	const { mutateAsync, error, isError } = useMutation({
		mutationFn: postTransactionData,
		onSuccess: (data) => {
			router.navigate("/home");
		},
	});

	const onSubmit = async (data: TransactionFields) => await mutateAsync(data);

    return (
        <ScrollView style={styles.container}>
            <GoBack />
            <Text style={styles.title}>
                Transação<Text style={styles.point}>.</Text>
            </Text>
            <View style={styles.inputs}>
                <Input
                    label="Título"
                    placeholder="Identifique sua transação"
                    onChangeText={(text) => setValue("title", text.trim())}
                    errorMessage={isError ? undefined : errors.title?.message}
                />
                <Input
                    label="Valor"
                    placeholder="R$ 0,00"
                    maskType="money"
                    keyboardType="numeric"
                    onChangeText={(text) => {
                        const numericValue = parseFloat(text.replace(/[^\d,-]/g, '').replace(',', '.'));
                        // console.log(numericValue)
                        setValue("amount", isNaN(numericValue) ? 0 : numericValue);
                    }}
                    errorMessage={isError ? undefined : errors.amount?.message}
                />
                {/* <InpurDate /> */}
                <Text style={[styles.typeButtonText]} >Tipo</Text>
                <View style={styles.typeContainer}>
                    <TouchableOpacity 
                        style={[styles.typeButton, type === "Despesa" && styles.typeButtonSelected]} 
                        onPress={() => { 
                            setType("Despesa");
                            setValue("type", "Despesa");
                        }}                    >
                        <Text style={[styles.typeButtonText, type === "Despesa" && styles.typeButtonTextSelected]}>Despesa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.typeButton, type === "Receita" && styles.typeButtonSelected]} 
                        onPress={() => { 
                            setType("Receita");
                            setValue("type", "Receita");
                        }}                    >
                        <Text style={[styles.typeButtonText, type === "Receita" && styles.typeButtonTextSelected]}>Receita</Text>
                    </TouchableOpacity>
                </View>

                {type !== 'Receita' && (
                    <>
                        <Text style={[styles.typeButtonText]} >Categoria</Text>
                        <Selector
                            categories={categories}
                            selectedCategory={category}
                            onCategorySelect={(selectedCategory) => {
                                setCategory(selectedCategory);
                                setValue("category", selectedCategory);
                            }}
                        />
                        <View style={styles.switchContainer}>
                            <Text style={[styles.typeButtonText]} >Parcelado?</Text>
                            <Switch
                                value={isInstallment}
                                onValueChange={(value) => {
                                    setIsInstallment(value);
                                    setValue("isInstallment", value);
                                }}
                            />
                        </View>
                        {isInstallment && (
                            <Input
                                label="Quantidade de parcelas"
                                placeholder="1"
                                onChangeText={(text) => setValue("installmentCount", parseInt(text.replace(/[^0-9]/g, '')))}                                keyboardType="numeric"
                                errorMessage={errors.installmentCount?.message}
                            />
                        )}
                    </>
                )}

                <Button text="Salvar" onPress={handleSubmit(onSubmit)} />

            </View>
        </ScrollView>
    );
}
