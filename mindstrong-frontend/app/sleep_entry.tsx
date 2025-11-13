/* Import necessary libraries */

import * as SecureStore from "expo-secure-store";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Link, useRouter, Stack } from "expo-router";
import  API_URL  from "../src/config";


/* This sleep entry page will link to the user profile page */

export default function SleepEntry() {

    /* Sleep entry */

    const router = useRouter();

    const [isPickerVisible, setPickerVisible] = useState(false);
    const [bedTime, setBedTime] = useState("Select Time");
    const [wakeTime, setWakeTime] = useState("Select Time");
    const [activePicker, setActivePicker] = useState<"bed" | "wake" | null>(null);
    const [ampm, setAmPm] = useState("AM");

    const [openWake, setOpenWake] = useState(false);
    const [openBed, setOpenBed] = useState(false);
    const [items, setItems] = useState([
        { label: "AM", value: "AM"},
        { label: "PM", value: "PM"},
    ]);

    const handleConfirm = (selectedTime: Date) => {
        const formattedTime = selectedTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true, 
        });

        if (activePicker === "bed"){
            setBedTime(formattedTime);

        } else if (activePicker === "wake") {
            setWakeTime(formattedTime);
        }
        setPickerVisible(false);
    }

    const [bedAmPm, setBedAmPm] = useState<"AM" | "PM">("PM");
    const [wakeAmPm, setWakeAmPm] = useState<"AM" | "PM">("AM");
    const [totalSleepHours, setTotalSleepHours] = useState<number | null>(null);
    


    /* Helper function to convert the user sleep entry input into 24 hour format */
    
    const convertTo24Hour = (hourStr: string): number | null => {
        const match = hourStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
        if (!match) return null;

        const [, hr, min, periodRaw] = match;
        const hour = Number(hr);
        const minute = Number(min);
        const period = periodRaw.toUpperCase() as "AM" | "PM";

        if (isNaN(hour) || isNaN(minute) || hour < 1 || hour > 12 || minute < 0 || minute > 59) { return null };

        let hour24 = hour % 12;
        if (period === "PM") hour24 += 12;
        const result = hour24 + minute / 60; 

        return result; 
    };

    useEffect(() => {
        if (!bedTime || !wakeTime) {
            setTotalSleepHours(null);
            return;
        }

        const bed = convertTo24Hour(bedTime);
        const wake = convertTo24Hour(wakeTime);
        if (bed === null || wake === null) {
            setTotalSleepHours(null);
            return;
        }

        const sleepDuration = (wake - bed + 24) % 24;
        /* Round to sleep duration to a whole number */ 
        setTotalSleepHours(Math.round(sleepDuration));
    }, [bedTime, wakeTime]);


    const apiFetch = async (url: string, options: RequestInit = {}) => {
        const token = await SecureStore.getItemAsync("authtoken");
        if (!token) {
            Alert.alert("Session expired", "Please log in again.");
            router.push("/sign_in");
            throw new Error("No auth token");
        }

        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`,
            ...options.headers, 
        };

        return fetch(url, {...options, headers });
    };

    const handleSaveAndContinue = async () => {
        if (totalSleepHours === null) {
            Alert.alert("Please enter a bed time and a wake time.")
            return;
        }

        const sleepEntryData = { 
            total_sleep_hours: totalSleepHours, 
            timestamp: new Date().toISOString(),
        };

        try {
            const res = await apiFetch(`${API_URL}/api/sleep_entries/`, {
                method: "POST",
                body: JSON.stringify(sleepEntryData),
            });

            if (!res.ok) {
                const errData = await res.json();
                console.error("Error saving sleep entry:", errData);
                Alert.alert("Error", "Could not save your sleep entry.");
                return;
            }

            Alert.alert("Success", "Your sleep entry has been saved!");
            router.push("/exercise_entry");
        } catch(error) {
            console.error("Network error:", error);
            Alert.alert("Network Error", "Could not connect to server.");
        }
    };


    return (

        <>
        <Stack.Screen options={{ title: "Sleep" }}/>
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Sleep</Text>

                <Text style={styles.paragraph}>Enter the time you went to sleep last night
                and the time you woke up today. We'll calculate your total hours of sleep.
                </Text>

                <Text style={styles.label}>What time did you go to sleep last night?</Text>

                <TouchableOpacity
                    style={styles.timeButton}
                    onPress={() => {
                        setActivePicker("bed");
                        setPickerVisible(true);}}>
                        <Text style={styles.timeText}>{bedTime}</Text>
                </TouchableOpacity>

                <DateTimePickerModal
                    isVisible={isPickerVisible}
                    mode="time"
                    onConfirm={handleConfirm}
                    onCancel={() => setPickerVisible(false)}/> 

                <Text style={styles.label}>What time did you wake up today?</Text>

                <TouchableOpacity
                    style={styles.timeButton}
                    onPress={() => {
                        setActivePicker("wake");
                        setPickerVisible(true);}}>
                        <Text style={styles.timeText}>{wakeTime}</Text>
                </TouchableOpacity>

                <DateTimePickerModal
                    isVisible={isPickerVisible}
                    mode="time"
                    onConfirm={handleConfirm}
                    onCancel={() => setPickerVisible(false)}/>

                    <Text style={styles.resultLabel}>Total Sleep:</Text>
                { totalSleepHours !== null ? (
                    <Text style={styles.resultText}>{totalSleepHours} hours</Text>
                ) : (
                    <Text style={styles.resultText}>-- hours</Text>
                )}

                
                    <TouchableOpacity style={styles.saveButton} onPress={handleSaveAndContinue}>
                        <Text style={styles.saveButtonText}>Save and Continue to Exercise</Text>
                    </TouchableOpacity>
                

                </View>
            </ScrollView>
            </>
    );

}

/* Format content on page */ 

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
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20, 
    },

    input: {
        borderWidth: 1, 
        borderColor: "#ccc",
        borderRadius: 8, 
        paddingHorizontal: 10, 
        paddingVertical: 8, 
        width: 100, 
        fontSize: 16, 
        marginRight: 10, 
    },

    pickerContainer: {
        width: 100, 
        borderWidth: 1, 
        borderColor: "#ccc",
        borderRadius: 6,
        height: 50, 
        justifyContent: "center",
        alignItems: "center", 
        marginTop: 8, 
    },

    picker: {
        height: 50, 
        width: "100%", 
    },

    resultLabel: {
        marginTop: 20,
        fontSize: 20, 
        fontWeight: "400",
    },
    
    resultText: {
        fontSize: 18, 
        fontWeight: "600",
        marginTop: 10, 
    },

    timeButton: {
        backgroundColor: "#191b1eff",
        paddingVertical: 14, 
        paddingHorizontal: 25, 
        borderRadius: 12, 
        marginBottom: 20, 
    },

    timeText: {
        color: "#fff",
        fontSize: 18, 
    },

    dropdownWrapper: {
        zIndex: 1000, 
        width: 100, 
    },

    dropdown: {
        borderColor: "#ccc",
        borderRadius: 10, 
    },

    dropdownContainer: {
        borderColor: "#ccc",

    },

    saveButton: {
        backgroundColor: "#474444ff",
        paddingVertical: 14, 
        paddingHorizontal: 25, 
        borderRadius: 12, 
        alignItems: "center",
        marginTop: 20
    },

    saveButtonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});