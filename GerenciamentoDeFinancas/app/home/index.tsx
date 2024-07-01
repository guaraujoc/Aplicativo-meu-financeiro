import React, { useState } from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	Alert,
	ScrollView,
} from "react-native";
import { styles } from "./styles";
import { launchImageLibrary } from "react-native-image-picker";
import Icon from "react-native-vector-icons/Ionicons";
import MenuButton from "@/components/MenuButton";
import LogoutButton from "@/components/LogoutButton";
import { useGlobalContext } from "@/store";

export default function Index() {
	const { logout } = useGlobalContext();
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
		<ScrollView
			style={styles.scrollContainer}
			contentContainerStyle={styles.container}
		>
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
					href="/Wallet"
					iconName="wallet-outline"
					iconLibrary="Ionicons"
				/>
				<MenuButton
					title="Adicionar compra"
					href="/NewTransaction"
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
					href="/objectives"
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
					href="/add-member"
					iconName="group-add"
					iconLibrary="MaterialIcons"
				/>
				<MenuButton
					title="Ajuda"
					href="/Help"
					iconName="warning-outline"
					iconLibrary="Ionicons"
				/>
				<LogoutButton
					title="Sair"
					onPressOut={logout}
					iconName="log-out-outline"
					iconLibrary="Ionicons"
				/>
			</View>
			<Text style={styles.groupTitle}>Trocar grupo</Text>
		</ScrollView>
	);
}
