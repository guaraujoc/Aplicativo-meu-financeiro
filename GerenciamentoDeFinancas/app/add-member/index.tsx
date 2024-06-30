import React from "react";
import {
	Text,
	TextInput,
	View,
	TouchableOpacity,
	SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "./styles";

export default function Index() {
	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Adicionar Membro</Text>
			<View style={styles.form}>
				<View style={styles.inputContainer}></View>
				<View style={styles.inputContainer}></View>
				<View style={styles.inputContainer}>
					<Text style={styles.label}>E-mail</Text>
					<TextInput
						style={styles.input}
						placeholder="Insira seu e-mail"
						keyboardType="email-address"
					/>
				</View>
				<View style={styles.inputContainer}></View>
				<View style={styles.inputContainer}></View>
				<TouchableOpacity
					style={styles.button}
					onPress={() => {
						/* Lógica de adição */
					}}
				>
					<Icon name="user-plus" size={20} color="#fff" />
					<Text style={styles.buttonText}> Enviar convite</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}
