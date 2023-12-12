import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, FlatList, Button } from 'react-native';

const JogoDaMemoria = ({ navigation }) => {
  const [cartas, setCartas] = useState(gerarCartas());
  const [cartasViradas, setCartasViradas] = useState([]);
  const [paresEncontrados, setParesEncontrados] = useState([]);
  const [tentativas, setTentativas] = useState(0);

  useEffect(() => {
    if (cartasViradas.length === 2) {
      const [carta1, carta2] = cartasViradas;

      if (cartas[carta1].valor === cartas[carta2].valor) {
        setParesEncontrados([...paresEncontrados, cartas[carta1].valor]);
      }

      setTimeout(() => {
        setCartasViradas([]);
      }, 1000);
    }

    if (paresEncontrados.length === cartas.length / 2) {
      Alert.alert('Parabéns!', `Você encontrou todos os pares em ${tentativas} tentativas.`, [
        { text: 'Novo Jogo', onPress: reiniciarJogo },
      ]);
    }
  }, [cartasViradas, paresEncontrados]);

  const reiniciarJogo = () => {
    setCartas(gerarCartas());
    setCartasViradas([]);
    setParesEncontrados([]);
    setTentativas(0);
  };

  const virarCarta = (index) => {
    if (cartasViradas.length < 2 && !cartasViradas.includes(index)) {
      setCartasViradas([...cartasViradas, index]);
      setTentativas(tentativas + 1);
    }
  };

  const renderCarta = ({ item, index }) => (
    <TouchableOpacity
      style={[styles.carta, cartasViradas.includes(index) ? styles.cartaVirada : null]}
      onPress={() => virarCarta(index)}
    >
      {cartasViradas.includes(index) || paresEncontrados.includes(item.valor) ? (
        <Text style={styles.textoCarta}>{item.valor}</Text>
      ) : (
        <Text style={styles.textoCarta}>❓</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Jogo da Memória 3x3</Text>
      <FlatList
        data={Array.from({ length: cartas.length }, (_, index) => ({ key: index.toString(), item: cartas[index] }))}
        renderItem={renderCarta}
        numColumns={3}
        keyExtractor={(item) => item.key}
      />
      <TouchableOpacity style={styles.botaoNovoJogo} onPress={reiniciarJogo}>
        <Text style={styles.textoBotao}>Novo Jogo</Text>
      </TouchableOpacity>
      <Button
        title="Voltar para a Tela Inicial"
        onPress={() => navigation.navigate('Jogos Cassimiro')}
      />
    </View>
  );
};

const gerarCartas = () => {
  const emojis = ['🐶', '🐱', '🐭', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯'];
  const duplicatas = [...emojis, ...emojis];
  return duplicatas.sort(() => Math.random() - 0.5).map((valor, index) => ({ valor, index }));
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  carta: {
    width: 80,
    height: 80,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db',
    borderRadius: 5,
  },
  cartaVirada: {
    backgroundColor: '#2ecc71',
  },
  textoCarta: {
    color: '#fff',
    fontSize: 18,
  },
  botaoNovoJogo: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#3498db',
    borderRadius: 5,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default JogoDaMemoria;
