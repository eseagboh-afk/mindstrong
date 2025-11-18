import * as SecureStore from "expo-secure-store";
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

/* Sign up page links to homepage*/

export default function SignUp() 
{
    /* User attributes needed at sign up*/ 

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [pseudonym, setPseudonym] = useState("");
    const [dob, setDob] = useState("");
    const [genderIdentity, setGenderIdentity] = useState("F");
    const [genderAtBirth, setGenderAtBirth] = useState("F");
    const [employmentStatus, setEmploymentStatus] = useState<string[]>([]);
    const [relationshipStatus, setRelationshipStatus] = useState<string[]>([]);
    const [griefStatus, setGriefStatus] = useState<string[]>([]);
    const [relocationStatus, setRelocationStatus] = useState<string[]>([]);
    const [userConsent, setUserConsent] = useState("Yes");
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();


    const toggleEmployment = (option: string) => {
        setEmploymentStatus(prev =>
            prev.includes(option)
                ? prev.filter(item => item !== option)
                : [...prev, option]
        );
    };

    const handleSignup = async () => {

        if (!userConsent || userConsent == "No"){
            Alert.alert("You'll need to agree to storage and analysis of your information")
            return;
        }

        const signupData = {
            username, 
            email, 
            password,
            dob, genderIdentity, genderAtBirth, /*employmentStatus,*/
            relationshipStatus, griefStatus, relocationStatus
        };


        try {
            const response = await fetch ('http://127.0.0.1:8000/api/signup/', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(signupData),
                });

            const data = await response.json();
            console.log("Response:", data);

            if (response.ok) {
                await SecureStore.setItemAsync("authtoken", data.token);
                Alert.alert("Success", "Account created!");
            } else {
                Alert.alert("Signup failed", JSON.stringify(data));
                }
            } catch (err) {
                Alert.alert("Network error");
            }
            router.push("/post_sign_up");
              
    }; 


return(

    <>
    <Stack.Screen options={{ title: "Sign Up" }}/>
    <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.main}>
                <Text style={styles.title}>Sign Up</Text>
                <Text style={styles.subtitle}>Create your free account</Text>
            </View>

            <Text style={styles.label}>What's your email?</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
            />

            <Text style={styles.label}>Choose a password</Text>
            <TextInput
                style={styles.input}
                placeholder="Choose a password"
                value={password}
                onChangeText={setPassword}
            />

        {/* Username */}
            <Text style={styles.label}>Choose a username</Text>
            <TextInput 
                style={styles.input}
                placeholder="Choose a username"
                value={username}
                onChangeText={setUsername}
            />

        {/* Pseudonym */}
            <Text style ={styles.label}>Choose a pseudonym</Text>
            <TextInput 
                style={styles.input}
                placeholder="Enter a pseudonym for privacy"
                value={pseudonym}
                onChangeText={setPseudonym}
            />

        {/*Date of Birth */}
            <Text style={styles.label}>When were you born?</Text>
            <TextInput
                style={styles.input}
                placeholder="dd/mm/yyyy"
                value={dob}
                onChangeText={setDob}
            />

        {/* Gender Identity */}
            <Text style={styles.label}>What's your gender identity?</Text>
            <Picker
                selectedValue={genderIdentity}
                onValueChange={(itemValue) => setGenderIdentity(itemValue)}
                style={styles.picker}>
        
                <Picker.Item label="Female" value="F"/>
                <Picker.Item label="Male" value="M"/>
                <Picker.Item label="Non-binary" value="NB"/>
            </Picker>

        {/* Gender at Birth */}
            <Text style={styles.label}>What was your gender at birth?</Text>
            <Picker
                selectedValue={genderAtBirth}
                onValueChange={(itemValue) => setGenderAtBirth(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Female" value="F"/>
                <Picker.Item label="Male" value="M"/>
            </Picker>

        {/* Employment Status */}
            <Text style={styles.label}>What's your employment status - you can select multiple!</Text>
            <View style={styles.multiSelect}>
                {[ "Full-Time", "Part-Time", "Student", "Unemployed"].map(option => (
                    <TouchableOpacity
                        key={option}
                        style={[
                            styles.multiButton,
                            employmentStatus.includes(option) && styles.multiButtonSelected,
                        ]}
                        onPress={() => toggleEmployment(option)}
                    >
                        <Text>{ option }</Text>
                    </TouchableOpacity>
                ))}
            </View>

        {/* Relationship staus */}
            <Text style={styles.label}>What is your relationship status?</Text>
            <Picker
                selectedValue={relationshipStatus}
                onValueChange={(itemValue) => setRelationshipStatus(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Single" value="Single"/>
                <Picker.Item label="In a relationship" value="In a relationship"/>
                <Picker.Item label="It's complicated" value="It's complicated"/>
            </Picker>
        
        {/* Grief Status */ }
            <Text style={styles.label}>Have you recently suffered the loss of a friend or family member in death?</Text>
            <Picker
                selectedValue={griefStatus}
                onValueChange={(itemValue) => setGriefStatus(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Yes" value="Yes"/>
                <Picker.Item label="No" value="No"/>
                <Picker.Item label="Prefer not to say" value="Prefer not to say"/>
            </Picker>

        { /* Relocation Status */ }
            <Text style={styles.label}>Have you recently moved to a new area?</Text>
            <Picker
                selectedValue={relocationStatus}
                onValueChange={(itemValue) => setRelocationStatus(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Yes" value="Yes"/>
                <Picker.Item label="No" value="No"/>
                <Picker.Item label="Prefer not to say" value="Prefer not to say"/>
            </Picker> 

            <Text style={styles.label}>Do you consent to storage and analysis of user information?</Text>
            <Text style={styles.paragraph}>We only store what is absolutely necessary to create your mental health analysis.
                <strong> We do not share any data to 3rd parties. Ever.</strong>
            </Text>

            <Picker 
                selectedValue={userConsent}
                onValueChange={(itemValue) => setUserConsent(itemValue)}
                style={styles.picker}>
            
                <Picker.Item label="Yes" value="Yes"/>
                <Picker.Item label="No" value="No"/>

            </Picker>


        {/* Submit button*/}  
            <TouchableOpacity style={styles.submitButton} onPress={handleSignup}>
                <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
        </ScrollView>
    </SafeAreaView>
    </>

    
    );
}

    /* Format sign up page content */

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 24, marginBottom: 24 },
    main: { flex: 1, justifyContent: "center", alignItems: "center"},
    title: { fontSize: 32, fontWeight: "700"},
    subtitle: { fontSize: 18, color: "#555", marginTop: 20},
    label: {fontSize: 16, marginTop: 12, marginBottom: 4 },
    paragraph: { fontSize: 14, marginTop: 12, marginBottom: 4},
    input: 
    {
        borderWidth: 1, 
        borderColor: "#ccc",
        borderRadius: 8, 
        padding: 12, 
    },

    picker: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, marginBottom: 2 },
    multiSelect: { flexDirection: "row", flexWrap: "wrap", marginTop: 2 },
    multiButton: 
    {
        padding: 10, 
        borderWidth: 1, 
        borderColor: "#000",
        borderRadius: 8,
        marginRight: 8, 
        marginBottom: 8, 
    },

    multiButtonSelected: { backgroundColor: "#ddd" },
    submitButton: 
    {
        backgroundColor: "#000",
        padding: 14, 
        borderRadius: 12, 
        marginTop: 24, 
    },

    submitText: { color: "#fff", textAlign: "center", fontSize: 18, fontWeight: "600" },
});
