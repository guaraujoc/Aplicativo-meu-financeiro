import { IconLibrary, IconNames } from "@/components/Icons/IconTypes"; // Importe os tipos

export interface MenuButtonProps {
	title: string;
	href: string;
	iconName: IconNames;
	iconLibrary: IconLibrary;
}
