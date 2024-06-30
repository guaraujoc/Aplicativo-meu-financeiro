import React from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import IconRenderer from "@/components/Icons/IconRenderer";
import { MenuButtonProps } from "../MenuButton/types";
import { styles } from "../MenuButton/styles";

export default function LogoutButton({
	title,
	onPressOut,
	iconName,
	iconLibrary,
}: Omit<MenuButtonProps, "href"> & Pick<TouchableOpacityProps, "onPressOut">) {
	return (
		<TouchableOpacity onPressOut={onPressOut} style={styles.menuButton}>
			<IconRenderer iconName={iconName} iconLibrary={iconLibrary} />
			<Text style={styles.menuButtonText}>{title}</Text>
		</TouchableOpacity>
	);
}
