import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Animated,
  Easing,
  ScrollView,
  PixelRatio,
  useWindowDimensions,
  Alert,
  BackHandler
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Função para calcular tamanhos responsivos de forma mais precisa
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const scale = SCREEN_WIDTH / 375; // Base para iPhone 8

const normalize = (size) => {
  const newSize = size * scale;
  // Ajuste diferente para iOS e Android
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  // Android precisa de um ajuste ligeiramente diferente
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
};

// Componente de Logo Profissional com tamanho adaptativo
const ProfessionalLogo = ({ screenHeight, screenWidth }) => {
  // Tamanho responsivo baseado na altura e largura da tela
  const logoSize = Math.min(screenHeight * 0.10, screenWidth * 0.20);
  const fontSize = logoSize * 0.35;
  
  // Animação para o efeito de brilho
  const shimmerValue = new Animated.Value(0);
  
  React.useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ).start();
  }, []);
  
  const shimmerTranslate = shimmerValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-logoSize, logoSize]
  });

  return (
    <View style={[logoStyles.container, { marginBottom: screenHeight * 0.02 }]}>
      {/* Círculo externo */}
      <View style={[logoStyles.outerCircle, { width: logoSize, height: logoSize, borderRadius: logoSize / 2 }]}>
        {/* Círculo interno */}
        <View style={[logoStyles.innerCircle, { 
          width: logoSize * 0.85, 
          height: logoSize * 0.85, 
          borderRadius: logoSize * 0.425 
        }]}>
          {/* Efeito de brilho */}
          <Animated.View 
            style={[
              logoStyles.shimmer,
              {
                width: logoSize * 0.6,
                height: logoSize,
                transform: [{ translateX: shimmerTranslate }, { rotate: '45deg' }]
              }
            ]} 
          />
          
          {/* Texto da logo */}
          <Text style={[logoStyles.logoText, { fontSize: fontSize }]}>LG</Text>
          
          {/* Ícone de folha estilizado */}
          <View style={[logoStyles.leafContainer, { top: logoSize * 0.15, right: logoSize * 0.2 }]}>
            <View style={[logoStyles.leaf, { 
              width: logoSize * 0.12, 
              height: logoSize * 0.18 
            }]} />
          </View>
        </View>
      </View>
      
      {/* Nome da empresa */}
      <View style={logoStyles.nameContainer}>
        <Text style={[logoStyles.companyName, { fontSize: normalize(18) }]}>LIMPA GYN</Text>
        <View style={logoStyles.taglineContainer}>
          <View style={logoStyles.taglineLine} />
          <Text style={[logoStyles.taglineText, { fontSize: normalize(9) }]}>COLETA SELETIVA</Text>
          <View style={logoStyles.taglineLine} />
        </View>
      </View>
    </View>
  );
};

// Estilos específicos para a logo
const logoStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  outerCircle: {
    backgroundColor: '#8BC34A',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  innerCircle: {
    backgroundColor: '#7CB342',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  shimmer: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  logoText: {
    color: 'white',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  leafContainer: {
    position: 'absolute',
  },
  leaf: {
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#CDDC39',
    transform: [{ rotate: '45deg' }],
  },
  nameContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  companyName: {
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 3,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  taglineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  taglineLine: {
    width: 15,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  taglineText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
    letterSpacing: 1.5,
    marginHorizontal: 8,
  },
});

// Componente de campo de entrada personalizado com melhor responsividade
const InputField = ({ label, placeholder, value, onChangeText, secureTextEntry, keyboardType, error, autoCapitalize = "none" }) => {
  const { height, width } = useWindowDimensions();
  
  // Ajustar tamanho do input baseado na orientação da tela
  const inputHeight = height > width ? height * 0.065 : height * 0.08;
  const fontSize = normalize(height > width ? 16 : 14);
  
  return (
    <View style={[styles.inputWrapper, { marginBottom: height * 0.015 }]}>
      <View style={styles.labelContainer}>
        <Text style={[styles.inputLabel, { fontSize: normalize(14) }]}>{label}</Text>
        {error ? <Text style={[styles.errorText, { fontSize: normalize(12) }]}>{error}</Text> : null}
      </View>
      <View style={[
        styles.inputContainer, 
        { height: inputHeight },
        error ? styles.inputError : {}
      ]}>
        <TextInput 
          style={[styles.input, { fontSize: fontSize }]}
          placeholder={placeholder} 
          placeholderTextColor="#999"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChangeText}
          autoCapitalize={autoCapitalize}
        />
      </View>
    </View>
  );
};

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  // Estados para validação
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: ''
  });
  
  // Navegação
  const navigation = useNavigation();
  
  // Função para voltar à tela de login
  const goBackToLogin = () => {
    navigation.goBack();
  };
  
  // Usar dimensões da janela para responder a mudanças de orientação
  const { width, height } = useWindowDimensions();
  
  // Determinar se é um dispositivo pequeno
  const isSmallDevice = height < 700;
  
  // Determinar se está em modo paisagem
  const isLandscape = width > height;
  
  // Ajustar comportamento do botão voltar
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      goBackToLogin();
      return true;
    });

    return () => backHandler.remove();
  }, []);

  // Função para validar o formulário
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: ''
    };
    
    // Validar nome
    if (!name.trim()) {
      newErrors.name = 'Nome é obrigatório';
      isValid = false;
    }
    
    // Validar email
    if (!email.trim()) {
      newErrors.email = 'Email é obrigatório';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email inválido';
      isValid = false;
    }
    
    // Validar senha
    if (!password) {
      newErrors.password = 'Senha é obrigatória';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
      isValid = false;
    }
    
    // Validar confirmação de senha
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
      isValid = false;
    }
    
    // Validar termos
    if (!acceptTerms) {
      newErrors.terms = 'Você deve aceitar os termos';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  // Função para lidar com o registro
  const handleRegister = () => {
    if (validateForm()) {
      // Aqui você implementaria a lógica de registro
      Alert.alert(
        'Sucesso', 
        'Cadastro realizado com sucesso!',
        [
          { 
            text: 'OK', 
            onPress: () => goBackToLogin() 
          }
        ]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      
      {/* Fundo verde */}
      <View style={styles.backgroundGradient}>
        <View style={styles.overlay} />
        
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
        >
          <ScrollView 
            contentContainerStyle={[
              styles.scrollContent,
              { 
                paddingTop: height * 0.03, 
                paddingBottom: height * 0.05,
                paddingHorizontal: width * 0.05
              }
            ]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Logo Profissional */}
            <ProfessionalLogo screenHeight={height} screenWidth={width} />

            <View style={[
              styles.formContainer, 
              { 
                width: isLandscape ? width * 0.7 : (width > 500 ? 450 : width * 0.9),
                padding: width * 0.05,
                marginTop: isSmallDevice ? height * 0.01 : height * 0.02
              }
            ]}>
              <Text style={[styles.formTitle, { 
                fontSize: normalize(isSmallDevice ? 20 : 22),
                marginBottom: isSmallDevice ? height * 0.015 : height * 0.02
              }]}>Criar Conta</Text>
              
              {/* Campos do formulário */}
              <InputField 
                label="Nome Completo"
                placeholder="Digite seu nome completo"
                value={name}
                onChangeText={setName}
                error={errors.name}
                autoCapitalize="words"
              />
              
              <InputField 
                label="E-mail"
                placeholder="Digite seu e-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                error={errors.email}
              />
              
              <InputField 
                label="Senha"
                placeholder="Crie uma senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                error={errors.password}
              />
              
              <InputField 
                label="Confirmar Senha"
                placeholder="Confirme sua senha"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={true}
                error={errors.confirmPassword}
              />
              
              {/* Checkbox de termos e condições */}
              <View style={[styles.termsContainer, { 
                marginVertical: isSmallDevice ? height * 0.01 : height * 0.015 
              }]}>
                <TouchableOpacity 
                  style={styles.checkbox}
                  onPress={() => setAcceptTerms(!acceptTerms)}
                  activeOpacity={0.7}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <View style={[
                    styles.checkboxInner, 
                    acceptTerms ? styles.checkboxChecked : {}
                  ]}>
                    {acceptTerms && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                </TouchableOpacity>
                <View style={styles.termsTextContainer}>
                  <Text style={[styles.termsText, { 
                    fontSize: normalize(isSmallDevice ? 12 : 13),
                    lineHeight: normalize(isSmallDevice ? 16 : 18)
                  }]}>
                    Eu aceito os{' '}
                    <Text style={styles.termsLink}>Termos de Uso</Text> e{' '}
                    <Text style={styles.termsLink}>Política de Privacidade</Text>
                  </Text>
                  {errors.terms ? <Text style={styles.errorText}>{errors.terms}</Text> : null}
                </View>
              </View>
              
              {/* Botão de cadastro */}
              <TouchableOpacity 
                style={[styles.registerButton, { 
                  height: isSmallDevice ? height * 0.06 : height * 0.065,
                  marginTop: isSmallDevice ? height * 0.01 : height * 0.02
                }]}
                activeOpacity={0.8}
                onPress={handleRegister}
              >
                <Text style={[styles.registerButtonText, { fontSize: normalize(16) }]}>CADASTRAR</Text>
              </TouchableOpacity>
              
              {/* Botão para voltar ao login */}
              <TouchableOpacity 
                style={[styles.backButton, { 
                  marginTop: isSmallDevice ? height * 0.015 : height * 0.02,
                  padding: isSmallDevice ? 8 : 10
                }]}
                onPress={goBackToLogin}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Text style={[styles.backButtonText, { fontSize: normalize(14) }]}>
                  Já tem uma conta? Faça login
                </Text>
              </TouchableOpacity>
            </View>

            {!isSmallDevice && (
              <View style={[styles.footer, { marginTop: height * 0.02 }]}>
                <Text style={[styles.footerText, { fontSize: normalize(12) }]}>
                  © 2024 Limpa Gyn • Todos os direitos reservados
                </Text>
              </View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#8BC34A', // Cor de fundo verde principal
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Overlay mais leve para o fundo verde
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  formTitle: {
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  inputWrapper: {
    width: '100%',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  inputLabel: {
    fontWeight: '600',
    color: '#555',
    paddingLeft: 2,
  },
  errorText: {
    color: '#e53935',
    fontSize: normalize(12),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 15,
  },
  inputError: {
    borderColor: '#e53935',
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#333',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    marginRight: 10,
    marginTop: 2,
  },
  checkboxInner: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#8BC34A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#8BC34A',
  },
  checkmark: {
    color: 'white',
    fontSize: normalize(14),
    fontWeight: 'bold',
  },
  termsTextContainer: {
    flex: 1,
  },
  termsText: {
    color: '#666',
  },
  termsLink: {
    color: '#8BC34A',
    fontWeight: '600',
  },
  registerButton: {
    backgroundColor: '#8BC34A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#8BC34A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  registerButtonText: {
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#8BC34A',
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.9)',
  }
});