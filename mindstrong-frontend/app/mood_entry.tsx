/* Import necessary libraries */

import { useState } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity, ScrollView, Platform} from "react-native";
import { useRouter, Stack } from "expo-router";
import { Picker } from "@react-native-picker/picker";

/* This mood entry page will link to the food entry page */

export default function Mood() {
    /* Mood entry */ 

    const router = useRouter();

    const [moodEntry, setMoodEntry] = useState<"Poor" | "Alright" |"Pretty Goal" | "Excellent">("Excellent");
    const [workEntry, setWorkEntry] = useState<"Yes" | "No">("Yes");
    const [socialEntry, setSocialEntry] = useState<"Yes" | "No">("Yes");

    const moodEntryData = {
        moodEntry, 
        workEntry, 
        socialEntry,
        timestamp: new Date().toISOString(),
    }

    const handleSaveAndContinue = () => {
        if(!moodEntry || !workEntry || !socialEntry) {
            Alert.alert("Please complete your entry for all questions")
            return;
        }
    }

    router.push("/journal_entry");

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