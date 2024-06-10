import { Input } from "@/components/Input";
import { Link, router } from "expo-router";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import {
	useFonts as useFontsPoppins,
	Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import {
	useFonts as useFontsInter,
	Inter_400Regular,
	Inter_700Bold,
} from "@expo-google-fonts/inter";
import Button from "@/components/Button";

export default function Index() {
	let [fontsLoadedPoppins] = useFontsPoppins({
		Poppins_600SemiBold,
	});
	let [fontsLoadedInter] = useFontsInter({
		Inter_400Regular,
		Inter_700Bold,
	});

	if (!fontsLoadedPoppins || !fontsLoadedInter) {
		return <View></View>;
	} else {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>
					Cadastro<Text style={styles.point}>.</Text>
				</Text>

				<View style={styles.inputs}>
					<Input
						label="Primeiro nome"
						placeholder="Insira seu primeiro nome"
					/>

					<Input
						label="Sobrenome"
						placeholder="Insira seu sobrenome"
					/>

					<Input label="E-mail" placeholder="Insira seu e-mail" />

					<Input label="Senha" placeholder="Crie uma senha" />

					<Input label="Senha" placeholder="Confirme sua senha" />
				</View>

				<Button
					text="Criar conta"
					onClick={() => router.navigate("/home")}
				/>

				<Text style={styles.loginText}>
					Já possui uma conta?{" "}
					<Link href="/sign-in" style={styles.loginTextStrong}>
						Faça o login.
					</Link>
				</Text>
			</View>
		);
	}
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
		textAlign: "center",
		color: "#0F172A",
	},
	loginTextStrong: {
		fontFamily: "Inter_700Bold",
	},
});
