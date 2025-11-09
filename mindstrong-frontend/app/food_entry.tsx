/* Import necessary libraries */

import { useState } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity, ScrollView, Platform} from "react-native";
import { useRouter, Stack } from "expo-router";
import { Picker } from "@react-native-picker/picker";

/* This food entry page will link to the exercise entry page */

export default function Food() {
    /* Food entry */ 

    const router = useRouter();
    const token = "ce8cc5b939dd44d9cad7089f448887e560d467a2";

    const [breakfastEntry, setBreakfastEntry] = useState<"Yes" | "No" |"Skipped Meal">("Yes");
    const [lunchEntry, setLunchEntry] = useState<"Yes" | "No" | "Skipped Meal">("Yes");
    const [dinnerEntry, setDinnerEntry] = useState<"Yes" | "No" | "Skipped Meal">("Yes");

    const handleSaveAndContinue = async () => {
        if(!breakfastEntry || !lunchEntry || !dinnerEntry) {
            Alert.alert("Please complete your entry for all meals")
            return;
        }

        const convertToInt = (value: string): number => {
            switch (value) {
                case "Yes":
                    return 1;
                case "No":
                    return 0;
                case "Skipped Meal":
                    return -1;
                default:
                    return -1;
            }
        };

        const foodValue = (convertToInt(breakfastEntry) + convertToInt(lunchEntry) + convertToInt(dinnerEntry));

        const foodEntryData = {
        foodValue,
        timestamp: new Date().toISOString(),
    };

    try {
        const res = await fetch("http://127.0.0.1:8000/api/food_entries/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, 
            },
            body: JSON.stringify(foodEntryData),
        });

        if (!res.ok) {
            const errData = await res.json();
            console.error("Error saving food entry:", errData);
            Alert.alert("Error", "Could not save your food entry,");
            return;
        }

        Alert.alert("Success", "Your food entry has been saved!");
        router.push("/mood_entry");
    } catch(error) {
        console.error("Network error:", error);
        Alert.alert("Network error", "Could not connect to server.")
    }

    };

    return (

        <>
        <Stack.Screen options={{ title: "Food" }}/>

        <ScrollView>
        <View>

            <View style={styles.container}>
                <Text style={styles.title}>Food</Text>

                <Text style={styles.paragraph}>Enter if you ate three complete meals today.
                    Select "Skipped Meal" if you skipped a meal.</Text>
                <Text style={styles.paragraph}>Select Yes if you plan to eat this meal after your entry
                </Text>

                <Text style={styles.label}>Did you eat breakfast with protein and carbs?</Text>
                    <Picker 
                        selectedValue={breakfastEntry}
                        onValueChange={(value) => setBreakfastEntry(value)}
                        style={styles.picker}
                        dropdownIconColor={"#333"}>

                        <Picker.Item label="Yes" value="Yes"/>
                        <Picker.Item label="No" value="No"/>
                        <Picker.Item label="Skipped Meal" value="Skipped Meal"/>
                        
                    </Picker>

               
                <Text style={styles.label}>Did you eat lunch with protein and carbs?</Text>
                    <Picker 
                        selectedValue={lunchEntry}
                        onValueChange={(value) => setLunchEntry(value)}
                        style={styles.picker}
                        dropdownIconColor={"#333"}>
                        
                        <Picker.Item label="Yes" value="Yes"/>
                        <Picker.Item label="No" value="No"/>
                        <Picker.Item label="Skipped Meal" value="Skipped Meal"/> 

                    </Picker>
                

                
                    <Text style={styles.label}>Did you eat dinner?</Text>
                    <Picker 
                            selectedValue={dinnerEntry}
                            onValueChange={(value) => setDinnerEntry(value)}
                            style={styles.picker}
                            dropdownIconColor={"#333"}>

                            <Picker.Item label="Yes" value="Yes"/>
                            <Picker.Item label="No" value="No"/>
                            <Picker.Item label="Skipped Meal" value="Skipped Meal"/>

                        </Picker> 

                

                <TouchableOpacity style={styles.saveButton} onPress={handleSaveAndContinue}>
                    <Text style={styles.saveButtonText}>Save and Continue to Mood Entry</Text>
                </TouchableOpacity>
            </View>
        </View>
        </ScrollView>
        </>
    )


}

const styles = StyleSheet.create({
    container: {
        padding: 20, 
    },

    title: { fontSize: 20, fontWeight: "500", marginBottom: 50},

    paragraph: {
        marginTop: 0, 
        marginBottom: 15, 
    },

    label: {
        fontSize: 16, 
        marginBottom: 10, 
        fontWeight: "500",
    },

    picker: {
        width: "100%",
        height: Platform.OS==="ios" ? 150 : 50,
        marginTop: 0,
        marginBottom: -10,

    },
    
    section: {
        marginBottom: 40,
    },

     saveButton: {
        backgroundColor: "#474444ff",
        paddingVertical: 14, 
        paddingHorizontal: 25, 
        borderRadius: 12, 
        alignItems: "center",
        marginTop: 20,
    },

    saveButtonText: { color: "#fff", fontSize: 18, fontWeight: "600" },

})