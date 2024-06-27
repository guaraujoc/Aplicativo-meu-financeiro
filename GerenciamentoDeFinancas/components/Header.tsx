import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

type HeaderProps = {
	title: string;
};

export default function Header({ title }: HeaderProps) {
	return (
		<View style={headerStyles.container}>
			<TouchableOpacity
				style={headerStyles.backButton}
				onPressOut={() => router.back()}
			>
				<Ionicons name="arrow-back-outline" size={28} color="#64748B" />
			</TouchableOpacity>
			<Text style={headerStyles.title}>{title}</Text>
			<View style={headerStyles.titleDecoration} />
		</View>
	);
}

const headerStyles = StyleSheet.create({
	container: {
		backgroundColor: "#FCFDFF",
		paddingTop: 48,
		paddingHorizontal: 16,
		paddingBottom: 14,
	},
	backButton: {
		marginBottom: 14,
	},
	title: {
		fontSize: 36,
		lineHeight: 40,
		fontFamily: "Poppins_600SemiBold",
		color: "#0F172A",
	},
	titleDecoration: {
		marginTop: -6,
		height: 4,
		width: 36,
		backgroundColor: "#6366F1",
		borderRadius: 2,
	},
});
