import { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Stack, useRouter } from "expo-router";

export default function Journal() {
    
    const [journalEntry, setJournalEntry] = useState("");
    const router = useRouter();
    const token = "ce8cc5b939dd44d9cad7089f448887e560d467a2";

    const handleSave = async () => {

        const journaled = journalEntry.trim().length > 0;
        const journalEntryData = {
            journaled, 
            timestamp: new Date().toISOString(),
        };

        try {
            const res = await fetch("http://127.0.0.1:8000/api/journal_entries/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,

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
            router.push("/");

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