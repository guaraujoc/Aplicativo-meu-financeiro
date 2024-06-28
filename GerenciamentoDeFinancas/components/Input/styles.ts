import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
		height: 56,
		paddingHorizontal: 12,
		borderWidth: 1,
		borderColor: "#94A3B8",
		borderRadius: 8,
	},
	errorInput: {
		backgroundColor: "#FFFFFF",
		fontFamily: "Inter_400Regular",
		fontSize: 16,
		lineHeight: 24,
		height: 56,
		paddingHorizontal: 12,
		borderWidth: 1,
		borderColor: "#E11D48",
		borderRadius: 8,
	},
	inputPlaceholder: {
		color: "#94A3B8",
	},
	error: {
		fontFamily: "Inter_400Regular",
		fontSize: 12,
		lineHeight: 16,
		color: "#E11D48",
		marginTop: 2,
	},
});
