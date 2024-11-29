import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const Pia = () => {
  const [usosPia, setUsosPia] = useState('0');
  const [segundosPia, setSegundosPia] = useState('0'); // Usando segundos ao invés de minutos
  const [consumoDiario, setConsumoDiario] = useState(0);
  const [consumoMensal, setConsumoMensal] = useState(0);
  const [custoMensal, setCustoMensal] = useState(0);

  const litrosPorSegundoPia = 0.05; // Exemplo: 0.05 litro por segundo
  const tarifaSABESP = 6.00;

  const navigation = useNavigation();
  const route = useRoute();

  const { banhoValue = 0, descargaValue = 0 } = route.params || {}; // Recebendo parâmetros de outras telas

  useEffect(() => {
    const usos = parseInt(usosPia);
    const segundos = parseInt(segundosPia);

    // Verifica se os valores são válidos
    if (isNaN(usos) || isNaN(segundos)) return;

    // Calculo do consumo diário baseado no tempo de uso da pia em segundos
    const consumoDiario = usos * segundos * litrosPorSegundoPia;
    const consumoMensal = consumoDiario * 30; // Consumo mensal de água (30 dias)

    const consumoEmM3 = consumoMensal / 1000; // Convertendo para metros cúbicos

    let custo = 0;
    if (consumoEmM3 <= 10) {
      custo = consumoEmM3 * 3.50;
    } else if (consumoEmM3 <= 20) {
      custo = consumoEmM3 * 4.50;
    } else {
      custo = consumoEmM3 * 5.00;
    }

    setConsumoDiario(consumoDiario);
    setConsumoMensal(consumoMensal);
    setCustoMensal(custo);
  }, [usosPia, segundosPia]); // Recalcula sempre que usos ou segundos mudarem

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quantos Usos da Pia por Dia?</Text>

      <TextInput
        style={styles.input}
        value={usosPia}
        onChangeText={setUsosPia}
        keyboardType="numeric"
        placeholder="Número de usos"
      />

      <Text style={styles.title}>Quantos Segundos Você Passa Usando a Pia?</Text>

      <TextInput
        style={styles.input}
        value={segundosPia}
        onChangeText={setSegundosPia}
        keyboardType="numeric"
        placeholder="Segundos por uso"
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

      <TouchableOpacity
        style={styles.nextButton}
        onPress={() =>
          navigation.navigate('Descarga', { banhoValue, usosPia, segundosPia, descargaValue }) // Passando valores para a próxima tela
        }
      >
        <Text style={styles.nextButtonText}>Próximo</Text>
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
    marginBottom: 15,
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

export default Pia;
