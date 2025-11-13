import { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Stack, useRouter } from "expo-router";
import API_URL from "@/src/config";
import * as SecureStore from "expo-secure-store";

export default function Journal() {
    
    const [journalEntry, setJournalEntry] = useState("");
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const loadToken = async () => {
            const storedToken = await SecureStore.getItemAsync("authToken");
            setToken(storedToken);
            };
                
            loadToken();
        }, []);

    const handleSave = async () => {

        const journaled = journalEntry.trim().length > 0;
        const journalEntryData = {
            journaled_status: journaled, 
            timestamp: new Date().toISOString(),
        };

        try {
            const res = await fetch(`${API_URL}/api/journal_entries/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${token}`,

                },

                body: JSON.stringify(journalEntryData),
            });

            if (!res.ok) {
                const errData = await res.json();
                console.error("Error processing your journal entry:", errData);
                Alert.alert("Error");
                return;
            }

            Alert.alert(
                "Thanks for sharing your thoughts!",
                "For privacy, your exact journal entry wasn't stored. We noted that you journaled today for analysis."
            );
            router.push("/registered_user_welcome");

        } catch(error) {
            console.error("Network error:", error);
            Alert.alert("Network error. Please try again.");
        }
    };

    return (
    <>
        <Stack.Screen options={{ title: "Journal Entry" }}/>
        <View style={styles.container}>
            <Text style={styles.title}>Share Your Thoughts</Text>
            <Text style={styles.paragraph}>You can skip this portion. Simply press "Back to Home" at the bottom</Text>

            <TextInput
                style={styles.textArea}
                placeholder="This is a safe space to express yourself"
                value={journalEntry}
                onChangeText={setJournalEntry}
                multiline
                textAlignVertical="top"/>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Back to Home</Text>
            </TouchableOpacity>
        </View>
    </>
)
};

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        padding: 20, 
        backgroundColor: "#fff",
    },

    title: {
        fontSize: 22, 
        fontWeight: "600",
        marginBottom: 15, 
    },

    textArea: {
        flex: 1, 
        borderColor: "#ccc",
        borderWidth: 1, 
        borderRadius: 10, 
        padding: 12, 
        fontSize: 16, 
        minHeight: 250, 
    },

    saveButton: {
        backgroundColor: "#333",
        paddingVertical: 14, 
        borderRadius: 10, 
        alignItems: "center",
        marginTop: 20, 
    },

    saveButtonText: {
        color: "#fff",
        fontSize: 18, 
        fontWeight: "600",
    },

    paragraph: {
        marginTop: 0, 
        marginBottom: 15,
    }
});