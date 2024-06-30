import { TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/Ionicons";

const GoBack = () => {
    const navigation = useNavigation();

    const handleVoltar = () => {
    navigation.goBack();
    };

    return (
        <TouchableOpacity onPress={handleVoltar}>
            <Icon name="arrow-back" size={30} color="black" />            </TouchableOpacity>
    );
};

export default GoBack;