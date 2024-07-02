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
import { Ionicons } from "@expo/vector-icons";

export default function ObjectiveCard(props: ObjectiveCardProps) {
	const lack =
		props.objectiveData.total - props.availableBalance < 0
			? props.objectiveData.total
			: props.objectiveData.total - props.availableBalance;

	const formattedTotal = new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	}).format(props.objectiveData.total);

	const formattedLack = new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	}).format(lack);

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

					{
						props.finished
						?
						<Ionicons name="checkmark" color="green" />
						:
						<Text style={styles.valueLabel}>
						falta: <Text style={styles.value}>{formattedLack}</Text>
						</Text>
					}
					
				</View>
			</TouchableOpacity>
		);
	}
}
