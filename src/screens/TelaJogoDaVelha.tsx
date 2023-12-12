
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert , Button} from 'react-native';


const JogoDaVelha = ({navigation}) => {
  const [tabuleiro, setTabuleiro] = useState(Array(9).fill(null));
  const [vezDoX, setVezDoX] = useState(true);

  useEffect(() => {
    const vencedor = verificarVencedor();
    if (vencedor) {
      Alert.alert('Fim do Jogo!', `O jogador ${vencedor} venceu!`, [
        { text: 'Novo Jogo', onPress: reiniciarJogo },
      ]);
    } else if (tabuleiro.every((square) => square !== null)) {
      Alert.alert('Fim do Jogo!', 'Empate!', [{ text: 'Novo Jogo', onPress: reiniciarJogo }]);
    }
  }, [tabuleiro]);

  const reiniciarJogo = () => {
    setTabuleiro(Array(9).fill(null));
    setVezDoX(true);
  };

  const marcarJogada = (index) => {
    if (tabuleiro[index] || verificarVencedor()) {
      return;
    }

    const novoTabuleiro = tabuleiro.slice();
    novoTabuleiro[index] = vezDoX ? 'X' : 'O';

    setTabuleiro(novoTabuleiro);
    setVezDoX(!vezDoX);
  };

  const verificarVencedor = () => {
    const linhasVencedoras = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < linhasVencedoras.length; i++) {
      const [a, b, c] = linhasVencedoras[i];
      if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
        return tabuleiro[a];
      }
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Jogo da Velha</Text>
      <View style={styles.tabuleiro}>
        {[0, 1, 2].map((linha) => (
          <View key={linha} style={styles.linha}>
            {[0, 1, 2].map((coluna) => (
              <TouchableOpacity
                key={coluna}
                style={styles.quadrado}
                onPress={() => marcarJogada(linha * 3 + coluna)}
              >
                <Text style={styles.valor}>{tabuleiro[linha * 3 + coluna]}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
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

 const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    titulo: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    tabuleiro: {
      flexDirection: 'column',
    },
    linha: {
      flexDirection: 'row',
    },
    quadrado: {
      width: 80,
      height: 80,
      borderWidth: 1,
      borderColor: '#ccc',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 8,
      marginLeft: 8,
    },
    valor: {
      fontSize: 24,
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
    },
  });

export default JogoDaVelha;

