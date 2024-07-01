import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		minHeight: Dimensions.get("window").height,
		backgroundColor: "#F8FAFC",
		paddingBottom: 48,
	},
	content: {
		flex: 1,
		marginTop: 24,
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
	typeContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 16,
	},
	typeButton: {
		flex: 1,
		alignItems: "center",
		padding: 10,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "#ccc",
		marginHorizontal: 5,
	},
	typeButtonSelected: {
		borderColor: "#6C63FF",
	},
	typeButtonText: {
		color: "#475569",
		fontFamily: "Inter_600SemiBold",
	},
	typeButtonTextSelected: {
		color: "#6C63FF",
	},
	switchContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 16,
	},
	saveButton: {
		backgroundColor: "#6C63FF",
		padding: 16,
		borderRadius: 8,
		alignItems: "center",
	},
	saveButtonText: {
		color: "#fff",
		fontWeight: "bold",
	},
});
