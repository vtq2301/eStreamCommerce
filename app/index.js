import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { themeColors } from '../theme';

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: themeColors.bg}]}>
        <View style={styles.content}>
            <Text style={styles.title}>Let's Get Started!</Text>
            <View style={styles.imageContainer}>
                <Image 
                    source={require("../src/assets/images/welcome.png")}
                    style={styles.image}
                />
            </View>
            <View style={styles.buttonGroup}>
                <Link href="/SignUp" style={styles.signUpButton}>
                    <Text style={styles.signUpText}>Sign Up</Text>
                </Link>
                <View style={styles.loginContainer}>
                    <Text style={styles.alreadyAccountText}>Already have an account?</Text>
                    <Link href="/Login" style={styles.loginText}>
                        Log In
                    </Link>
                </View>
            </View>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 32,
    textAlign: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    width: 350,
    height: 350,
  },
  buttonGroup: {
    marginHorizontal: 28,
  },
  signUpButton: {
    backgroundColor: '#FCD34D', // yellow-400
    paddingVertical: 12,
    borderRadius: 15,
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151', // gray-700
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  alreadyAccountText: {
    color: 'white',
    fontWeight: '600',
  },
  loginText: {
    fontWeight: '600',
    color: '#FCD34D', // yellow-400
  },
  // Add more styles as needed
});
