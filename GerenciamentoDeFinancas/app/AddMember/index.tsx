import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useMutation } from '@tanstack/react-query';

const AddMemberScreen: React.FC = () => {
  const [email, setEmail] = useState<string>(''); // Define um estado local 'email' para armazenar o e-mail digitado.

  // Função que faz a requisição para a API
  const postInvite = async (email: string) => { // Define o tipo do parâmetro como 'string'
    // Faz a requisição POST para o endpoint da API. (Alterar para o endpoint real da API)
    const res = await fetch('/families/members', {  // Alterar para o caminho correto
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }), // Envia o e-mail no corpo da requisição.
    });

    if (!res.ok) { // Verifica se a resposta não é ok.
      const responseData = await res.json();
      throw new Error(responseData.message ?? 'Erro ao enviar convite'); // Lança um erro com a mensagem retornada pela API ou uma mensagem padrão.
    }

    return res.json(); // Retorna a resposta da API em formato JSON.
  };

  // Configura a mutação com useMutation
  const { mutateAsync, error, isError, status } = useMutation({
    mutationFn: postInvite, // Define a função de mutação como postInvite.
    onSuccess: (data) => {
      Alert.alert('Sucesso', `Convite enviado para ${email}`); // Exibe um alerta de sucesso.
      setEmail(''); // Limpa o campo de e-mail.
    },
  });

  // Função chamada ao enviar o formulário
  const handleInvite = async () => {
    if (!email) { // Verifica se o e-mail está vazio.
      Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
      return;
    }
    await mutateAsync(email); // Chama mutateAsync para enviar o e-mail.
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Adicionar Membro</Text>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="Insira seu e-mail"
            keyboardType="email-address"
            value={email} // Valor do input vinculado ao estado 'email'.
            onChangeText={setEmail} // Atualiza o estado 'email' quando o texto muda.
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleInvite} disabled={isLoading}>
          <Icon name="user-plus" size={20} color="#fff" />
          <Text style={styles.buttonText}>
            {status ? 'Enviando...' : 'Enviar convite'}
          </Text>
        </TouchableOpacity>
        {isError && <Text style={styles.errorText}>{error.message}</Text>}
      </View>
    </SafeAreaView>
  );
};

// Estilos do componente
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
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default AddMemberScreen; // Exporta o componente AddMemberScreen como padrão.
