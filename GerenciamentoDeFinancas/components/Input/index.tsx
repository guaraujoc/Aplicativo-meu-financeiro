import {
	Inter_400Regular,
	Inter_600SemiBold,
	useFonts,
} from "@expo-google-fonts/inter";
import { Text, View, TextInput } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { InputProps } from "./types";
import { styles } from "./styles";

interface CustomInputProps extends InputProps {
    maskType?: "money" | "default";
}

export function Input({ label, errorMessage, maskType, ...props }: CustomInputProps) {
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

				{maskType === "money" ? (
                    <TextInputMask
                        type={"money"}
                        options={{
                            precision: 2,
                            separator: ',',
                            delimiter: '.',
                            unit: 'R$ ',
                            suffixUnit: ''
                        }}
                        {...props}
                        placeholderTextColor={styles.inputPlaceholder.color}
                        style={errorMessage ? styles.errorInput : styles.input}
                    />
                ) : (
                    <TextInput
                        {...props}
                        placeholderTextColor={styles.inputPlaceholder.color}
                        style={errorMessage ? styles.errorInput : styles.input}
                    />
                )}

				{errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
			</View>
		);
	}
}
