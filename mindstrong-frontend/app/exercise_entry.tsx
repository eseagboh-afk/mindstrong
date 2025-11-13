/* Import necessary libraries */

import * as SecureStore from "expo-secure-store";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { useRouter, Stack } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import API_URL from "@/src/config";

/* This exercise entry page will link to the sleep entry page */

export default function ExerciseEntry() {

    /* Exercise entry */

    const router = useRouter();

    const [exerciseEntry, setExerciseEntry] = useState<boolean | null>(null);
    const [isPickerVisible, setPickerVisible] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const loadToken = async () => {
            const storedToken = await SecureStore.getItemAsync("authToken");
            setToken(storedToken);
        };
        loadToken();
    }, []);


    const handleSaveAndContinue = async () => {
        if (!exerciseEntry) {
            Alert.alert("Please select yes or no")
            return;
        }

        const exerciseEntryData = {
        exercised: exerciseEntry,
        timestamp: new Date().toISOString(),

    };

    try {
        const res = await fetch(`${API_URL}/api/exercise_entries/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },

            body: JSON.stringify(exerciseEntryData),
        });

        if (!res.ok) {
            const errData = await res.json();
            console.error("Error saving exercise entry:", errData);
            Alert.alert("Error", "Could not save your exercise entry,");
            return;
        }

        Alert.alert("Success", "Your exercise entry has been saved!");
        router.push("/food_entry");
    } catch (error) {
        console.error("Network error:", error);
        Alert.alert("Network error", "Could not connect to server.")
    }


    };

    return (

        <>
        <Stack.Screen options={{ title: "Exercise" }}/>

        <View> 
            <View style={styles.container}>
                <Text style={styles.title}>Exercise</Text>

                <Text style={styles.paragraph}>Enter if you exercised for at least 20 minutes today</Text>

                <Text style={styles.label}>Did you exercise for at least 20 minutes today?</Text>

                <View>
                    <Picker 
                        selectedValue={exerciseEntry}
                        onValueChange={(value) => setExerciseEntry(value)}
                        style={styles.picker}
                        dropdownIconColor={"#333"}>
                        
                        <Picker.Item label="Yes" value={true}/>
                        <Picker.Item label="No" value={false}/>

                    </Picker>
                </View>

                <TouchableOpacity style={styles.saveButton} onPress={handleSaveAndContinue}>
                    <Text style={styles.saveButtonText}>Save and Continue to Food</Text>
                </TouchableOpacity>
            </View>
        </View>
        </>
    )




}

const styles = StyleSheet.create({
    container: {
        padding: 20, 
    },

    title: { fontSize: 20, fontWeight: "500", marginBottom: 50},

    paragraph: {
        marginTop: 10, 
        marginBottom: 35, 
    },

    label: {
        fontSize: 16, 
        marginBottom: 10, 
        fontWeight: "500",
        marginTop: 100, 
    },


    picker: {
        width: "100%",
        height: 50, 
        marginTop: -10,
        marginBottom: 200,

    },

    exerciseButton: {
        backgroundColor: "#191b1eff",
        paddingVertical: 14, 
        paddingHorizontal: 25, 
        borderRadius: 12, 
        marginBottom: 20, 
    },

    exerciseText:  {
        fontSize: 18, 
        fontWeight: "600",
        marginTop: 10,
        color: "#fff", 
    },

    saveButton: {
        backgroundColor: "#474444ff",
        paddingVertical: 14, 
        paddingHorizontal: 25, 
        borderRadius: 12, 
        alignItems: "center",
        marginTop: 80,
    },

    saveButtonText: { color: "#fff", fontSize: 18, fontWeight: "600" },


    
})