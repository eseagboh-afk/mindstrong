/* Import necessary libraries */

import { useState } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity, ScrollView, Platform} from "react-native";
import { useRouter, Stack } from "expo-router";
import { Picker } from "@react-native-picker/picker";

/* This mood entry page will link to the food entry page */

export default function Mood() {
    /* Mood entry */ 

    const router = useRouter();
    const token = "ce8cc5b939dd44d9cad7089f448887e560d467a2";

    const [moodEntry, setMoodEntry] = useState<"Poor" | "Alright" |"Pretty Good" | "Excellent">("Excellent");
    const [workEntry, setWorkEntry] = useState<"Yes" | "No">("Yes");
    const [socialEntry, setSocialEntry] = useState<"Yes" | "No">("Yes");


    const handleSaveAndContinue = async () => {
        if(!moodEntry || !workEntry || !socialEntry) {
            Alert.alert("Please complete your entry for all questions")
            return;
        }

        const convertMoodToInt = (value: string): number => {
            switch (value) {
                case "Poor":
                    return -1;
                case "Alright":
                    return 0;
                case "Pretty Good":
                    return 1;
                case "Excellent":
                    return 2;
                default:
                    return 0;
            }
        };

        const convertWorkToInt = (value: string): number => {
            switch (value) {
                case "Yes":
                    return +1
                case "No":
                    return 0
                default:
                    return 0;
            }
        };

        const convertSocialToInt = (value: string): number => {
            switch (value) {
                case "Yes":
                    return +1
                case "No":
                    return -1
                default:
                    return 0;
            }
        };

        const moodValue = (convertMoodToInt(moodEntry) + convertWorkToInt(workEntry) + convertSocialToInt(socialEntry))

        const moodEntryData = {
            moodValue,
            timestamp: new Date().toISOString(),
        };

        try 
        {
            const res = await fetch("http://127.0.0.1:8000/api/mood_entries/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(moodEntryData),
            });

            if (!res.ok) {
                const errData = await res.json();
                console.error("Error saving food entry:", errData);
                Alert.alert("Error", "Could not save your mood entry,");
                return;
            }

            Alert.alert("Success", "Your food entry has been saved");
            router.push("/journal_entry");

    } catch(error){
        console.error("Network error", error);
        Alert.alert("Network error", "Could not connect to server.");
    }

    };

    return (

        <>
        <Stack.Screen options={{ title: "Mood" }}/>

        <ScrollView>
        <View>

            <View style={styles.container}>
                <Text style={styles.title}>Mood</Text>

                <Text style={styles.paragraph}>Answer the following questions about your mood and activities today</Text>

                <Text style={styles.label}>How do you feel today?</Text>
                    <Picker 
                        selectedValue={moodEntry}
                        onValueChange={(value) => setMoodEntry(value)}
                        style={styles.picker}
                        dropdownIconColor={"#333"}>

                        <Picker.Item label="Poor" value="Poor"/>
                        <Picker.Item label="Alright" value="Alright"/>
                        <Picker.Item label="Pretty Good" value="Pretty Good"/>
                        <Picker.Item label="Excellent" value="Excellent"/>
                        
                    </Picker>

               
                <Text style={styles.label}>Did you work today? Attending class or lectures counts!</Text>
                    <Picker 
                        selectedValue={workEntry}
                        onValueChange={(value) => setWorkEntry(value)}
                        style={styles.picker}
                        dropdownIconColor={"#333"}>
                        
                        <Picker.Item label="Yes" value="Yes"/>
                        <Picker.Item label="No" value="No"/>

                    </Picker>
                

                
                    <Text style={styles.label}>Did you see or chat with a friend or significant other today?</Text>
                    <Picker 
                            selectedValue={socialEntry}
                            onValueChange={(value) => setSocialEntry(value)}
                            style={styles.picker}
                            dropdownIconColor={"#333"}>

                            <Picker.Item label="Yes" value="Yes"/>
                            <Picker.Item label="No" value="No"/>

                        </Picker> 

                

                <TouchableOpacity style={styles.saveButton} onPress={handleSaveAndContinue}>
                    <Text style={styles.saveButtonText}>Save and Continue to Journal Entry</Text>
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