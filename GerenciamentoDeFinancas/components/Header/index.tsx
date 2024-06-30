import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { styles } from "./styles";
import { HeaderProps } from "./types";

export default function Header({ title }: HeaderProps) {
	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.backButton}
				onPressOut={() => router.back()}
			>
				<Ionicons name="arrow-back-outline" size={28} color="#64748B" />
			</TouchableOpacity>
			<Text style={styles.title}>{title}</Text>
			<View style={styles.titleDecoration} />
		</View>
	);
}
