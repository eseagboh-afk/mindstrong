/* Import necessary libraries */

import { useState } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";

/* This food entry page will link to the exercise entry page */

export default function() {
    /* Food entry */ 

    const router = useRouter();

    const [breakfastEntry, setBreakfastEntry] = useState<"Yes" | "No" |"Skipped Meal">("Yes");
    const [lunchEntry, setLunchEntry] = useState<"Yes" | "No" | "Skipped Meal">("Yes");
    const [dinnerEntry, setDinnerEntry] = useState<"Yes" | "No" | "Skipped Meal">("Yes");

    const foodEntryData = {
        breakfastEntry, 
        lunchEntry, 
        dinnerEntry,
        timestamp: new Date().toISOString(),
    }

    const handleSaveAndContinue = () => {
        if(!breakfastEntry || !lunchEntry || !dinnerEntry) {
            Alert.alert("Please complete your entry for all meals")
            return;
        }
    }

    /* router.push("/mood_entry")*/

    return (

        <ScrollView>
        <View>

            <View style={styles.container}>
                <Text style={styles.title}>Food</Text>

                <Text style={styles.paragraph}>Enter if you ate three complete meals today.
                    Select "Skipped Meal" if you skipped a meal
                </Text>
                <View>
                <Text style={styles.label}>Did you eat lunch with protein and carbs?</Text>
                    <Picker 
                        selectedValue={lunchEntry}
                        onValueChange={(value) => setLunchEntry(value)}
                        style={styles.pickerLunch}
                        dropdownIconColor={"#333"}>
                        
                        <Picker.Item label="Yes" value="Yes"/>
                        <Picker.Item label="No" value="No"/>
                        <Picker.Item label="Skipped Meal" value="Skipped Meal"/> 

                    </Picker>
                </View>

                <View>
                    <Text style={styles.label}>Did you eat dinner?</Text>
                    <Text style={styles.paragraph}>Choose yes if you plan to eat dinner after your entry</Text>
                        <Picker 
                            selectedValue={dinnerEntry}
                            onValueChange={(value) => setDinnerEntry(value)}
                            style={styles.pickerDinner}
                            dropdownIconColor={"#333"}>

                            <Picker.Item label="Yes" value="Yes"/>
                            <Picker.Item label="No" value="No"/>
                            <Picker.Item label="Skipped Meal" value="Skipped Meal"/>

                        </Picker> 
                </View>

                <TouchableOpacity style={styles.saveButton} onPress={handleSaveAndContinue}>
                    <Text style={styles.saveButtonText}>Save and Continue to Mood Entry</Text>
                </TouchableOpacity>
            </View>
        </View>
        </ScrollView>
    )


}

const styles = StyleSheet.create({
    container: {
        padding: 20, 
    },

    title: { fontSize: 20, fontWeight: "500", marginBottom: 50},

    paragraph: {
        marginTop: 0, 
        marginBottom: 0, 
    },

    label: {
        fontSize: 16, 
        marginBottom: 50, 
        fontWeight: "500",
        marginTop: 10, 
    },


    pickerLunch: {
        width: "100%",
        height: 50, 
        marginTop: -50,
        marginBottom: 0,

    },

     pickerDinner: {
        width: "100%", 
        marginTop: 0,
        marginBottom: 0,

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