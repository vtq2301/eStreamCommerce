import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, Alert,  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { router, Link } from 'expo-router';
import { themeColors } from '../theme';
import { db, auth } from '../src/services/firebase/firebaseConfig';
import RNPickerSelect from 'react-native-picker-select';
import { createUser, getUser } from '../src/services/firebase/userService';
import {createUserWithEmailAndPassword } from 'firebase/auth';

export default function SignUpScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState(null);

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCrendential) => {
            console.log(userCrendential, userCrendential.user);
            createUser(userCrendential.user);
            Alert.alert("Signup successfull");
        })
        .catch((error) => {
            Alert.alert("Signup failed", error.message);
        }
        );
    }
    
  return (
    <View style={[styles.flexOne, { backgroundColor: themeColors.bg }]}>
      <SafeAreaView style={styles.flex}>
        <View style={styles.flexRowJustifyStart}>
          <TouchableOpacity 
              onPress={() => router.back()}
              style={styles.goBackButton}
          >
            <ArrowLeftIcon size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.flexRowJustifyCenter}>
          <Image source={require('../src/assets/images/signup.png')} style={styles.image} />
        </View>
      </SafeAreaView>
      <View style={styles.formContainer}>
        {/* Form and other components go here */}
        <View style={styles.form}>
        <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
        />
        <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
        />
        <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
        />
        <RNPickerSelect
            style={styles.input}
            onValueChange={(value) => setUserType(value)}
            items={[
                { label: 'Customer', value: 'customer'},
                { label: 'Vendor', value: 'vendor'},
            ]}
            placeholder={{ label: 'Select User Type...', value: null}}
        />
        <TouchableOpacity
            style={styles.signUpButton}
            onPress={handleSignUp}
        >
            <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>
    </View>
        <Text style={styles.orTextStyle}>
            Or
        </Text>
        <View style={styles.socialMediaRow}>
        <TouchableOpacity style={styles.socialMediaButton}>
            <Image source={require('../src/assets/icons/google.png')} style={styles.socialMediaIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialMediaButton}>
            <Image source={require('../src/assets/icons/apple.png')} style={styles.socialMediaIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialMediaButton}>
            <Image source={require('../src/assets/icons/facebook.png')} style={styles.socialMediaIcon} />
        </TouchableOpacity>
        </View>
        <View style={styles.loginRedirectRow}>
        <Text style={styles.alreadyAccountText}>Already have an account?</Text>
        <TouchableOpacity onPress={()=> router.replace('/Login')}>
            <Text style={styles.loginText}> Login</Text>
        </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}

// Add your styles here
const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  flexRowJustifyStart: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  goBackButton: {
    backgroundColor: '#fcd34d', // yellow-400
    padding: 8,
    borderRadius: 25, // Adjust as needed for the rounded-tr-2xl and rounded-bl-2xl effect
    marginLeft: 16,
  },
  flexRowJustifyCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    width: 165,
    height: 110,
  },
  formContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 32,
    paddingTop: 32,
  },
  orTextStyle: {
    fontSize: 18, // text-xl, adjust the size as needed
    color: '#4B5563', // text-gray-700
    fontWeight: 'bold', // font-bold
    textAlign: 'center', // text-center
    paddingVertical: 10, // py-5
  },
  socialMediaRow: {
    flexDirection: 'row', // flex-row
    justifyContent: 'center', // justify-center
    paddingHorizontal: 48, // space-x-12 (24 * 2 for each side)
    alignItems: 'center',
  },
  socialMediaButton: {
    padding: 8, // p-2
    backgroundColor: '#F3F4F6', // bg-gray-100
    borderRadius: 20, // rounded-2xl
    marginHorizontal: 12, // Half of space-x-12
  },
  socialMediaIcon: {
    width: 40, // w-10
    height: 40, // h-10
  },
  loginRedirectRow: {
    flexDirection: 'row', // flex-row
    justifyContent: 'center', // justify-center
    marginTop: 28, // mt-7
    alignItems: 'center',
  },
  alreadyAccountText: {
    color: '#6B7280', // text-gray-500
    fontWeight: '600', // font-semibold
  },
  loginText: {
    fontWeight: '600', // font-semibold
    color: '#FCD34D', // text-yellow-500
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 6,
  },
  signUpButton: {
    paddingVertical: 12, // py-3
    backgroundColor: '#FCD34D', // bg-yellow-400
    borderRadius: 10, // rounded-xl, adjust the value as needed
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpButtonText: {
    fontSize: 20, // font-xl, adjust the size as needed
    fontWeight: 'bold', // font-bold
    color: '#4B5563', // text-gray-700
    textAlign: 'center', // text-center
  },
});
