import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TelaInical from './src/screens/TelaInicial';
import TelaJogoDaVelha from './src/screens/TelaJogoDaVelha';
import TelaJogoDaMemoria  from "./src/screens/TelaJogoDaMemoria";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TelaInicial">
        <Stack.Screen name="Jogos Cassimiro" component={TelaInical} />
        <Stack.Screen name="Jogo da memoria" component={TelaJogoDaMemoria} />
        <Stack.Screen name="Jogo da velha" component={TelaJogoDaVelha} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
