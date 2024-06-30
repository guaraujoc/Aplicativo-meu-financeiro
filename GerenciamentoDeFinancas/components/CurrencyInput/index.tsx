import {
	Inter_400Regular,
	Inter_600SemiBold,
	useFonts,
} from "@expo-google-fonts/inter";
import { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { CurrencyInputProps } from "./types";
import { styles } from "./styles";

const formatCurrency = (value: string) => {
	const numericValue = value.replace(/\D/g, "");

	const formattedValue = (Number(numericValue) / 100).toLocaleString("pt-BR", {
		style: "currency",
		currency: "BRL",
	});

	return formattedValue.replace(/R\$\s*/g, "");
};

export default function CurrencyInput({
	label,
	errorMessage,
	onChangeText,
}: CurrencyInputProps) {
	let [fontsLoaded] = useFonts({
		Inter_400Regular,
		Inter_600SemiBold,
	});

	const [value, setValue] = useState<string>("");

	const handleChange = (text: string): void => {
		setValue(formatCurrency(text));
	};

	useEffect(() => {
		if (onChangeText) {
			onChangeText(value);
		}
	}, [value]);

	if (!fontsLoaded) {
		return <View></View>;
	} else {
		return (
			<View>
				<Text style={styles.label}>{label}</Text>

				<TouchableOpacity style={styles.inputContainer}>
					<Text style={styles.dollarSign}>$</Text>

					<TextInput
						style={styles.input}
						value={value}
						onChangeText={handleChange}
						keyboardType="numeric"
						placeholder="0,00"
						placeholderTextColor="#94A3B8"
					/>
				</TouchableOpacity>

				{errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
			</View>
		);
	}
}
