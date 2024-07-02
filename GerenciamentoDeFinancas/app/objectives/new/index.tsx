import { useGlobalContext } from "@/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormFields, PostObjectiveData, formValidationSchema } from "./types";
import { yupResolver } from "@hookform/resolvers/yup";
import { OBJECTIVES } from "@/api";
import { router } from "expo-router";
import { View } from "react-native";
import { styles } from "./styles";
import Header from "@/components/Header";
import { Input } from "@/components/Input";
import CurrencyInput from "@/components/CurrencyInput";
import Button from "@/components/Button";

function debounce<T extends (...args: any[]) => void>(func: T, delay: number): T {
	let timeout: ReturnType<typeof setTimeout>;
  
	return function (this: any, ...args: Parameters<T>) {
	  clearTimeout(timeout);
	  timeout = setTimeout(() => func.apply(this, args), delay);
	} as T;
}

export default function Index() {
  const { token } = useGlobalContext();
  const queryClient = useQueryClient();
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
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["objectives"] });
      router.navigate("/objectives");
    },
  });

  const onSubmit = async (data: FormFields) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const numberTotal = Number(data.total.replace(/\./g, "").replace(/\,/, "."));
      await mutateAsync({ title: data.title, total: numberTotal });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Novo Objetivo" />
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
        <Button text="Salvar" onPress={debounce(handleSubmit(onSubmit), 300)} />
      </View>
    </View>
  );
}
