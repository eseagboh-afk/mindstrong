import { Link } from "expo-router";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View
      style={styles.container}>
        {/* Application name container in upper left corner*/}
        <View style={styles.header}>
          <Text style={styles.title}>MindStrong</Text>
        </View>

        {/* Welcome page content in center, redirects to relevant pages*/}
        <View style={styles.main}>
          <Text style={styles.welcome}>Welcome</Text>


        <Link href="/signup" asChild>
        <TouchableOpacity>
          <Text style={styles.link}>Sign Up</Text>
        </TouchableOpacity>
        </Link>

        <Link href="/howitworks" asChild>
        <TouchableOpacity>
          <Text style={styles.link}>How it Works</Text>
        </TouchableOpacity>
        </Link>

         <Link href="/dailylog" asChild>
        <TouchableOpacity>
          <Text style={styles.link}>Testing Daily Log</Text>
        </TouchableOpacity>
        </Link>
        </View>
    </View>
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

  /* Application name container in upper left corner*/

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

  /* Welcome page content in middle of page*/

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

});
