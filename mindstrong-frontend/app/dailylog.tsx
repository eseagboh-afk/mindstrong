import { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker"; 

/* Import necessary libraries */

/* This daily log page will link to the user profile page */

export default function DailyLog() {

    /* Sleep entry */

    const [bedTime, setBedTime] = useState<string>("");
    const [bedAmPm, setBedAmPm] = useState<"AM" | "PM">("PM");
    const [wakeTime, setWakeTime] = useState<string>("");
    const [wakeAmPm, setWakeAmPm] = useState<"AM" | "PM">("AM");
    const [totalSleepHours, setTotalSleepHours] = useState<number | null>(null);

    /* Helper function to convert the user sleep entry input into 24 hour format */
    
    const convertTo24Hour = (hourStr: string, period: "AM" | "PM"): number | null => {
        const hour = Number(hourStr);
        if (isNaN(hour) || hour < 1 || hour > 12) return null;
        let hour24 = hour % 12;
        if (period === "PM") hour24 += 12;
        return hour24; 
    };

    useEffect(() => {
        if (!bedTime || !wakeTime) {
            setTotalSleepHours(null);
            return;
        }

        const bed = convertTo24Hour(bedTime, bedAmPm);
        const wake = convertTo24Hour(wakeTime, wakeAmPm);
        if (bed === null || wake === null) {
            setTotalSleepHours(null);
            return;
        }

        const sleepDuration = (wake - bed + 24) % 24;
        /* Round to sleep duration to a whole number */ 
        setTotalSleepHours(Math.round(sleepDuration));
    }, [bedTime, bedAmPm, wakeTime, wakeAmPm]);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Bed Time:</Text>
            <View style={styles.row}>
                <TextInput
                    placeholder="Hour (1-12"
                    keyboardType="numeric"
                    value={bedTime}
                    onChangeText={setBedTime}
                    style={styles.input}/>
                
                <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={bedAmPm}
                    style={styles.picker}
                    onValueChange={(value) => setBedAmPm(value)}
                    dropdownIconColor={"#333"}>
                    
                    <Picker.Item label="AM" value="AM" />
                    <Picker.Item label="PM" value="PM" />

                </Picker>
            </View>
        </View>

            <Text style={styles.label}>Wake Time:</Text>
            <View style={styles.row}>
                <TextInput
                    placeholder="Hour (1-12)"
                    keyboardType="numeric"
                    value={wakeTime}
                    onChangeText={setWakeTime}
                    style={{ borderWidth: 1, padding: 5, width: 80, marginRight: 10 }}></TextInput>

                <View style={styles.pickerWrapper}>
                <Picker 
                    selectedValue={wakeAmPm}
                    style={styles.picker}
                    onValueChange={(value) => setWakeAmPm(value)}>

                    <Picker.Item label="AM" value="AM"/>
                 <Picker.Item label="PM" value="PM"/>    
                </Picker>
            </View>
        </View>

            {totalSleepHours !== null && (
                <Text style={styles.resultText}>Total Sleep: {totalSleepHours} hours</Text>
            )}
        </View>
    );

}

/* Format content on page */ 

const styles = StyleSheet.create({
    container: {
        padding: 20, 
    },

    label: {
        fontSize: 16, 
        marginBottom: 6, 
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

    pickerWrapper: {
        borderWidth: 1, 
        borderColor: "#ccc",
        borderRadius: 8, 
        overflow: "hidden",

    },

    pickerContainer: {
        width: 100, 
        borderWidth: 1, 
        borderColor: "#ccc",
        borderRadius: 6, 
    },

    picker: {
        height: 42, 
        width: 100, 
        transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }]
    },
    
    resultText: {
        fontSize: 18, 
        fontWeight: "600",
        marginTop: 10, 
    },
});