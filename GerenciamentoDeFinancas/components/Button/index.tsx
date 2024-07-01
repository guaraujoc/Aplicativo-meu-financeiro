import { Inter_600SemiBold, useFonts } from "@expo-google-fonts/inter";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { ButtonProps } from "./types";
import { styles } from "./styles";

export default function Button(props: ButtonProps) {
	let [fontsLoaded] = useFonts({
		Inter_600SemiBold,
	});

	if (!fontsLoaded) {
		return <View></View>;
	} else {
		return (
			<TouchableOpacity
				{...props}
				style={styles.container}
				onPressOut={props.onPress}
			>
				<Text style={styles.text}>{props.text}</Text>
			</TouchableOpacity>
		);
	}
}
