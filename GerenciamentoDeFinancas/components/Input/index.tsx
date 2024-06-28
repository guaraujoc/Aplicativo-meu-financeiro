import {
	Inter_400Regular,
	Inter_600SemiBold,
	useFonts,
} from "@expo-google-fonts/inter";
import { Text, View, TextInput } from "react-native";
import { InputProps } from "./types";
import { styles } from "./styles";

export function Input({ label, errorMessage, ...props }: InputProps) {
	let [fontsLoaded] = useFonts({
		Inter_400Regular,
		Inter_600SemiBold,
	});

	if (!fontsLoaded) {
		return <View></View>;
	} else {
		return (
			<View>
				<Text style={styles.label}>{label}</Text>

				<TextInput
					{...props}
					placeholderTextColor={styles.inputPlaceholder.color}
					style={errorMessage ? styles.errorInput : styles.input}
				/>

				{errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
			</View>
		);
	}
}
