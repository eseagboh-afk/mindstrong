import { useEffect, useState } from "react";
import { Stack, useRouter, Link } from "expo-router";
import { Text, View, StyleSheet, Alert, TextInput, Button, TouchableOpacity } from "react-native";
import { saveToken } from "../utils/authToken";

export default function SignIn () {

    const router = useRouter();
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const API_BASE = "http://127.0.0.1:8000/";

    async function handleSignIn() {
        if (!username || !password) {
            Alert.alert("Missing fields", "Please enter both username and password.");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(`${API_BASE}/api/token-auth/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                const msg = data.detail || "Invalid credentials.";
                Alert.alert("Login failed", msg);
                setLoading(false);
                return;
            }

            const token = data.token || data.key || data.auth_token || data?.user?.token;
            
            if (!token) {
                Alert.alert("Error", "No token received from the server.");
                return;
            }

            await saveToken(token);
            Alert.alert("Success", "Signed in successfully!");
            router.replace("/user_profile");

        }   catch (err) {
            console.error("Sign-in error:", err);
            Alert.alert("Network error", "Could not connect to server.");
        }   finally {
            setLoading(false);
        }

        router.push("/registered_user_welcome")

    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Sign In</Text>

            <TextInput

                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
                autoCapitalize="none"
            />

            <TextInput

                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
            />

            <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
                <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20 },
    heading: { fontSize: 24, fontWeight: "600", marginBottom: 20 },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8, 
        padding: 10, 
        marginBottom: 15, 
    },
    signInText: {
        fontSize: 16, 
        marginBottom: 10, 
        fontWeight: "500",
        color: "#ccc",
        alignContent: "center",
    },

    signInButton: {
        backgroundColor: "#191b1eff",
        paddingVertical: 14, 
        paddingHorizontal: 25, 
        borderRadius: 12, 
        marginBottom: 20, 
    },
});
