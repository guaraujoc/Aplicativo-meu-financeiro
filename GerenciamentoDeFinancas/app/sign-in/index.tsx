import Button from "@/components/Button";
import { Input } from "@/components/Input";
import { router } from "expo-router";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

export default function Index() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>
				Login<Text style={styles.point}>.</Text>
			</Text>

			<View style={styles.inputs}>
				<Input label="E-mail" placeholder="Insira seu e-mail" />

				<Input label="Senha" placeholder="Insira sua senha" />
			</View>

			<Button text="Entrar" onClick={() => router.navigate("/home")} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		minHeight: Dimensions.get("window").height,
		backgroundColor: "#F8FAFC",
		paddingVertical: 48,
		paddingHorizontal: 16,
	},
	title: {
		fontSize: 36,
		lineHeight: 40,
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
		textAlign: "center",
		color: "#0F172A",
	},
	loginTextStrong: {
		fontFamily: "Inter_700Bold",
	},
});
