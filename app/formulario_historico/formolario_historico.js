import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    SafeAreaView,
    StatusBar,
    Alert,
    Dimensions,
    PixelRatio,
    Platform,
  } from "react-native"
  import { useNavigation } from "@react-navigation/native"
  
  // Reutilizando as funções de responsividade do formulário
  const getDeviceType = () => {
    const { width, height } = Dimensions.get("window")
    const screenSize = Math.min(width, height)
  
    if (screenSize >= 768) return "tablet"
    if (screenSize >= 414) return "largePhone"
    if (screenSize >= 375) return "mediumPhone"
    return "smallPhone"
  }
  
  const normalize = (size) => {
    const deviceType = getDeviceType()
    const { width: SCREEN_WIDTH } = Dimensions.get("window")
  
    let scaleFactor
    switch (deviceType) {
      case "tablet":
        scaleFactor = SCREEN_WIDTH / 768
        break
      case "largePhone":
        scaleFactor = SCREEN_WIDTH / 414
        break
      case "mediumPhone":
        scaleFactor = SCREEN_WIDTH / 375
        break
      case "smallPhone":
        scaleFactor = SCREEN_WIDTH / 320
        break
      default:
        scaleFactor = SCREEN_WIDTH / 375
    }
  
    const newSize = size * scaleFactor
  
    if (Platform.OS === "ios") {
      return Math.round(PixelRatio.roundToNearestPixel(newSize))
    }
  
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
  
  const getButtonHeight = () => {
    const deviceType = getDeviceType()
    const { height } = Dimensions.get("window")
  
    switch (deviceType) {
      case "tablet":
        return height * 0.075
      case "largePhone":
        return height * 0.07
      case "mediumPhone":
        return height * 0.065
      case "smallPhone":
        return height * 0.06
      default:
        return height * 0.065
    }
  }
  
  export default function HistoricoSoltura() {
    const navigation = useNavigation()
  
    // Dados de exemplo para o histórico
    const historicoData = [
      {
        id: "1",
        data: "24/03/2025",
        hora: "08:30",
        motorista: "João Silva",
        prefixo: "ABC-1234",
        setor: "Norte",
        coletores: ["Pedro Santos", "Ana Costa"],
      },
      {
        id: "2",
        data: "23/03/2025",
        hora: "09:15",
        motorista: "Maria Oliveira",
        prefixo: "DEF-5678",
        setor: "Sul",
        coletores: ["Carlos Ferreira"],
      },
      {
        id: "3",
        data: "22/03/2025",
        hora: "07:45",
        motorista: "Pedro Santos",
        prefixo: "GHI-9012",
        setor: "Leste",
        coletores: ["Ana Costa", "João Silva", "Maria Oliveira"],
      },
      {
        id: "4",
        data: "21/03/2025",
        hora: "10:00",
        motorista: "Ana Costa",
        prefixo: "JKL-3456",
        setor: "Oeste",
        coletores: ["Carlos Ferreira", "Pedro Santos"],
      },
      {
        id: "5",
        data: "20/03/2025",
        hora: "08:00",
        motorista: "Carlos Ferreira",
        prefixo: "MNO-7890",
        setor: "Centro",
        coletores: ["João Silva"],
      },
    ]
  
    const renderTableHeader = () => {
      return (
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCell, { flex: 1, fontSize: normalize(14) }]}>Data</Text>
          <Text style={[styles.tableHeaderCell, { flex: 0.8, fontSize: normalize(14) }]}>Hora</Text>
          <Text style={[styles.tableHeaderCell, { flex: 2, fontSize: normalize(14) }]}>Motorista</Text>
          <Text style={[styles.tableHeaderCell, { flex: 1.5, fontSize: normalize(14) }]}>Prefixo</Text>
          <Text style={[styles.tableHeaderCell, { flex: 1, fontSize: normalize(14) }]}>Setor</Text>
        </View>
      )
    }
  
    const renderTableRow = ({ item, index }) => {
      const isEven = index % 2 === 0
  
      return (
        <TouchableOpacity
          style={[styles.tableRow, isEven ? styles.tableRowEven : styles.tableRowOdd]}
          onPress={() => {
            Alert.alert(
              "Detalhes da Rota",
              `Motorista: ${item.motorista}\nPrefixo: ${item.prefixo}\nData: ${item.data}\nHora: ${item.hora}\nSetor: ${item.setor}\nColetores: ${item.coletores.join(", ")}`,
            )
          }}
        >
          <Text style={[styles.tableCell, { flex: 1, fontSize: normalize(13) }]}>{item.data}</Text>
          <Text style={[styles.tableCell, { flex: 0.8, fontSize: normalize(13) }]}>{item.hora}</Text>
          <Text style={[styles.tableCell, { flex: 2, fontSize: normalize(13) }]}>{item.motorista}</Text>
          <Text style={[styles.tableCell, { flex: 1.5, fontSize: normalize(13) }]}>{item.prefixo}</Text>
          <Text style={[styles.tableCell, { flex: 1, fontSize: normalize(13) }]}>{item.setor}</Text>
        </TouchableOpacity>
      )
    }
  
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
  
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={[styles.backButtonText, { fontSize: normalize(16) }]}>← Voltar</Text>
          </TouchableOpacity>
  
          <Text style={[styles.headerTitle, { fontSize: normalize(20) }]}>Histórico de Soltura de Rotas</Text>
        </View>
  
        <View style={styles.content}>
          <View style={styles.tableContainer}>
            {renderTableHeader()}
            <FlatList
              data={historicoData}
              keyExtractor={(item) => item.id}
              renderItem={renderTableRow}
              contentContainerStyle={styles.tableContent}
            />
          </View>
  
          <TouchableOpacity
            style={[styles.backToFormButton, { height: getButtonHeight() }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.backToFormButtonText, { fontSize: normalize(15) }]}>VOLTAR PARA O FORMULÁRIO</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f5f5f5",
    },
    header: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: "#ddd",
      backgroundColor: "white",
    },
    headerTitle: {
      fontWeight: "bold",
      color: "#333",
      flex: 1,
      textAlign: "center",
    },
    backButton: {
      position: "absolute",
      left: 20,
      zIndex: 10,
    },
    backButtonText: {
      color: "#5C6BC0",
      fontWeight: "500",
    },
    content: {
      flex: 1,
      padding: 20,
    },
    tableContainer: {
      flex: 1,
      backgroundColor: "white",
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 5,
      overflow: "hidden",
      marginBottom: 20,
    },
    tableHeader: {
      flexDirection: "row",
      backgroundColor: "#f0f0f0",
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#ddd",
    },
    tableHeaderCell: {
      fontWeight: "bold",
      color: "#555",
    },
    tableContent: {
      flexGrow: 1,
    },
    tableRow: {
      flexDirection: "row",
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
    },
    tableRowEven: {
      backgroundColor: "#fff",
    },
    tableRowOdd: {
      backgroundColor: "#f9f9f9",
    },
    tableCell: {
      color: "#333",
    },
    backToFormButton: {
      backgroundColor: "#5C6BC0",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
    },
    backToFormButtonText: {
      color: "white",
      fontWeight: "bold",
      letterSpacing: 1,
    },
  })
  
  