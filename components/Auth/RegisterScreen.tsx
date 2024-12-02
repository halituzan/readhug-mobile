import Colors from "@/constants/Colors";
import { useStyles } from "@/hooks/useStyles";
import { useTheme } from "@/hooks/useTheme";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

export default function RegisterScreen() {
  const { styles: themeStyle } = useStyles();
  const { themeModeColor } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const color = themeModeColor(50);
  const backgroundColor = themeModeColor(900);
  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  };

  const inputStyles = themeStyle({}).input;
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
        },
      ]}
    >
      {/* Logo */}
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
      />

      {/* Title */}
      <Text style={[styles.title, { color }]}>Create an Account</Text>
      <Text
        style={[
          styles.subtitle,
          {
            color: themeModeColor(300),
          },
        ]}
      >
        Sign up to get started
      </Text>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <TextInput
          style={inputStyles}
          placeholder='Name'
          placeholderTextColor='#aaa'
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={inputStyles}
          placeholder='Email'
          placeholderTextColor='#aaa'
          keyboardType='email-address'
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={inputStyles}
          placeholder='Password'
          placeholderTextColor='#aaa'
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={inputStyles}
          placeholder='Confirm Password'
          placeholderTextColor='#aaa'
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      {/* Register Button */}
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>

      {/* Divider */}
      {/* <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.dividerText}>or</Text>
        <View style={styles.line} />
      </View> */}

      {/* Social Signup */}
      {/* <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.socialIcon}
          />
          <Text style={styles.socialText}>Sign up with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.socialIcon}
          />
          <Text style={styles.socialText}>Sign up with Facebook</Text>
        </TouchableOpacity>
      </View> */}

      {/* Login Link */}
      <View style={styles.loginContainer}>
        <Text style={[{ color: themeModeColor(100) }]}>
          Already have an account?{" "}
        </Text>
        <TouchableOpacity>
          <Link href={"/auth/login"} style={styles.loginLink}>
            Login
          </Link>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 100,
    height: 90,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.light.tint,
  },
  subtitle: {
    fontSize: 16,
    color: "#aaa",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 10,
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 16,
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  registerButton: {
    backgroundColor: Colors.colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  registerButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#444",
  },
  dividerText: {
    marginHorizontal: 10,
    color: "#aaa",
  },
  socialContainer: {
    width: "100%",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1f242b",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  socialText: {
    color: "#fff",
    fontSize: 16,
  },
  loginContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  loginText: {
    color: "#aaa",
  },
  loginLink: {
    color: Colors.colors.primary,
    fontWeight: "bold",
  },
});
