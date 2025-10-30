import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";

/* Daily log page links to dailyLogSaved page */

export default function DailyLog (){

    /* Sleep attributes needed for daily log */

    const [sleepTime, setBedTime] = useState<string>("");
    const [wakeTime, setWakeTime] = useState<string>("");
    const [totalSleepHours, setTotalSleepHours] = useState<number | null>(null);

    /* Calculate the sleep duration based on the user inputted sleep and wake time */

   /* Change user input into a form that can be calculated to find the total sleep time */

   function parseTimeToDecimalHours(input: string): number | null {
    if (!input) return null;
    const s = input.trim().toLowerCase();

    const timeOfDayMatch = s.match(/(am|pm)\b/);

    if (s.includes(":")) {
        const parts = s.split(/[:\s]/).filter(Boolean);
        if (parts.length < 2) return null;
        const hours = Number(parts[0]);
        const mins = Number(parts[1]);
        if (Number.isNaN(hours) || Number.isNaN(mins) || mins < 0 || mins >= 60) return null;

        let hour24 = hours; 
        if (timeOfDayMatch) {
            const timeOfDay = timeOfDayMatch[1];
            if (timeOfDay === "am")
            {
                if (hour24 === 12) hour24 = 0;
            } else {
                if (hour24 !== 12) hour24 = (hour24 % 12) + 12;
            }
        }

        if (!timeOfDayMatch && (hours < 0 || hours > 23)) return null;

        return hour24 + mins / 60;
    }

    if (timeOfDayMatch) {
        const timeOfDay = timeOfDayMatch[1];
        const numPart = s.replace(/(am|pm)\b/, "").trim();
        const hours = Number(numPart);
        if (Number.isNaN(hours) || hours < 1 || hours > 12) return null;
        let hour24 = hours % 12;
        if (timeOfDay === "pm") hour24 += 12;
    }
   }
}