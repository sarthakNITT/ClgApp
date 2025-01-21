import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert, Platform } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const LoginScreen = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    rollNumber: '',
    password: '',
  });

  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleLogin = async () => {
    const { rollNumber, password } = formData;

    if (!rollNumber || !password) {
      Alert.alert('Error', 'Roll number and password are required');
      return;
    }

    try {
      const response = await axios.post(Platform.OS === 'ios' ? 'http://localhost:3001/api/auth/login' : 'http://<your-local-IP>:3001/api/auth/login', {
        rollNumber,
        password,
      });

      Alert.alert('Success', response.data.message);
      // Handle successful login (e.g., save token, navigate to another screen)
    } catch (error) {
      if (error.response) {
        // Display backend error message
        Alert.alert('Error', error.response.data.error);
      } else {
        Alert.alert('Error', 'An unexpected error occurred');
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Login Form */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Welcome back! Please login to your account.</Text>

        <TextInput
          style={styles.input}
          placeholder="Roll Number"
          placeholderTextColor="#777"
          onChangeText={(value) => handleInputChange('rollNumber', value)}
          value={formData.rollNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#777"
          secureTextEntry
          onChangeText={(value) => handleInputChange('password', value)}
          value={formData.password}
        />

        <TouchableOpacity style={styles.nextButton} onPress={handleLogin}>
          <Text style={styles.nextButtonText}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* Register Option at the Bottom */}
      <TouchableOpacity style={styles.Account} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.AccountLogin}>I don't have an account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  formContainer: {
    backgroundColor: '#101010',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 70 : 10,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 20,
  },
  input: {
    width: width - 40,
    height: 50,
    backgroundColor: '#222',
    borderRadius: 10,
    paddingHorizontal: 15,
    color: '#fff',
    marginBottom: 15,
  },
  nextButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 50,
    width: '100%',
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  Account: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    marginBottom: 10,
  },
  AccountLogin: {
    color: '#4A90E2',
    fontSize: 14,
  },
});

export default LoginScreen;
