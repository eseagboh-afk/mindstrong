/* Import necessary libraries */

import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { useRouter, Stack } from "expo-router";
import { Picker } from "@react-native-picker/picker";

/* This exercise entry page will link to the sleep entry page */

export default function ExerciseEntry() {

    /* Exercise entry */

    const router = useRouter();
    const token = "ce8cc5b939dd44d9cad7089f448887e560d467a2";

    const [exerciseEntry, setExerciseEntry] = useState<boolean | null>(null);
    const [isPickerVisible, setPickerVisible] = useState(false);


    const handleSaveAndContinue = async () => {
        if (!exerciseEntry) {
            Alert.alert("Please select yes or no")
            return;
        }

        const exerciseEntryData = {
        exerciseEntry,
        timestamp: new Date().toISOString(),

    };

    try {
        const res = await fetch("http://127.0.0.1:8000/api/exercise_entries/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },

            body: JSON.stringify(exerciseEntry),
        });

        if (!res.ok) {
            const errData = await res.json();
            console.error("Error saving exercise entry:", errData);
            Alert.alert("Error", "Could not save your food entry,");
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