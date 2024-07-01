import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList } from "react-native";
import { styles } from "./styles";
import Button from "@/components/Button";

interface SelectorProps {
	categories: string[];
	selectedCategory: string;
	onCategorySelect: (category: string) => void;
	errorMessage?: string;
}

const Selector: React.FC<SelectorProps> = ({
	categories,
	selectedCategory,
	onCategorySelect,
	errorMessage,
}) => {
	const [modalVisible, setModalVisible] = useState(false);

	return (
		<View>
			<TouchableOpacity
				onPress={() => setModalVisible(true)}
				style={styles.input}
			>
				<Text style={styles.typeButtonText}>
					{selectedCategory || "Selecione uma categoria"}
				</Text>
			</TouchableOpacity>

			<Modal
				animationType="fade"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => setModalVisible(false)}
			>
				<View style={styles.modalContainer}>
					<View style={styles.modalContent}>
						<FlatList
							data={categories}
							keyExtractor={(item) => item}
							renderItem={({ item }) => (
								<TouchableOpacity
									onPress={() => {
										onCategorySelect(item);
										setModalVisible(false);
									}}
									style={styles.modalItem}
								>
									<Text style={styles.typeButtonText}>{item}</Text>
								</TouchableOpacity>
							)}
						/>
						<Button text="Fechar" onPress={() => setModalVisible(false)} />
					</View>
				</View>
			</Modal>
			{errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
		</View>
	);
};

export default Selector;
