import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	label: {
		fontFamily: "Inter_600SemiBold",
		fontSize: 14,
		lineHeight: 20,
		color: "#475569",
		marginBottom: 4,
	},
	inputContainer: {
		height: 56,
		paddingHorizontal: 12,
		borderWidth: 1,
		borderColor: "#94A3B8",
		borderRadius: 8,
		flexDirection: "row",
	},
	dollarSign: {
		color: "#64748B",
		fontFamily: "Inter_600SemiBold",
		fontSize: 16,
		lineHeight: 24,
		textAlignVertical: "center",
	},
	input: {
		fontFamily: "Inter_400Regular",
		fontSize: 16,
		lineHeight: 24,
		flex: 1,
		paddingLeft: 12,
		color: "#0F172A",
	},
	error: {
		fontFamily: "Inter_400Regular",
		fontSize: 12,
		lineHeight: 16,
		color: "#E11D48",
		marginTop: 2,
	},
});
