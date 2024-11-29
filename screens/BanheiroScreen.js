import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const Banho = () => {
  const [banhosPorDia, setBanhosPorDia] = useState('0');
  const [minutosBanho, setMinutosBanho] = useState('0');
  const [consumoDiario, setConsumoDiario] = useState(0);
  const [consumoMensal, setConsumoMensal] = useState(0);
  const [custoMensal, setCustoMensal] = useState(0);

  const litrosPorMinuto = 1; // Litros consumidos por minuto de banho
  const tarifaSABESP = 6.00; // Tarifa SABESP (por metro cúbico de água)

  const navigation = useNavigation();
  const route = useRoute();

  const { usosPia = 0, descargaValue = 0 } = route.params || {};

  useEffect(() => {
    const banhos = parseInt(banhosPorDia);
    const minutos = parseInt(minutosBanho);

    if (isNaN(banhos) || isNaN(minutos)) return;

    // Cálculo de consumo diário e mensal com base no tempo de banho
    const consumoDiario = banhos * minutos * litrosPorMinuto;
    const consumoMensal = consumoDiario * 30; // Consumo mensal de 30 dias

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
  }, [banhosPorDia, minutosBanho]); // Recalcula sempre que banhos ou minutos mudarem

  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>Quantos Banhos Você Toma por Dia?</Text>

      <TextInput
        style={styles.input}
        value={banhosPorDia}
        onChangeText={setBanhosPorDia}
        keyboardType="numeric"
        placeholder="Número de banhos"
      />

      <Text style={styles.title}>Quantos Minutos Você Passa no Banho?</Text>

      <TextInput
        style={styles.input}
        value={minutosBanho}
        onChangeText={setMinutosBanho}
        keyboardType="numeric"
        placeholder="Minutos por banho"
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
          navigation.navigate('Pia', {
            banhoValue: banhosPorDia,
            minutosBanho,
            usosPia,
            descargaValue,
          }) // Passando valores para a próxima tela
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

export default Banho;
