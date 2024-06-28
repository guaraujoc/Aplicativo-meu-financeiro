import { Slot } from "expo-router";
import {
	useFonts as useFontsPoppins,
	Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import {
	useFonts as useFontsInter,
	Inter_400Regular,
	Inter_700Bold,
} from "@expo-google-fonts/inter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { View } from "react-native";

const queryClient = new QueryClient();

export default function AuthLayout() {
	let [fontsLoadedPoppins] = useFontsPoppins({
		Poppins_600SemiBold,
	});
	let [fontsLoadedInter] = useFontsInter({
		Inter_400Regular,
		Inter_700Bold,
	});

	if (!fontsLoadedPoppins || !fontsLoadedInter) {
		return <View></View>;
	} else {
		return (
			<QueryClientProvider client={queryClient}>
				<Slot />
			</QueryClientProvider>
		);
	}
}
