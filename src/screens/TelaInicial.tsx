import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const TelaPrimaria = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Escolha um Jogo</Text>
      <View style={styles.botoesContainer}>
        <Button
          title="Jogo da Memória"
          onPress={() => navigation.navigate('Jogo da memoria')}
        />
        <Button
          title="Jogo da Velha"
          onPress={() => navigation.navigate('Jogo da velha')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  botoesContainer: {
    marginTop: 20,
  },
});

export default TelaPrimaria;
