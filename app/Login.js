import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { themeColors } from '../theme';
import { Link, router } from 'expo-router';
import { db, auth } from '../src/services/firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getUser } from '../src/services/firebase/userService';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then(async (userCrendential) => {
        // if current user is vendor, redirect to Vendor/Products
        // if current user is consumer, redirect to Consumer/Products

        const user = userCrendential.user;
        const userData = getUser(user.uid);

        if (userData.userType === 'consumer') {
          router.replace('/Consumer/Products');
        } else {
          router.replace('/Vendor/Products')
        }
        
        console.log('Signed in successfully');
        
    })
    .catch((error) => {
      Alert.alert("Sign in failed", error.message);
    });
  }

  return (
    <View style={[styles.flexOne, { backgroundColor: themeColors.bg }]}>
      <SafeAreaView style={styles.flex}>
        <View style={styles.flexRowJustifyStart}>
          <Link href="/" style={styles.goBackButton}>
            <ArrowLeftIcon size={20} color="black" />
          </Link>
        </View>
        <View style={styles.flexRowJustifyCenter}>
          <Image source={require('../src/assets/images/login.png')} style={styles.imageStyle} />
        </View>
      </SafeAreaView>
      <View style={styles.formContainer}>
      <View style={styles.form}>
        <Text style={styles.label}>Email Address</Text>
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
        <TouchableOpacity style={styles.forgotPasswordButton}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.loginButton}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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
  imageStyle: {
    width: 200,
    height: 200,
  },
  formContainer: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 32, // px-8
    paddingTop: 32, // pt-8
  },
  form: {
    // space-y-2 can be handled by marginBottom in each element
  },
  label: {
    color: '#4B5563', // text-gray-700
    marginLeft: 16, // ml-4
    marginBottom: 8, // for space-y-2 effect
  },
  input: {
    padding: 16, // p-4
    backgroundColor: '#F3F4F6', // bg-gray-100
    color: '#4B5563', // text-gray-700
    borderRadius: 25, // rounded-2xl
    marginBottom: 12, // mb-3
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 20, // mb-5
  },
  forgotPasswordText: {
    color: '#4B5563', // text-gray-700
  },
  loginButton: {
    paddingVertical: 12, // py-3
    backgroundColor: '#FCD34D', // bg-yellow-400
    borderRadius: 25, // rounded-xl
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: 20, // text-xl
    fontWeight: 'bold', // font-bold
    color: '#4B5563', // text-gray-700
    textAlign: 'center',
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
  }
});
