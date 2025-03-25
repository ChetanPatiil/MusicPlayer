package com.musicplayer

import android.Manifest
import android.annotation.SuppressLint
import android.app.Activity
import android.bluetooth.*
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.content.pm.PackageManager
import android.os.Build
import android.os.Handler
import android.os.Looper
import android.util.Log
import androidx.core.app.ActivityCompat
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import java.lang.reflect.Method
import java.util.UUID


class BluetoothModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val bluetoothAdapter: BluetoothAdapter? = BluetoothAdapter.getDefaultAdapter()

    override fun getName(): String {
        return "BluetoothModule"
    }

    // ✅ Check if Bluetooth is enabled
    @ReactMethod
    fun isBluetoothEnabled(promise: Promise) {
        promise.resolve(bluetoothAdapter?.isEnabled ?: false)
    }

    // ✅ Get connected A2DP devices
    @ReactMethod
    fun checkA2DPConnectedDevices(promise: Promise) {
        bluetoothAdapter?.getProfileProxy(reactApplicationContext, object : BluetoothProfile.ServiceListener {
            override fun onServiceConnected(profile: Int, proxy: BluetoothProfile) {
                if (profile == BluetoothProfile.A2DP) {
                    val devices = proxy.connectedDevices
                    val deviceList = devices.map { device ->
                        mapOf("name" to device.name, "address" to device.address)
                    }
                    promise.resolve(Arguments.makeNativeArray(deviceList))
                }
                bluetoothAdapter?.closeProfileProxy(BluetoothProfile.A2DP, proxy)
            }

            override fun onServiceDisconnected(profile: Int) {}
        }, BluetoothProfile.A2DP)
    }

    // ✅ Get paired devices
    @ReactMethod
    fun getPairedDevices(promise: Promise) {
        val pairedDevices = bluetoothAdapter?.bondedDevices ?: emptySet()
        val deviceList = pairedDevices.map { device ->
            mapOf("name" to device.name, "address" to device.address)
        }
        promise.resolve(Arguments.makeNativeArray(deviceList))
    }

    // ✅ Scan for available Bluetooth devices
    @ReactMethod
    fun scanDevices(promise: Promise) {
        val discoveredDevices = mutableListOf<Map<String, String>>()

        val receiver = object : BroadcastReceiver() {
            override fun onReceive(context: Context, intent: Intent) {
                val device = intent.getParcelableExtra<BluetoothDevice>(BluetoothDevice.EXTRA_DEVICE)
                if (device != null) {
                    discoveredDevices.add(mapOf("name" to (device.name ?: "Unknown"), "address" to device.address))
                }
            }
        }

        val filter = IntentFilter(BluetoothDevice.ACTION_FOUND)
        reactApplicationContext.registerReceiver(receiver, filter)

        bluetoothAdapter?.startDiscovery()

        // Stop scanning after 10 seconds
        Handler(Looper.getMainLooper()).postDelayed({
            bluetoothAdapter?.cancelDiscovery()
            reactApplicationContext.unregisterReceiver(receiver)
            promise.resolve(Arguments.makeNativeArray(discoveredDevices))
        }, 10000)
    }

    // 🔹 Pair a device programmatically
    @ReactMethod
    fun pairDevice(address: String, promise: Promise) {
        if (bluetoothAdapter == null) {
            promise.reject("BLUETOOTH_NOT_AVAILABLE", "Bluetooth is not available on this device")
            return
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S &&
            ActivityCompat.checkSelfPermission(reactApplicationContext, Manifest.permission.BLUETOOTH_CONNECT)
            != PackageManager.PERMISSION_GRANTED) {
            promise.reject("PERMISSION_DENIED", "BLUETOOTH_CONNECT permission not granted")
            return
        }

        val device = bluetoothAdapter.getRemoteDevice(address)

        if (device.bondState == BluetoothDevice.BOND_BONDED) {
            promise.resolve("Already Paired")
            return
        }

        try {
            val createBondMethod: Method = device.javaClass.getMethod("createBond")
            val result = createBondMethod.invoke(device) as Boolean
            if (result) {
                promise.resolve("Pairing Started")
            } else {
                promise.reject("PAIRING_FAILED", "Failed to start pairing")
            }
        } catch (e: Exception) {
            promise.reject("PAIRING_ERROR", "Error while pairing", e)
        }
    }

    // 🔹 Connect to an A2DP Device
    @ReactMethod
    fun connectToA2DPDevice(address: String, promise: Promise) {
        val device = bluetoothAdapter?.getRemoteDevice(address)
        if (device == null) {
            promise.reject("DEVICE_NOT_FOUND", "Bluetooth device not found")
            return
        }

        bluetoothAdapter?.getProfileProxy(reactApplicationContext, object : BluetoothProfile.ServiceListener {
            override fun onServiceConnected(profile: Int, proxy: BluetoothProfile) {
                if (profile == BluetoothProfile.A2DP) {
                    val a2dp = proxy as BluetoothA2dp
                    try {
                        val connectMethod = a2dp.javaClass.getMethod("connect", BluetoothDevice::class.java)
                        connectMethod.invoke(a2dp, device)
                        promise.resolve(true)
                    } catch (e: Exception) {
                        promise.reject("CONNECTION_FAILED", "Failed to connect via A2DP", e)
                    }
                }
                bluetoothAdapter?.closeProfileProxy(BluetoothProfile.A2DP, proxy)
            }

            override fun onServiceDisconnected(profile: Int) {}
        }, BluetoothProfile.A2DP)
    }
}
