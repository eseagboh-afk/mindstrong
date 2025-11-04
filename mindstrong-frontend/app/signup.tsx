import { Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Stack } from "expo-router";

/* Sign up page links to homepage*/

export default function SignUp() 
{
    /* User attributes needed at sign up*/ 

    const [pseudonym, setPseudonym] = useState("");
    const [dob, setDob] = useState("");
    const [genderIdentity, setGenderIdentity] = useState("F");
    const [genderAtBirth, setGenderAtBirth] = useState("F");
    const [employmentStatus, setEmploymentStatus] = useState<string[]>([]);
    const [relationshipStatus, setRelationshipStatus] = useState<string[]>([]);
    const [griefStatus, setGriefStatus] = useState<string[]>([]);
    const [relocationStatus, setRelocationStatus] = useState<string[]>([]);

    const toggleEmployment = (option: string) => 
    {
        setEmploymentStatus(prev =>
            prev.includes(option)
                ? prev.filter(item => item !== option)
                : [...prev, option]
        );
    };

    const handleSubmit = () => 
    {
        console.log({ pseudonym, dob, genderIdentity, genderAtBirth, employmentStatus, relationshipStatus, griefStatus, relocationStatus });
    };

return(

    <>
    <Stack.Screen options={{ title: "Sign Up" }}/>
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.main}>
            <Text style={styles.title}>Sign Up</Text>
            <Text style={styles.subtitle}>Create your free account</Text>
        </View>

        {/* Pseudonym */}
        <Text style ={styles.label}>Choose a psuedonym</Text>
        <TextInput 
            style={styles.input}
            placeholder="Enter a pseudonym for privacy"
            value={pseudonym}
            onChangeText={setPseudonym}
        />

        {/* Date of Birth */}
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

        { /* Submit button */ }
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
    </ScrollView>
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
