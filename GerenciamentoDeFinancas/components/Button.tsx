import { Inter_600SemiBold, useFonts } from "@expo-google-fonts/inter";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";

type ButtonProps = {
	text: string;
	onClick: () => void;
	icon?: string;
};

export default function Button(props: ButtonProps) {
	let [fontsLoaded] = useFonts({
		Inter_600SemiBold,
	});

	if (!fontsLoaded) {
		return <View></View>;
	} else {
		return (
			<TouchableOpacity
				style={styles.container}
				onPressOut={props.onClick}
			>
				<Text style={styles.text}>{props.text}</Text>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		height: 56,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#4F46E5",
		borderRadius: 8,
	},
	text: {
		fontFamily: "Inter_600SemiBold",
		fontSize: 16,
		lineHeight: 24,
		color: "#FFFFFF",
	},
});
