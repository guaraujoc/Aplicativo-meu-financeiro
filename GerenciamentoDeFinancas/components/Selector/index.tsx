import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    FlatList,
    TextInput,
} from 'react-native';
import { styles } from './styles';
import Button from "@/components/Button";

interface SelectorProps {
    categories: string[];
    selectedCategory: string;
    onCategorySelect: (category: string) => void;
    onAddCategory: (category: string) => void;
}

const Selector: React.FC<SelectorProps> = ({ categories, selectedCategory, onCategorySelect, onAddCategory }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [newCategory, setNewCategory] = useState('');

    const handleAddCategory = () => {
        if (newCategory.trim()) {
            onAddCategory(newCategory);
            setNewCategory('');
        }
    };

    return (
        <View>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.input}>
                <Text style={styles.typeButtonText}>{selectedCategory || 'Selecione uma categoria'}</Text>
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
                                    onPress={() => { onCategorySelect(item); setModalVisible(false); }}
                                    style={styles.modalItem}>
                                    <Text style={styles.typeButtonText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TextInput
                            placeholder="Nova categoria"
                            value={newCategory}
                            onChangeText={setNewCategory}
                            style={styles.input}
                        />
                        <Button text="Adicionar" onPress={handleAddCategory} />
                        <Button text="Fechar" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Selector;
