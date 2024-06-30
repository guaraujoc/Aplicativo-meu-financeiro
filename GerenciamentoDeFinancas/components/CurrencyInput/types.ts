import { TextInputProps } from "react-native";

export type CurrencyInputProps = { label: string, errorMessage?: string } & Pick<
	TextInputProps,
	"onChangeText"
>;
