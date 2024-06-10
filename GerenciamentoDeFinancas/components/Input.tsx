import {
	Inter_400Regular,
	Inter_600SemiBold,
	useFonts,
} from "@expo-google-fonts/inter";
import { PropsWithChildren } from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";

type InputProps = PropsWithChildren<{
	label: string;
	placeholder: string;
}>;

export function Input(props: InputProps) {
	let [fontsLoaded] = useFonts({
		Inter_400Regular,
		Inter_600SemiBold,
	});

	if (!fontsLoaded) {
		return <View></View>;
	} else {
		return (
			<View>
				<Text style={styles.label}>{props.label}</Text>

				<TextInput
					placeholder={props.placeholder}
					placeholderTextColor={styles.inputPlaceholder.color}
					style={styles.input}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	label: {
		fontFamily: "Inter_600SemiBold",
		fontSize: 14,
		lineHeight: 20,
		color: "#475569",
		marginBottom: 4,
	},
	input: {
		backgroundColor: "#FFFFFF",
		fontFamily: "Inter_400Regular",
		fontSize: 16,
		lineHeight: 24,
		//color: "",
		height: 56,
		paddingHorizontal: 12,
		borderWidth: 1,
		borderColor: "#94A3B8",
		borderRadius: 8,
	},
	inputPlaceholder: {
		color: "#94A3B8",
	},
});
