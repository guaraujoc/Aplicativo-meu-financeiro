import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AddMemberScreen = () => {
  const [hideValues, setHideValues] = useState(true); // Estado para controlar a visibilidade dos valores

  const toggleVisibility = () => {
    setHideValues(!hideValues);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Icon name="wallet" size={24} color="#000" />
        <Text style={styles.title}>Minha carteira</Text>
      </View>

      <View style={styles.rectangle}>
      <Text style={styles.rectangleText}>Saldo disponível:</Text>
        <View style={styles.valueContainer}>
          <Text style={styles.valueText}>R$</Text>
          <Text style={[styles.valueText, styles.valueAmount]}>{hideValues ? '*****' : '500,00'}</Text>
          <TouchableOpacity onPress={toggleVisibility}>
            <Icon name={hideValues ? 'eye-off' : 'eye'} size={20} color="#6C63FF" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.rectangle}>
        <Text style={styles.rectangleText}>Gasto total:</Text>
        <View style={styles.valueContainer}>
          <Text style={styles.valueText}>R$</Text>
          <Text style={[styles.valueText, styles.valueAmount]}>{hideValues ? '*****' : '1000,00'}</Text>
        </View>
      </View>

      <View style={styles.rectangle}>
        <Text style={styles.rectangleText}>Dívidas para o próximo mês:</Text>
        <View style={styles.valueContainer}>
          <Text style={styles.valueText}>R$</Text>
          <Text style={[styles.valueText, styles.valueAmount]}>{hideValues ? '*****' : '1000,00'}</Text>
        </View>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 40,
  },
  titleContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    textAlign: 'center',
  },
  rectangle: {
    width: '90%',
    height: 'auto',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
  },
  rectangleText: {
    fontSize: 16,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10, // Espaçamento entre o texto e o valor
  },
  valueText: {
    fontSize: 16,
    marginRight: 5,
  },
  valueAmount: {
    fontWeight: 'bold',
  },
});

export default AddMemberScreen;
