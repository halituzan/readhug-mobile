import Colors from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { Login } from "@/services/auth/login.service";
import { Link, Redirect, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import RHInput from "../ui/RHInput";

export default function LoginScreen() {
  const { themeModeColor } = useTheme();
  const [email, setEmail] = useState("halit.uzan@gmail.com");
  const [password, setPassword] = useState("123456789c!");
  const router = useRouter();

  const color = themeModeColor(50);
  const backgroundColor = themeModeColor(900);

  const handleLogin = async () => {
    try {
      const data: any = await Login({ email, password });

      if (data.access_token) {
        router.push("/home");
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
        },
      ]}
    >
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
      />

      <Text style={[styles.title, { color }]}>Welcome Back!</Text>
      <Text
        style={[
          styles.subtitle,
          {
            color: themeModeColor(300),
          },
        ]}
      >
        Login to continue
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: themeModeColor(800),
              color: themeModeColor(50),
            },
          ]}
          placeholder='Email'
          placeholderTextColor='#aaa'
          keyboardType='email-address'
          value={email}
          onChangeText={setEmail}
        />
        <RHInput value={email} setValue={setEmail} />
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: themeModeColor(800),
              color: themeModeColor(50),
            },
          ]}
          placeholder='Password'
          placeholderTextColor='#aaa'
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Divider */}
      {/* <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.dividerText}>or</Text>
        <View style={styles.line} />
      </View> */}

      {/* Social Login */}
      {/* <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.socialIcon}
          />
          <Text style={styles.socialText}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.socialIcon}
          />
          <Text style={styles.socialText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View> */}

      {/* Sign Up */}
      <View style={styles.signupContainer}>
        <Text style={[{ color: themeModeColor(100) }]}>
          Don't have an account?{" "}
        </Text>
        <TouchableOpacity>
          <Link href={"/auth/register"} style={styles.signupLink}>
            Sign Up
          </Link>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: Colors.colors.primary,
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: Colors.colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  loginButtonText: {
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
  signupContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  signupLink: {
    color: Colors.colors.primary,
    fontWeight: "bold",
  },
});
