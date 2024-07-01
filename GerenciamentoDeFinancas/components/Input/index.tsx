import React, { useState } from 'react';
import {
	Inter_400Regular,
	Inter_600SemiBold,
	useFonts,
} from "@expo-google-fonts/inter";
import { Text, View, TextInput } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { InputProps } from "./types";
import { styles } from "./styles";

interface CustomInputProps extends InputProps {
    maskType?: "money" | "default";
}

export function Input({ label, errorMessage, maskType, keyboardType, placeholder, onChangeText, ...props }: CustomInputProps) {
    const [value, setValue] = useState('');
    
    let [fontsLoaded] = useFonts({
		Inter_400Regular,
		Inter_600SemiBold,
	});

	if (!fontsLoaded) {
		return <View></View>;
	} else {
		return (
            <View>
            <Text style={styles.label}>{label}</Text>

            {maskType === 'money' ? (
                <TextInputMask
                    type={'money'}
                    value={value}
                    keyboardType={keyboardType}
                    placeholder={placeholder}
                    placeholderTextColor={styles.inputPlaceholder.color}
                    style={errorMessage ? styles.errorInput : styles.input}
                    options={{
                        precision: 2,
                        separator: ',',
                        delimiter: '.',
                        unit: 'R$ ',
                        suffixUnit: ''
                    }}
                    onChangeText={(text) => {
                        setValue(text);
                        const numericValue = parseFloat(text.replace(/[^0-9,-]/g, '').replace(',', '.'));
                        onChangeText && onChangeText(text);
                    }}
                />
            ) : (
                <TextInput
                    {...props}
                    value={value}
                    keyboardType={keyboardType}
                    placeholder={placeholder}
                    placeholderTextColor={styles.inputPlaceholder.color}
                    style={errorMessage ? styles.errorInput : styles.input}
                    onChangeText={(text) => {
                        setValue(text);
                        onChangeText && onChangeText(text);
                    }}
                />
            )}

            {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
        </View>
		);
	}
}
