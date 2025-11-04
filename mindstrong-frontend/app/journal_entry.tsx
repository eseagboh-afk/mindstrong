import { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Stack, useRouter } from "expo-router";

export default function Journal() {
    
    const [journalEntry, setJournalEntry] = useState("");
    const router = useRouter();

    const handleSave = () => {
       return;
    }

    const journalEntryData = {
        journalEntry,
        timestamp: new Date().toISOString(),
    }

    router.push("/");


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