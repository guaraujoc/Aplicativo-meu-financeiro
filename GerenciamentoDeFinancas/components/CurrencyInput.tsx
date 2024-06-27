import { useState } from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

const formatCurrency = (value: string) => {
	const numericValue = value.replace(/\D/g, "");

	const formattedValue = (Number(numericValue) / 100).toLocaleString("pt-BR", {
		style: "currency",
		currency: "BRL",
	});

	return formattedValue.replace(/R\$\s*/g, "");
};

type CurrencyInputProps = {
	label: string;
};

export default function CurrencyInput({ label }: CurrencyInputProps) {
	const [value, setValue] = useState<string>("");

	const handleChange = (text: string): void => {
		setValue(formatCurrency(text));
	};

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
		</View>
	);
}

const styles = StyleSheet.create({
	label: {
		fontFamily: "Inter_600SemiBold",
		fontSize: 14,
		lineHeight: 20,
		color: "#475569",
		marginBottom: 4,
	},
	inputContainer: {
		height: 56,
		paddingHorizontal: 12,
		borderWidth: 1,
		borderColor: "#94A3B8",
		borderRadius: 8,
		flexDirection: "row",
	},
	dollarSign: {
		color: "#64748B",
		fontFamily: "Inter_600SemiBold",
		fontSize: 16,
		lineHeight: 24,
		textAlignVertical: "center",
	},
	input: {
		fontFamily: "Inter_400Regular",
		fontSize: 16,
		lineHeight: 24,
		flex: 1,
		paddingLeft: 12,
		color: "#0F172A",
	},
});
