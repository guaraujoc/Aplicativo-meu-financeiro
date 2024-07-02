import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		height: 56,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#4F46E5",
		borderRadius: 8,
	},
	text: {
		fontFamily: "Inter_600SemiBold",
		fontSize: 16,
		lineHeight: 24,
		color: "#FFFFFF",
	},
});

export const secondaryStyles = StyleSheet.create({
	container: {
		height: 56,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "transparent",
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "#4F46E5"
	},
	text: {
		fontFamily: "Inter_600SemiBold",
		fontSize: 16,
		lineHeight: 24,
		color: "#4F46E5",
	},
});

export const redStyles = StyleSheet.create({
	container: {
		height: 56,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#E11D48",
		borderRadius: 8,
	},
	text: {
		fontFamily: "Inter_600SemiBold",
		fontSize: 16,
		lineHeight: 24,
		color: "white",
	},
});
