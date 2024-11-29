import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const Cozinha = ({ navigation, route }) => {
  const [lavagensPorDia, setLavagensPorDia] = useState(''); // Valor inicial como string
  const [tempoDeUso, setTempoDeUso] = useState(''); // Valor inicial como string
  const [consumoSemanalLitros, setConsumoSemanalLitros] = useState(0);
  const [consumoMensalLitros, setConsumoMensalLitros] = useState(0);
  const [custoEstimado, setCustoEstimado] = useState(0);

  const litrosPorLavagem = 10; // Litros por lavagem de louça
  const litrosPorMinuto = 0.08; // Litros consumidos por minuto de torneira aberta
  const tarifaSABESP = 6.00; // Tarifa da SABESP por m³ em R$ (ajustar conforme valor real, ex: R$ 6.00 por m³)

  // Cálculos realizados sempre que os valores de entrada mudam
  useEffect(() => {
    const numLavagens = parseInt(lavagensPorDia);
    const tempo = parseInt(tempoDeUso);

    if (isNaN(numLavagens) || isNaN(tempo)) return; // Ignora cálculos se os valores não forem válidos

    // Consumo semanal: número de lavagens * litros por lavagem + tempo * litros por minuto * dias da semana
    const litrosSemanais = (numLavagens * litrosPorLavagem + tempo * litrosPorMinuto) * 7;
    const litrosMensais = litrosSemanais * 4; // Consumo mensal (aproximadamente 4 semanas por mês)

    const metrosCubicosMensais = litrosMensais / 1000; // Converte litros para m³
    const custo = metrosCubicosMensais * tarifaSABESP; // Cálculo do custo estimado

    setConsumoSemanalLitros(litrosSemanais);
    setConsumoMensalLitros(litrosMensais);
    setCustoEstimado(custo);
  }, [lavagensPorDia, tempoDeUso]);

  return (
    <View style={styles.container}>
      {/* Título e subtítulo */}
      <Text style={styles.title}>Bem-vindo à Cozinha!</Text>
      <Text style={styles.subtitle}>Total per capita da habitação</Text>

      {/* Input para número de lavagens por dia */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Número de Lavagens por Dia:</Text>
        <TextInput
          style={styles.input}
          value={lavagensPorDia}
          onChangeText={setLavagensPorDia}
          keyboardType="numeric"
        />
      </View>

      {/* Input para tempo de uso da torneira */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Tempo de Uso da Torneira (em minutos):</Text>
        <TextInput
          style={styles.input}
          value={tempoDeUso}
          onChangeText={setTempoDeUso}
          keyboardType="numeric"
        />
      </View>

      {/* Card de Consumo Semanal */}
      <View style={styles.card}>
        <Text style={styles.cardText}>Consumo Semanal: {consumoSemanalLitros.toFixed(2)} L</Text>
      </View>

      {/* Card de Consumo Mensal */}
      <View style={styles.card}>
        <Text style={styles.cardText}>Consumo Mensal: {consumoMensalLitros.toFixed(2)} L</Text>
      </View>

      {/* Card de Custo Estimado */}
      <View style={styles.card}>
        <Text style={styles.cardText}>Custo Estimado: R$ {custoEstimado.toFixed(2)}</Text>
      </View>

      {/* Botão de navegação para a próxima tela */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() =>
          navigation.navigate('FinalCozinha', {
            lavagensPorDia,
            tempoDeUso,
            consumoSemanal: consumoSemanalLitros,
            consumoMensal: consumoMensalLitros,
            custoEstimado,
          })
        }
      >
      
      </TouchableOpacity>

      {/* Botão para voltar para a tela Calculadora */}
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    width: '80%',
    marginVertical: 10,
    alignItems: 'center',
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: '100%',
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
    textAlign: 'center',
  },
  nextButton: {
    padding: 10,
    marginVertical: 10,
    alignSelf: 'flex-end',
  },
  nextButtonText: {
    color: '#2196F3',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#f44336', // Cor do botão de voltar
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Cozinha;
