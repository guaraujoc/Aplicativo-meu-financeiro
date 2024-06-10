import { Ionicons, FontAwesome, FontAwesome5, Foundation, MaterialIcons, Entypo } from '@expo/vector-icons';

export type IconLibrary = "Ionicons" 
    | "FontAwesome" 
    | "FontAwesome5" 
    | "Foundation" 
    | "MaterialIcons" 
    | "Entypo";
    
export type IconNames =
    | keyof typeof Ionicons.glyphMap
    | keyof typeof FontAwesome.glyphMap
    | keyof typeof FontAwesome5.glyphMap
    | keyof typeof Foundation.glyphMap
    | keyof typeof MaterialIcons.glyphMap
    | keyof typeof Entypo.glyphMap;
