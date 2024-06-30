import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		justifyContent: "flex-start",
		alignItems: "center",
		paddingTop: 40,
	},
	form: {
		width: "80%",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
	},
	inputContainer: {
		marginBottom: 20,
	},
	label: {
		marginBottom: 5,
		fontSize: 16,
	},
	input: {
		height: 40,
		borderColor: "#ccc",
		borderWidth: 1,
		paddingLeft: 10,
		borderRadius: 5,
	},
	button: {
		flexDirection: "row",
		backgroundColor: "#6C63FF",
		height: 40,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 5,
		marginTop: 20,
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		marginLeft: 10,
	},
});
