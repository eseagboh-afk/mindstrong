import { Link } from "expo-router";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Stack } from "expo-router";

export default function RegisteredUserWelome() {
  return (

  <>
    <Stack.Screen options={{ title: "Welcome" }}/>

    <View
      style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>MindStrong</Text>
        </View>

        <View style={styles.main}>
          <Text style={styles.welcome}>Welcome</Text>

         <Text style={styles.paragraph}>
            Click Daily Log to begin filling out your daily log. Click Analysis to see your
            mental health analysis every 21 days. Click Profile to view and edit your profile.
        </Text>

        <Link href="/sleep_entry" asChild>
        <TouchableOpacity>
            <Text style={styles.link}>Daily Log</Text>
        </TouchableOpacity>
        </Link>

        <Link href="/analysis" asChild>
        <TouchableOpacity>
            <Text style={styles.link}>Analysis</Text>
        </TouchableOpacity>
        </Link>

        <Link href="/user_profile" asChild>
        <TouchableOpacity>
            <Text style={styles.link}>View Profile</Text>
        </TouchableOpacity>
        </Link>

        </View>
    </View>
  </>
  
  );
}

/* formatting for Application name and center page content containers */

const styles= StyleSheet.create({
  container: 
  {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingTop: 40, 
  },

  header: 
  {
    alignItems: "flex-start", 
    marginBottom: 60, 
  },

  title: 
  {
    fontSize: 20, 
    fontWeight: "600",

  },

  main: 
  {
    flex: 1, 
    alignItems: "center",
  },

  welcome: 
  {
    fontSize: 36, 
    fontWeight: "700",
    marginBottom: 40, 
    marginTop: 150,
  },

  link: 
  {
    fontSize: 18, 
    textDecorationLine: "underline",
    color: "#000",
    marginBottom: 20, 
  },

  paragraph: {
        fontSize: 16, 
        lineHeight: 22, 
        color: "#333",
        marginBottom: 16, 
    },

});
