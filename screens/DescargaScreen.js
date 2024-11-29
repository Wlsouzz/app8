import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const Descarga = () => {
  const [descargaValue, setDescargaValue] = useState('0'); // Inicializando como string '0'
  const [consumoDiario, setConsumoDiario] = useState(0);
  const [consumoMensal, setConsumoMensal] = useState(0);
  const [custoMensal, setCustoMensal] = useState(0);

  const litrosPorDescarga = 12; // Quantidade de litros por descarga
  const tarifaSABESP = 6.00; // Tarifa da SABESP

  const navigation = useNavigation();
  const route = useRoute();

  const { banhoValue = 0, usosPia = 0 } = route.params || {}; // Recebendo parâmetros de outras telas

  useEffect(() => {
    // Converte o valor de descargaValue para número (garante que seja um número inteiro)
    const descargas = parseInt(descargaValue, 10);

    // Verifica se o valor é válido
    if (isNaN(descargas) || descargas <= 0) {
      return; // Não faz nada se o valor for inválido
    }

    // Cálculos
    const consumoDiario = descargas * litrosPorDescarga; // Consumo diário de água
    const consumoMensal = consumoDiario * 30; // Consumo mensal de água (30 dias)

    // Cálculo do consumo em metros cúbicos (m³)
    const consumoEmM3 = consumoMensal / 1000;

    // Cálculo do custo mensal com base no consumo
    let custo = 0;
    if (consumoEmM3 <= 10) {
      custo = consumoEmM3 * 3.50;
    } else if (consumoEmM3 <= 20) {
      custo = consumoEmM3 * 4.50;
    } else {
      custo = consumoEmM3 * 5.00;
    }

    // Atualiza os estados com os valores calculados
    setConsumoDiario(consumoDiario);
    setConsumoMensal(consumoMensal);
    setCustoMensal(custo);
  }, [descargaValue]); // Recalcular sempre que descargaValue mudar

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quantas Descargas Você Dá por Dia?</Text>

      {/* Campo de entrada para o número de descargas diárias */}
      <TextInput
        style={styles.input}
        value={descargaValue}
        onChangeText={text => setDescargaValue(text)} // Atualiza diretamente o valor do estado
        keyboardType="numeric" // Garantir que o teclado seja numérico
      />

      {/* Exibição do consumo diário */}
      <View style={styles.card}>
        <Text style={styles.cardText}>Consumo Diário: {consumoDiario.toFixed(2)} L</Text>
      </View>

      {/* Exibição do consumo mensal */}
      <View style={styles.card}>
        <Text style={styles.cardText}>Consumo Mensal: {consumoMensal.toFixed(2)} L</Text>
      </View>

      {/* Exibição do custo mensal estimado */}
      <View style={styles.card}>
        <Text style={styles.cardText}>Custo Estimado: R$ {custoMensal.toFixed(2)}</Text>
      </View>

      {/* Botão para voltar para a tela CalculadoraScreen */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate('Calculadora')} // Navega para a tela CalculadoraScreen
      >
        <Text style={styles.nextButtonText}>Voltar para Calculadora</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
    fontSize: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 10,
    borderRadius: 12,
    shadowColor: '#007BFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 5,
    width: '80%',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 18,
  },
  nextButton: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#2196F3',
    borderRadius: 8,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Descarga;
