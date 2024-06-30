import React, { useState } from "react";
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Switch,
} from "react-native";
import { styles } from "./styles";
import GoBack from "@/components/GoBack";
import { Input } from "@/components/Input";
import Selector from '@/components/Selector';
import InpurDate from '@/components/InputDate';


export default function TransactionScreen() {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("Despesa");
    const [date, setDate] = useState(new Date());
    const [category, setCategory] = useState("");
    const [isInstallment, setIsInstallment] = useState(false);
    const [installmentCount, setInstallmentCount] = useState("");
    const [categories, setCategories] = useState(['Alimentação', 'Transporte', 'Lazer', 'Educação']);

    const handleSave = () => {
        // Implement your save logic here
    };

    const handleAddCategory = (newCategory: string) => {
        setCategories([...categories, newCategory]);
    };

    const handleInstallmentCountChange = (text: string) => {
        const numericText = text.replace(/[^0-9]/g, '');
        setInstallmentCount(numericText ? numericText : '');
    };

    return (
        <ScrollView style={styles.container}>
            <GoBack />
            <Text style={styles.title}>
                Transação<Text style={styles.point}>.</Text>
            </Text>
            <View style={styles.inputs}>
                <Input
                    label="Título"
                    placeholder="Identifique sua transação"
                    value={title}
                    onChangeText={setTitle}
                    errorMessage={""}
                />
                <Input
                    label="Valor"
                    placeholder="$ 0.00"
                    value={amount}
                    onChangeText={setAmount}
                    errorMessage={""}
                    maskType="money"
                />
                <InpurDate />
                <Text style={[styles.typeButtonText]} >Tipo</Text>
                <View style={styles.typeContainer}>
                    <TouchableOpacity 
                        style={[styles.typeButton, type === "Despesa" && styles.typeButtonSelected]} 
                        onPress={() => setType("Despesa")}
                    >
                        <Text style={[styles.typeButtonText, type === "Despesa" && styles.typeButtonTextSelected]}>Despesa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.typeButton, type === "Receita" && styles.typeButtonSelected]} 
                        onPress={() => setType("Receita")}
                    >
                        <Text style={[styles.typeButtonText, type === "Receita" && styles.typeButtonTextSelected]}>Receita</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.typeButton, type === "Investimento" && styles.typeButtonSelected]} 
                        onPress={() => setType("Investimento")}
                    >
                        <Text style={[styles.typeButtonText, type === "Investimento" && styles.typeButtonTextSelected]}>Investimento</Text>
                    </TouchableOpacity>
                </View>

                <Text style={[styles.typeButtonText]} >Categoria</Text>
                {type !== 'Receita' && (
                    <>
                        <Selector
                            categories={categories}
                            selectedCategory={category}
                            onCategorySelect={setCategory}
                            onAddCategory={handleAddCategory}
                        />
                        <View style={styles.switchContainer}>
                            <Text style={[styles.typeButtonText]} >Parcelado?</Text>
                            <Switch
                                value={isInstallment}
                                onValueChange={setIsInstallment}
                            />
                        </View>
                        {isInstallment && (
                            <Input
                                label="Quantidade de parcelas"
                                placeholder="1"
                                value={installmentCount}
                                onChangeText={handleInstallmentCountChange}
                                keyboardType="numeric"
                                errorMessage={''}
                            />
                        )}
                    </>
                )}

                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
