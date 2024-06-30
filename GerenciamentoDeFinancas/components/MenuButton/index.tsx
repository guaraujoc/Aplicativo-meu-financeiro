import React from "react";
import { Link } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import IconRenderer from "@/components/Icons/IconRenderer";
import { MenuButtonProps } from "./types";
import { styles } from "./styles";

export default function MenuButton({
	title,
	href,
	iconName,
	iconLibrary,
}: MenuButtonProps) {
	return (
		<Link href={href} asChild >
			<TouchableOpacity style={styles.menuButton}>
				<IconRenderer iconName={iconName} iconLibrary={iconLibrary} />
				<Text style={styles.menuButtonText}>{title}</Text>
			</TouchableOpacity>
		</Link>
	);
}
