import React from "react";
import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import IconRenderer from '@/components/Icons/IconRenderer';
import { IconLibrary, IconNames } from '@/components/Icons/IconTypes'; // Importe os tipos

interface MenuButtonProps {
    title: string;
    href: string;
    iconName: IconNames;
    iconLibrary: IconLibrary;
}

const MenuButton: React.FC<MenuButtonProps> = ({ title, href, iconName, iconLibrary }) => {
    return (
        <Link href={href} asChild>
        <TouchableOpacity style={styles.menuButton}>
            <IconRenderer iconName={iconName} iconLibrary={iconLibrary} />
            <Text style={styles.menuButtonText}>{title}</Text>
        </TouchableOpacity>
        </Link>
    );
};

const styles = StyleSheet.create({
    menuButton: {
        backgroundColor: "#333",
        width: "30%", // Ajuste conforme necessário para o layout desejado
        height: 'auto',
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 20,
    },
    menuButtonText: {
        color: "#fff",
        textAlign: "center",
    },
});

export default MenuButton;
