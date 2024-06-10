import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const AddMemberScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Adicionar Membro</Text>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
        </View>
        <View style={styles.inputContainer}>
    
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="Insira seu e-mail"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
        </View>
        <View style={styles.inputContainer}>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => { /* Lógica de adição */ }}>
          <Icon name="user-plus" size={20} color="#fff" />
          <Text style={styles.buttonText}> Enviar convite</Text>
        </TouchableOpacity>
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
  form: {
    width: '80%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#6C63FF',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default AddMemberScreen;