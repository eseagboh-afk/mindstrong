import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { Text, View, StyleSheet, Alert, TextInput, Button, } from "react-native";
import * as SecureStore from "expo-secure-store";
import API_URL from "@/src/config";



export default function UserProfile() {

    const [pseudonym, setPseudonym] = useState("");
    const [genderIdentity, setGenderIdentity] = useState("");
    const [relationshipStatus, setRelationshipStatus] = useState("");
    const [employmentStatus, setEmploymentStatus] = useState("");
    const API_BASE = `${API_URL}/api/profile/`;

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = await SecureStore.getItemAsync("userToken");
                if (!token) throw new Error("No token found");
                
            const res = await fetch(API_BASE, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${token}`,

            },
        });

        if (!res.ok) throw new Error(`Error ${res.status}`);

        const data = await res.json();

        setPseudonym(data.pseudonym || "");
        setGenderIdentity(data.gender_identity || "");
        setRelationshipStatus(data.relationship_status || "");
        setEmploymentStatus(data.employment_status || "");
        setLoading(false);
        } catch (err) {
            console.error("Error fetching profile:", err);
            Alert.alert("Error", "Unable to load profile data.");
            setLoading(false);
        }
    };

        fetchProfile();
    }, []);
    
    const handleSave = () => {
        fetch(`${API_BASE}/api/token-auth/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",

            },

            body: JSON.stringify({
                pseudonym,
                gender_identity: genderIdentity,
                relationship_status: relationshipStatus,
                employment_status: employmentStatus, 
            }),
        })

        .then((res) => {
            if (res.ok){
                Alert.alert("Success", "Profile updated successfully!");
            } else {
                Alert.alert("Error", "Something went wrong updating your profile.");
            }
        })

        .catch((err) => {
            console.error("Error updating profile:", err);
            Alert.alert("Error", "Unable to update profile.");
        });
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <Text>Loading profile...</Text>
            </View>
        );
    }

    return (

        <>
            <Stack.Screen options={{ title: "Profile" }}/>

            <View style={styles.container}>
                <Text style={styles.heading}>My Profile</Text>

                <Text style={styles.label}>Pseudonym</Text>
                <TextInput
                    style={styles.input}
                    value={pseudonym}
                    onChangeText={setPseudonym}
                />
            
                <Text style={styles.label}>Gender Identity</Text>
                <TextInput
                    style={styles.input}
                    value={genderIdentity}
                    onChangeText={setGenderIdentity}
                />

                <Text style={styles.label}>Employment Status</Text>
                <TextInput
                    style={styles.input}
                    value={employmentStatus}
                    onChangeText={setEmploymentStatus}
                />

                <Button title="Save Changes" onPress={handleSave} />
            </View>
        </>

    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        padding: 20, 
        backgroundColor: "#fff",
    },

    heading: {
        fontSize: 24, 
        fontWeight: "bold",
        marginBottom: 20, 
    },

    label: {
        fontSize: 16, 
        marginTop: 12, 
    },

    input: {
        borderWidth: 1, 
        borderColor: "#ccc",
        borderRadius: 8, 
        padding: 10, 
        marginTop: 5, 
    },

    center: {
        flex: 1, 
        justifyContent: "center",
        alignItems: "center",
    },
});