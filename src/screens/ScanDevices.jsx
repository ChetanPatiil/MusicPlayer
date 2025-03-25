// import React, { useEffect, useState } from 'react';
// import { 
//   View, Text, Button, FlatList, TouchableOpacity, PermissionsAndroid, Platform, ActivityIndicator, Alert 
// } from 'react-native';
// import BluetoothClassic from 'react-native-bluetooth-classic';

// const BluetoothScreen = () => {
//   const [devices, setDevices] = useState([]); // Stores bonded (paired) devices
//   const [availableDevices, setAvailableDevices] = useState([]); // Stores newly discovered devices
//   const [connectedDevices, setConnectedDevices] = useState([]); // Stores actively connected devices
//   const [isScanning, setIsScanning] = useState(false);
//   const [isConnecting, setIsConnecting] = useState(false);

//   // Request Bluetooth permissions for Android
//   const requestPermissions = async () => {
//     if (Platform.OS === 'android') {
//       await PermissionsAndroid.requestMultiple([
//         PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
//         PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       ]);
//     }
//   };

//   useEffect(() => {
//     requestPermissions();
//     fetchConnectedDevices(); // Get already connected devices at app start
//     listPairedDevices(); // List bonded devices
//   }, []);

//   // Check and enable Bluetooth before performing any action
//   const checkAndEnableBluetooth = async () => {
//     try {
//       const isEnabled = await BluetoothClassic.isBluetoothEnabled();
//       if (!isEnabled) {
//         Alert.alert(
//           "Bluetooth Required",
//           "Bluetooth is turned off. Please enable it to proceed.",
//           [
//             { text: "Cancel", style: "cancel" },
//             { text: "Enable", onPress: () => BluetoothClassic.requestBluetoothEnabled() }
//           ]
//         );
//         return false; // Bluetooth is off
//       }
//       return true; // Bluetooth is on
//     } catch (error) {
//       console.log("Error checking Bluetooth state:", error);
//       return false;
//     }
//   };

//   // Get devices that are **already connected via system settings**
//   const fetchConnectedDevices = async () => {
//     try {
//       const connected = await BluetoothClassic.getConnectedDevices();
//       setConnectedDevices(connected);
//     } catch (error) {
//       console.log('Error fetching connected devices', error);
//     }
//   };

//   // Get paired (bonded) devices
//   const listPairedDevices = async () => {
//     try {
//       const paired = await BluetoothClassic.getBondedDevices();
//       setDevices(paired);
//     } catch (error) {
//       console.log('Error listing paired devices', error);
//     }
//   };

//   // Start scanning for unpaired devices
//   const scanForDevices = async () => {
//     const bluetoothEnabled = await checkAndEnableBluetooth();
//     if (!bluetoothEnabled) return;

//     setIsScanning(true);
//     try {
//       const unpaired = await BluetoothClassic.startDiscovery();
//       setAvailableDevices(unpaired);
//     } catch (error) {
//       console.log('Scan error', error);
//     }
//     setIsScanning(false);
//   };

//   // Connect to a selected device
//   const connectToDevice = async (device) => {
//     const bluetoothEnabled = await checkAndEnableBluetooth();
//     if (!bluetoothEnabled) return;

//     setIsConnecting(true);
//     try {
//       const connected = await device.connect();
//       if (connected) {
//         Alert.alert("Connected", `Connected to ${device.name}`);
//         fetchConnectedDevices(); // Refresh connected devices list
//       }
//     } catch (error) {
//       Alert.alert("Connection Failed", `Could not connect to ${device.name}`);
//       console.log("Error connecting to device:", error);
//     }
//     setIsConnecting(false);
//   };

//   return (
//     <View style={{ flex: 1, padding: 20 }}>
//       {/* Buttons for actions */}
//       <Button title="Scan Devices" onPress={scanForDevices} disabled={isScanning} />
//       <Button title="Check Connected Devices" onPress={fetchConnectedDevices} />

//       {/* Loading indicator while scanning */}
//       {isScanning && <ActivityIndicator size="large" color="blue" style={{ margin: 10 }} />}

//       {/* Show Paired Devices */}
//       <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Paired Devices:</Text>
//       <FlatList
//         data={devices}
//         keyExtractor={(item) => item.address}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             onPress={() => connectToDevice(item)}
//             style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}
//           >
//             <Text>{item.name || 'Unnamed Device'}</Text>
//             <Text>{item.address}</Text>
//           </TouchableOpacity>
//         )}
//       />

//       {/* Show Available (Unpaired) Devices */}
//       <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Available Devices:</Text>
//       <FlatList
//         data={availableDevices}
//         keyExtractor={(item) => item.address}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             onPress={() => connectToDevice(item)}
//             style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}
//           >
//             <Text>{item.name || 'Unnamed Device'}</Text>
//             <Text>{item.address}</Text>
//           </TouchableOpacity>
//         )}
//       />

//       {/* Show Connected Devices */}
//       <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Connected Devices:</Text>
//       <FlatList
//         data={connectedDevices}
//         keyExtractor={(item) => item.address}
//         renderItem={({ item }) => (
//           <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
//             <Text style={{ color: 'green' }}>{item.name || 'Unnamed Device'} (Connected)</Text>
//             <Text>{item.address}</Text>
//           </View>
//         )}
//       />

//       {/* Loader while connecting */}
//       {isConnecting && <ActivityIndicator size="large" color="green" style={{ marginTop: 10 }} />}
//     </View>
//   );
// };

// export default BluetoothScreen;


// import React, { useEffect, useState } from 'react';
// import { View, Text, Button, FlatList, NativeModules } from 'react-native';

// const { BluetoothModule } = NativeModules;
// console.log("bt",BluetoothModule);

// const BluetoothScreen = () => {
//   const [connectedDevices, setConnectedDevices] = useState([]);

//   useEffect(() => {
//     checkConnectedDevices();
//   }, []);

//   // ✅ Check A2DP Connected Devices
//   const checkConnectedDevices = async () => {
//     try {
//       const devices = await BluetoothModule.checkA2DPConnectedDevices();
//       setConnectedDevices(devices);
//     } catch (error) {
//       console.error('Error fetching connected devices:', error);
//     }
//   };

//   return (
//     <View style={{ flex: 1, padding: 20 }}>
//       <Button title="Check Connected Devices" onPress={checkConnectedDevices} />

//       <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Connected A2DP Devices:</Text>
//       <FlatList
//         data={connectedDevices}
//         keyExtractor={(item) => item.address}
//         renderItem={({ item }) => (
//           <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
//             <Text style={{ color: 'green' }}>{item.name || 'Unnamed Device'} (Connected)</Text>
//             <Text>{item.address}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// export default BluetoothScreen;

import React, { useEffect, useState } from 'react';
import { 
  View, Text, Button, FlatList, NativeModules, Alert, TouchableOpacity, PermissionsAndroid 
} from 'react-native';

const { BluetoothModule } = NativeModules;

const BluetoothScreen = () => {
  const [connectedDevices, setConnectedDevices] = useState([]);
  const [pairedDevices, setPairedDevices] = useState([]);
  const [availableDevices, setAvailableDevices] = useState([]);

  useEffect(() => {
    requestBluetoothPermissions();
    checkBluetoothEnabled();
  }, []);

  // ✅ Request Bluetooth permissions (for Android 12+)
  const requestBluetoothPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);

      if (
        granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT] !== PermissionsAndroid.RESULTS.GRANTED ||
        granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN] !== PermissionsAndroid.RESULTS.GRANTED
      ) {
        Alert.alert('Permissions Required', 'Bluetooth permissions are required to scan and connect.');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // ✅ Check if Bluetooth is enabled
  const checkBluetoothEnabled = async () => {
    try {
      const isEnabled = await BluetoothModule.isBluetoothEnabled();
      if (!isEnabled) {
        Alert.alert("Bluetooth Disabled", "Please enable Bluetooth to proceed.", [{ text: "OK" }]);
      } else {
        fetchDevices();
      }
    } catch (error) {
      console.error("Error checking Bluetooth status:", error);
    }
  };

  // ✅ Fetch devices
  const fetchDevices = async () => {
    checkConnectedDevices();
    fetchPairedDevices();
    scanAvailableDevices();
  };

  // ✅ Fetch connected A2DP devices
  const checkConnectedDevices = async () => {
    try {
      const devices = await BluetoothModule.checkA2DPConnectedDevices();
      setConnectedDevices(devices);
    } catch (error) {
      console.error("Error fetching connected devices:", error);
    }
  };

  // ✅ Fetch paired devices
  const fetchPairedDevices = async () => {
    try {
      const devices = await BluetoothModule.getPairedDevices();
      setPairedDevices(devices);
    } catch (error) {
      console.error("Error fetching paired devices:", error);
    }
  };

  // ✅ Scan for available devices
  const scanAvailableDevices = async () => {
    try {
      const devices = await BluetoothModule.scanDevices();
      setAvailableDevices(devices);
    } catch (error) {
      console.error("Error scanning devices:", error);
    }
  };

// const connectToDevice = async (device) => {
//   try {
//     console.log(`Attempting to connect to ${device.name} (${device.address})...`);
//     const success = await BluetoothModule.connectToA2DPDevice(device.address);
    
//     if (success) {
//       Alert.alert("Connected", `Successfully connected to ${device.name}`);
//       checkConnectedDevices(); // Refresh the list of connected devices
//     } else {
//       Alert.alert("Connection Failed", "Could not connect to the A2DP device.");
//     }
//   } catch (error) {
//     console.error("Connection error:", error);
//     Alert.alert("Error", "Failed to connect to the A2DP device.");
//   }
// };

const pairAndConnectDevice = async (device) => {
  try {
    console.log(`Attempting to pair with ${device.name} (${device.address})...`);

    // Step 1: Pair the device
    const pairStatus = await BluetoothModule.pairDevice(device.address);
    console.log("Pairing status:", pairStatus);

    if (pairStatus !== "Already Paired") {
      console.log("Waiting for pairing to complete...");
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for pairing to finish
    }

    // Step 2: Connect to the device
    console.log(`Connecting to ${device.name} (${device.address})...`);
    const success = await BluetoothModule.connectToA2DPDevice(device.address);
    
    if (success) {
      Alert.alert("Connected", `Successfully connected to ${device.name}`);
    } else {
      Alert.alert("Connection Failed", "Could not connect to the A2DP device.");
    }
  } catch (error) {
    console.error("Error:", error);
    Alert.alert("Error", error.message || "Failed to connect.");
  }};

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Refresh Devices" onPress={fetchDevices} />
      <Button title="Scan Available Devices" onPress={scanAvailableDevices} />

      {/* ✅ Connected Devices */}
      <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Connected A2DP Devices:</Text>
      <FlatList
        data={connectedDevices}
        keyExtractor={(item) => item.address}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
            <Text style={{ color: 'green' }}>{item.name || 'Unnamed Device'} (Connected)</Text>
            <Text>{item.address}</Text>
          </View>
        )}
      />

      {/* ✅ Paired Devices */}
      <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Paired Devices:</Text>
      <FlatList
        data={pairedDevices}
        keyExtractor={(item) => item.address}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => pairAndConnectDevice(item)}
            style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc', backgroundColor: '#f0f0f0', marginVertical: 5 }}
          >
            <Text>{item.name || 'Unnamed Device'}</Text>
            <Text>{item.address}</Text>
            <Button title="Connect" onPress={() => pairAndConnectDevice(item)} />
          </TouchableOpacity>
        )}
      />

      {/* ✅ Available Devices */}
      <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Available Devices:</Text>
      <FlatList
        data={availableDevices}
        keyExtractor={(item) => item.address}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => pairAndConnectDevice(item)}
            style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc', backgroundColor: '#f8f8ff', marginVertical: 5 }}
          >
            <Text>{item.name || 'Unnamed Device'}</Text>
            <Text>{item.address}</Text>
            <Button title="Connect" onPress={() => pairAndConnectDevice(item)} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default BluetoothScreen;

