import { ScrollView, StyleSheet, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import BluetoothScreen from "./src/screens/ScanDevices"
import MusicPlayer from "./src/screens/MusicPlayer"

// import { MusicProvider } from './src/context/MusicContext'
import MusicProvider from "./src/context/MusicContext"

const App = ()=>{
  return(
    <MusicProvider>
   <SafeAreaView style={styles.safeAreaView}>
    <ScrollView>
     <MusicPlayer/>
    <BluetoothScreen/>
    </ScrollView>
   </SafeAreaView>
  </MusicProvider>
  )
}

const styles = StyleSheet.create(
 {
  safeAreaView : {
    flex:1,
  }
 }
)
export default App