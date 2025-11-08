import { Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Link, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PostSignUp ()
{ 
return (

    <>
    <Stack.Screen options={{ title: "Sign Up Successful" }}/>
    <SafeAreaView style={styles.screen}>
        <ScrollView contentContainerStyle={[styles.container, { flexGrow: 1, paddingBottom: 100}]}>
            <Text style={styles.header}>Sign Up Successful</Text>

                <Text style={styles.paragraph}>
                    MindStrong allows you to track your daily habits in order to see how your lifestyle impacts your mood.
                    At MindStrong, our goal is to help you take control of your mental health in a simple and objective way.
                </Text>

         <Link href="/user_profile" asChild>
            <TouchableOpacity style={styles.continueButton}>
                <Text style={styles.continueButtonText}>Continue to your profile</Text>
            </TouchableOpacity>
        </Link>

        </ScrollView>
    </SafeAreaView>
    </>
);
}

const styles = StyleSheet.create(
{

    continueButton: {
        marginTop: 20, 
        backgroundColor: "#474444ff",
        paddingVertical: 10, 
        paddingHorizontal: 10, 
        borderRadius: 8, 
        alignItems: "center",
    },

    continueButtonText: {
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
