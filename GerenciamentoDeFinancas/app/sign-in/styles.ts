import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		minHeight: Dimensions.get("window").height,
		backgroundColor: "#F8FAFC",
		paddingVertical: 48,
		paddingHorizontal: 16,
	},
	title: {
		fontSize: 36,
		lineHeight: 40,
		marginBottom: 24,
		fontFamily: "Poppins_600SemiBold",
		textAlign: "center",
	},
	point: {
		color: "#6366F1",
	},
	inputs: {
		display: "flex",
		gap: 16,
		marginBottom: 32,
	},
	loginText: {
		fontFamily: "Inter_400Regular",
		fontSize: 16,
		lineHeight: 24,
		marginTop: 12,
		textAlign: "center",
		color: "#0F172A",
	},
	loginTextStrong: {
		fontFamily: "Inter_700Bold",
	},
});
