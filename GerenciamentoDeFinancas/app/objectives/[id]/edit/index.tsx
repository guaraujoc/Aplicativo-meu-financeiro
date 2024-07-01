import Header from "@/components/Header";
import { useGlobalContext } from "@/store";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { styles } from "./styles";
import { Input } from "@/components/Input";
import CurrencyInput from "@/components/CurrencyInput";
import Button from "@/components/Button";

export default function Index() {
	const { token } = useGlobalContext();
	const { id } = useLocalSearchParams();

	return (
		<View style={styles.container}>
			<Header title="Editar Objetivo" />

			<View style={styles.content}>
				<View style={styles.inputs}>
					<Input label="Título" placeholder="Identifique seu objetivo" />

					<CurrencyInput label="Valor total" />
				</View>

				<Button text="Salvar" onPress={() => {}} />
			</View>
		</View>
	);
}
