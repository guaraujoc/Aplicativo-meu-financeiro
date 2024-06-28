import { PropsWithChildren } from "react";
import { TextInputProps } from "react-native";

export type InputProps = PropsWithChildren<
	{
		label: string;
		errorMessage?: string;
	} & TextInputProps
>;
