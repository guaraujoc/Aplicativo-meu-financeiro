import React from 'react';
import { StyleSheet} from "react-native";

import { Ionicons, FontAwesome, FontAwesome5, Foundation, MaterialIcons, Entypo } from '@expo/vector-icons';
import { IconLibrary, IconNames } from '@/components/Icons/IconTypes';

interface IconRendererProps {
    iconName: IconNames;
    iconLibrary: IconLibrary;
    size?: number;
    color?: string;
    style?: object;
}

const IconRenderer: React.FC<IconRendererProps> = ({ iconName, iconLibrary, size = 18, color = "#fff", style }) => {
    style = style ? style : styles.icon;
    switch (iconLibrary) {
    case "Ionicons":
        return <Ionicons name={iconName as keyof typeof Ionicons.glyphMap} size={size} color={color} style={style} />;
    case "FontAwesome":
        return <FontAwesome name={iconName as keyof typeof FontAwesome.glyphMap} size={size} color={color} style={style} />;
    case "FontAwesome5":
        return <FontAwesome5 name={iconName as keyof typeof FontAwesome5.glyphMap} size={size} color={color} style={style} />;
    case "Foundation":
        return <Foundation name={iconName as keyof typeof Foundation.glyphMap} size={size} color={color} style={style} />;
    case "MaterialIcons":
        return <MaterialIcons name={iconName as keyof typeof MaterialIcons.glyphMap} size={size} color={color} style={style} />;
    case "Entypo":
        return <Entypo name={iconName as keyof typeof Entypo.glyphMap} size={size} color={color} style={style} />;
    default:
        return null;
    }
};


const styles = StyleSheet.create({
    icon: {
        marginBottom: 10,
    },
});
export default IconRenderer;
