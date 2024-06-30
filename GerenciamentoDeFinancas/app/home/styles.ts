import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		backgroundColor: "#1D212A",
	},
	topBar: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingTop: 48,
		paddingBottom: 5,
		paddingHorizontal: 10,
		backgroundColor: "#12111E",
	},
	title: {
		color: "#ffffff",
		fontSize: 20,
		fontWeight: "bold",
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
		width: "100%",
		paddingTop: 20, // Adjust this value to include the top bar height and additional spacing
	},
	profilePicContainer: {
		width: 150,
		height: 150,
		borderRadius: 360,
		overflow: "hidden",
		marginRight: 30,
	},
	profilePic: {
		width: "100%",
		height: "100%",
	},
	barsContainer: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "space-between",
		height: 100,
		marginRight: 20,
	},
	bar: {
		height: 10,
		borderRadius: 5,
		backgroundColor: "#cccccc",
	},
	familySection: {
		alignItems: "center",
		marginBottom: 20,
	},
	familyTitle: {
		color: "#ffffff",
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
	},
	familyPhotosContainer: {
		flexDirection: "row",
		justifyContent: "center",
		gap: 10,
	},
	familyPhoto: {
		width: 30,
		height: 30,
		borderRadius: 360,
		marginHorizontal: 5,
	},
	objectiveTitle: {
		color: "#ffffff",
		fontSize: 10,
		marginBottom: 3,
	},
	groupTitle: {
		color: "#ffffff",
		fontSize: 10,
		marginTop: 100,
		textDecorationLine: "underline",
	},
	gridContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-evenly",
		margin: 5,
		gap: 15,
	},
	text: {
		color: "#ffffff", // Adiciona cor branca ao texto para melhor contraste com o fundo escuro
	},
	menuButton: {
		width: 160, // Ajuste a largura conforme necessário
		height: 100, // Ajuste a altura conforme necessário
	},
});
