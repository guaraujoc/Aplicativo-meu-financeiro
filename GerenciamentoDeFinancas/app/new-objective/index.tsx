import Button from "@/components/Button";
import CurrencyInput from "@/components/CurrencyInput";
import Header from "@/components/Header";
import { Input } from "@/components/Input";
import { StyleSheet, View } from "react-native";

export default function Index() {
	return (
		<View style={styles.container}>
			<Header title="Novo Objetivo" />
			<View style={styles.content}>
				<View style={styles.inputs}>
					<Input label="Título" placeholder="Identifique seu objetivo" />

					<CurrencyInput label="Valor total" />
				</View>

				<Button text="Salvar" onClick={() => {}} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		flex: 1,
		marginTop: 24,
		paddingHorizontal: 16,
		paddingBottom: 60,
		justifyContent: "space-between",
	},
	inputs: {
		gap: 16,
	},
});
