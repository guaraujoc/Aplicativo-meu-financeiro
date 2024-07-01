import { router } from "expo-router";
import { Text, View } from "react-native";
import { ObjectiveCardProps } from "./types";
import { styles } from "./styles";
import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
	Inter_200ExtraLight,
	Inter_300Light,
	Inter_500Medium,
	useFonts,
} from "@expo-google-fonts/inter";

export default function ObjectiveCard(props: ObjectiveCardProps) {
	const formattedTotal = new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	}).format(props.objectiveData.total);

	let [fontsLoaded] = useFonts({
		Inter_200ExtraLight,
		Inter_300Light,
		Inter_500Medium,
	});
	if (!fontsLoaded) {
		return <View></View>;
	} else {
		return (
			<TouchableOpacity
				style={styles.container}
				onPress={() => router.navigate(`/objectives/${props.objectiveData.id}`)}
			>
				<Text style={styles.title}>{props.objectiveData.title}</Text>

				<View style={styles.values}>
					<Text style={styles.valueLabel}>
						total: <Text style={styles.value}>{formattedTotal}</Text>
					</Text>

					<Text style={styles.valueLabel}>
						falta: <Text style={styles.value}></Text>
					</Text>
				</View>

				<LinearGradient
					colors={["#818CF8", "#818CF8", "#E2E8F0", "#E2E8F0"]}
					locations={[0, 0.8, 0.8, 1]}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 0 }}
					style={{ height: 4, borderRadius: 4 }}
				>
					<View />
				</LinearGradient>
			</TouchableOpacity>
		);
	}
}
