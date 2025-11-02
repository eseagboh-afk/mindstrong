/* Import necessary libraries */

import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";

/* This exercise entry page will link to the sleep entry page */

export default function ExerciseEntry() {

    /* Exercise entry */

    const router = useRouter();

    const [exerciseEntry, setExerciseEntry] = useState<boolean | null>(null);
    const [isPickerVisible, setPickerVisible] = useState(false);

    const exerciseEntryData = {
        exerciseEntry,
        timestamp: new Date().toISOString(),

    }

    const handleSaveAndContinue = () => {
        if (!exerciseEntry) {
            Alert.alert("Please select yes or no")
            return;
        }
    }

    router.push("/food_entry");

    return (

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