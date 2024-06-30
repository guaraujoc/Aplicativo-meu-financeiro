import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	Alert,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import Icon from "react-native-vector-icons/Ionicons";
import MenuButton from "@/components/MenuButton";

export default function Index() {
	const [profilePic, setProfilePic] = useState(null);

	const selectImage = () => {
		const options = {
			mediaType: "photo",
			maxWidth: 500,
			maxHeight: 500,
			quality: 1,
		};

		launchImageLibrary(options, (response) => {
			if (response.didCancel) {
				Alert.alert("Seleção de imagem cancelada");
			} else if (response.errorCode) {
				Alert.alert("Erro:", response.errorMessage);
			} else if (response.assets && response.assets.length > 0) {
				const source = { uri: response.assets[0].uri };
				setProfilePic(source);
			}
		});
	};

	return (
		<View style={styles.container}>
			<View style={styles.topBar}>
				<TouchableOpacity onPress={() => Alert.alert("Menu")}>
					<Icon name="menu" size={30} color="#ffffff" />
				</TouchableOpacity>
				<Text style={styles.title}>Meu financeiro</Text>
				<TouchableOpacity onPress={() => Alert.alert("Notificações")}>
					<Icon name="notifications-outline" size={30} color="#ffffff" />
				</TouchableOpacity>
			</View>
			<View style={styles.header}>
				<TouchableOpacity
					style={styles.profilePicContainer}
					onPress={selectImage}
				>
					<Image
						source={
							profilePic || {
								uri: "https://th.bing.com/th/id/OIP.zrtLj1dVMii1w9rUKyoINAAAAA?rs=1&pid=ImgDetMain",
							}
						} // URL de exemplo para a foto, substitua pela URL real ou use uma imagem local
						style={styles.profilePic}
					/>
				</TouchableOpacity>
				<View style={styles.barsContainer}>
					<Text style={styles.objectiveTitle}>Objetivo 1</Text>
					<View style={styles.bar} />
					<Text style={styles.objectiveTitle}>Objetivo 2</Text>
					<View style={styles.bar} />
					<Text style={styles.objectiveTitle}>Objetivo 3</Text>
					<View style={styles.bar} />
					<Text style={styles.objectiveTitle}>Objetivo 4</Text>
					<View style={styles.bar} />
				</View>
			</View>
			<View style={styles.familySection}>
				<Text style={styles.familyTitle}>Minha família</Text>
				<View style={styles.familyPhotosContainer}>
					{Array.from({ length: 5 }).map((_, index) => (
						<Image
							key={index}
							source={{
								uri: "https://th.bing.com/th/id/OIP.zrtLj1dVMii1w9rUKyoINAAAAA?rs=1&pid=ImgDetMain",
							}}
							style={styles.familyPhoto}
						/>
					))}
				</View>
			</View>
			<View id="Grid" style={styles.gridContainer}>
				<MenuButton
					title="Minha carteira"
					href="/WalletComposition"
					iconName="wallet-outline"
					iconLibrary="Ionicons"
				/>
				<MenuButton
					title="Adicionar compra"
					href="/AddPurchase"
					iconName="cart-outline"
					iconLibrary="Ionicons"
				/>
				<MenuButton
					title="Adicionar investimento"
					href="/AddInvestment"
					iconName="cart-outline"
					iconLibrary="Ionicons"
				/>
				<MenuButton
					title="Extrato"
					href="/Statement"
					iconName="file-invoice-dollar"
					iconLibrary="FontAwesome5"
				/>
				<MenuButton
					title="Meus objetivos"
					href="/NewObjective"
					iconName="bar-graph"
					iconLibrary="Entypo"
				/>
				<MenuButton
					title="Meus investimentos"
					href="/MyInvestments"
					iconName="bank"
					iconLibrary="FontAwesome"
				/>
				<MenuButton
					title="Adicionar membro"
					href="/AddMember"
					iconName="group-add"
					iconLibrary="MaterialIcons"
				/>
				<MenuButton
					title="Ajuda"
					href="/Help"
					iconName="warning-outline"
					iconLibrary="Ionicons"
				/>
			</View>
			<Text style={styles.groupTitle}>Trocar grupo</Text>
		</View>
	);
}

const styles = StyleSheet.create({
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
		paddingVertical: 5,
		paddingHorizontal: 10,
		backgroundColor: "#12111E",
		position: "absolute",
		top: 0,
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
		paddingTop: 70, // Adjust this value to include the top bar height and additional spacing
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
