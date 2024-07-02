import { Inter_600SemiBold, useFonts } from "@expo-google-fonts/inter";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { ButtonProps } from "./types";
import { redStyles, secondaryStyles, styles } from "./styles";

export default function Button(props: ButtonProps) {
	let [fontsLoaded] = useFonts({
		Inter_600SemiBold,
	});

	if (!fontsLoaded) {
		return <View></View>;
	} else {
		if (props.secondary) {
			return (
				<TouchableOpacity
					{...props}
					style={secondaryStyles.container}
					onPressOut={props.onPress}
				>
					<Text style={secondaryStyles.text}>{props.text}</Text>
				</TouchableOpacity>
			);
		}

		if (props.red) {
			return (
				<TouchableOpacity
					{...props}
					style={redStyles.container}
					onPressOut={props.onPress}
				>
					<Text style={redStyles.text}>{props.text}</Text>
				</TouchableOpacity>
			);
		}
		
		
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
