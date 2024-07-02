import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		flex: 1,
		marginTop: 24,
		paddingHorizontal: 16,
		paddingBottom: 60,
		justifyContent: "space-between",
	},
	controls: {
		gap: 4,
	},
	objectiveTitle: {
		fontFamily: "Poppins_600SemiBold",
		fontSize: 30,
		lineHeight: 36,
		color: "#1F2937",
		marginBottom: 16
	},
	objectiveLine: {
		fontFamily: "Inter_300Light",
		fontSize: 16,
		lineHeight: 24,
		marginBottom: 4,
		color: "#4B5563"
	},
	objectiveStrong: {
		fontFamily: "Inter_500Medium",
	}
});
