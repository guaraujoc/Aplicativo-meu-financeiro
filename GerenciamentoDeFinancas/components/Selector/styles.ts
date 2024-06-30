import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    typeButtonText: {
        fontFamily: "Inter_400Regular",
		fontSize: 16,
    },
    saveButton: {
        backgroundColor: '#6C63FF',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
		backgroundColor: "#F8FAFC",
        borderRadius: 8,
        padding: 16,
        gap: 16,
    },
    modalItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#94A3B8',
        backgroundColor: "#FFFFFF",
		lineHeight: 24,
		height: 56,
        paddingHorizontal: 12,
        justifyContent: 'center',
		borderRadius: 8,
    },
    input: {
		backgroundColor: "#FFFFFF",
		lineHeight: 24,
		height: 56,
        paddingHorizontal: 12,
        justifyContent: 'center',
		borderWidth: 1,
		borderColor: "#94A3B8",
		borderRadius: 8,
        fontFamily: "Inter_400Regular",
		fontSize: 16,
    },
});
