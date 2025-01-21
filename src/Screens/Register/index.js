import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    phoneNumber: '',
    password: '',
    rollNumber: '',
    branch: '',
    batch: '',
  });

  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleRegister = async () => {
    const { phoneNumber, password, rollNumber, branch, batch } = formData;

    if (!phoneNumber || !password || !rollNumber || !branch || !batch) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    try {
      // for android-emulator http://10.0.2.2:5000/api/auth/register
      // for ios-emulator http://localhost:5000/api/auth/register
      // for physical device http://<your-local-IP>:5000/api/auth/register
      const response = await axios.post(Platform.OS === 'ios' ? 'http://localhost:3001/api/auth/register' : 'http://<your-local-IP>:3001/api/auth/register', {
        phoneNumber,
        password,
        rollNumber,
        branch,
        batch,
      });

      Alert.alert('Success', response.data.message, [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login'), // Navigate to Login screen
        },
      ]);
    } catch (error) {
      if (error.response) {
        // Backend error messages
        Alert.alert('Error', error.response.data.error);
      } else {
        Alert.alert('Error', 'An unexpected error occurred');
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Registration Form */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>Register</Text>
        <Text style={styles.subtitle}>Welcome! Create your account.</Text>

        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="#777"
          keyboardType="numeric"
          onChangeText={(value) => handleInputChange('phoneNumber', value)}
          value={formData.phoneNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#777"
          secureTextEntry
          onChangeText={(value) => handleInputChange('password', value)}
          value={formData.password}
        />
        <TextInput
          style={styles.input}
          placeholder="Roll Number"
          placeholderTextColor="#777"
          onChangeText={(value) => handleInputChange('rollNumber', value)}
          value={formData.rollNumber}
        />
        <View style={styles.inputBox}>
          <TextInput
            style={styles.inputBoxElement}
            placeholder="Branch"
            placeholderTextColor="#777"
            onChangeText={(value) => handleInputChange('branch', value)}
            value={formData.branch}
          />
          <TextInput
            style={styles.inputBoxElement}
            placeholder="Batch"
            placeholderTextColor="#777"
            keyboardType="numeric"
            onChangeText={(value) => handleInputChange('batch', value)}
            value={formData.batch}
          />
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={handleRegister}>
          <Text style={styles.nextButtonText}>Register</Text>
        </TouchableOpacity>
      </View>

      {/* Account Login at the bottom */}
      <TouchableOpacity style={styles.Account} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.AccountLogin}>I already have an account</Text>
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
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputBoxElement: {
    width: '48%',
    height: 50,
    backgroundColor: '#222',
    borderRadius: 10,
    paddingHorizontal: 15,
    color: '#fff',
    marginBottom: 15,
    marginHorizontal: 7.5
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
  },
  AccountLogin: {
    color: '#4A90E2',
    fontSize: 14,
  },
});

export default RegisterScreen;