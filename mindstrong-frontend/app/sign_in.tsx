import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { Text, View, StyleSheet, Alert, TextInput, Button, } from "react-native";

export default function SignIn () {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/profile", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                /*"Authorization": `Token ${token}`,*/
            },
        })
    }, []);

    const signIn = () => {
        fetch("http://127.0.0.1:8000/api/signin"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                /* "Authorization": `Token ${token}`, */
            },

            body: JSON.stringify({
                email, 
                password, 
                username
            })
        }
    }
}