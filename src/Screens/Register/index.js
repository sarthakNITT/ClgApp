import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  Modal,
  FlatList,
  Platform,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const branches = [
  'Production Engineering',
  'Computer Science Engineering',
  'Chemical Engineering',
  'Material Science and Metallurgy Engineering',
  'Mechanical Engineering',
  'Electrical and Electronics Engineering',
  'Civil Engineering',
  'Electronics and Communication Engineering',
  'Instrumentation and Control Engineering',
];

const batches = ['2028', '2027'];

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    phoneNumber: '',
    password: '',
    rollNumber: '',
    branch: '',
    batch: '',
  });
  const [isBranchModalVisible, setBranchModalVisible] = useState(false);
  const [isBatchModalVisible, setBatchModalVisible] = useState(false);

  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleBranchSelect = (branch) => {
    setFormData({ ...formData, branch });
    setBranchModalVisible(false);
  };

  const handleBatchSelect = (batch) => {
    setFormData({ ...formData, batch });
    setBatchModalVisible(false);
  };

  const handleRegister = async () => {
    const { phoneNumber, password, rollNumber, branch, batch } = formData;

    if (!phoneNumber || !password || !rollNumber || !branch || !batch) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    const rollNumberRegex = /^\d{9}$/;
    if (!rollNumberRegex.test(rollNumber)) {
      Alert.alert('Error', 'Roll Number must be exactly 9 digits');
      return;
    }

    const phoneNumberRegex = /^\d{10}$/;
    if (!phoneNumberRegex.test(phoneNumber)) {
      Alert.alert('Error', 'Phone Number must be exactly 10 digits');
      return;
    }

    try {
      const response = await axios.post(
        Platform.OS === 'ios' 
          ? 'http://localhost:3001/api/auth/register' 
          : 'http://<your-local-IP>:3001/api/auth/register',
        {
          phoneNumber,
          password,
          rollNumber,
          branch,
          batch,
        }
      );

      Alert.alert('Success', response.data.message, [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login'),
        },
      ]);
    } catch (error) {
      if (error.response) {
        Alert.alert('Error', error.response.data.error);
      } else {
        Alert.alert('Error', 'An unexpected error occurred');
      }
    }
  };

  return (
    <View style={styles.container}>
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
        <TouchableOpacity
          style={styles.input}
          onPress={() => setBranchModalVisible(true)}
        >
          <Text style={formData.branch ? styles.inputText : styles.placeholderText}>
            {formData.branch || 'Select Branch'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setBatchModalVisible(true)}
        >
          <Text style={formData.batch ? styles.inputText : styles.placeholderText}>
            {formData.batch || 'Select Batch'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nextButton} onPress={handleRegister}>
          <Text style={styles.nextButtonText}>Register</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isBranchModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setBranchModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Branch</Text>
            <FlatList
              data={branches}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => handleBranchSelect(item)}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setBranchModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={isBatchModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setBatchModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Batch</Text>
            <FlatList
              data={batches}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => handleBatchSelect(item)}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setBatchModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
    paddingTop: Platform.OS === 'ios' ? 80 : 30,
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
    justifyContent: 'center',
    marginBottom: 15,
    color: '#fff'
  },
  inputText: {
    color: '#fff',
  },
  placeholderText: {
    color: '#777',
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#222',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  modalItem: {
    width: '100%',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#555',
  },
  modalItemText: {
    color: '#fff',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: '#4A90E2',
    padding: 10,
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default RegisterScreen;
