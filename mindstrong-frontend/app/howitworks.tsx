import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Link, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

/* How it works page will link to homepage */

export default function HowItWorks ()
{
    /* Description of how the application works */ 
return (

    <>
    <Stack.Screen options={{ title: "How It Works" }}/>
    <SafeAreaView style={styles.screen}>
        <ScrollView contentContainerStyle={[styles.container, { flexGrow: 1, paddingBottom: 100}]}>
            <Text style={styles.header}>How it Works</Text>

                <Text style={styles.paragraph}>
                    MindStrong allows you to track your daily habits in order to see how your lifestyle impacts your mood.
                    At MindStrong, our goal is to help you take control of your mental health in a simple and objective way.
                </Text>

                <Text style={styles.paragraph}>Here's how it works:</Text>

                <Text style={styles.paragraph}>1. Log your sleep, exercise, food, and current mood for 21 consecutive days</Text>
                <Text style={styles.paragraph}>2. After 21 days, you'll receive an analysis that shows you how your lifestyle correlates with your mood</Text>
                <Text style={styles.paragraph}>3. Continue logging consistently and you'll receive analyses every 21 days</Text>

                <Text style={styles.paragraph}>
                    That's it! We encourage you to be honest and consistent.</Text>
                <Text style={styles.paragraph}>
                    Be gentle with yourself, but make sure to provide accurate information. The accuracy of the information you provide determines
                    the accuracy of your analysis.
                </Text>
         <Link href="/signup" asChild>
            <TouchableOpacity style={styles.signupButton}>
                <Text style={styles.signupButtonText}>Continue to Sign Up</Text>
            </TouchableOpacity>
        </Link>

        </ScrollView>
    </SafeAreaView>
    </>
);
}

const styles = StyleSheet.create(
{

    signupButton: {
        marginTop: 20, 
        backgroundColor: "#474444ff",
        paddingVertical: 10, 
        paddingHorizontal: 10, 
        borderRadius: 8, 
        alignItems: "center",
    },

    signupButtonText: {
        color: "#fff",
        fontSize: 18, 
        fontWeight: "600",
    },

    screen: {
        flex: 1, 
        backgroundColor: "#fff",
    },

    container: {
        paddingHorizontal: 24, 
        paddingVertical: 40, 
    },

    header: {
        fontSize: 30, 
        fontWeight: "700",
        marginBottom: 24,
        marginTop: -45, 
        textAlign: "center",
    },

    paragraph: {
        fontSize: 16, 
        lineHeight: 22, 
        color: "#333",
        marginBottom: 16, 
    },

    content: {
        flex: 1, 
        justifyContent: "flex-start",
    },
});
