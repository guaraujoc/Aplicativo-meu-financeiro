import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderColor: "#CBD5E1",
		borderRadius: 4,
		paddingTop: 8,
		paddingBottom: 6,
		paddingHorizontal: 10,
	},
	title: {
		fontFamily: "Inter_500Medium",
		color: "#4B5563",
		fontSize: 16,
		lineHeight: 24,
		textTransform: "uppercase",
		marginBottom: 6,
	},
	values: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	valueLabel: {
		fontFamily: "Inter_200ExtraLight",
		color: "#6B7280",
		fontSize: 14,
		lineHeight: 20,
	},
	value: {
		fontFamily: "Inter_300Light",
		color: "#4B5563",
		fontSize: 14,
		lineHeight: 20,
	},
});
