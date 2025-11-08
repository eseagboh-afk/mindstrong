import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "authToken";

export async function saveToken(token: string) {
    try{
        await SecureStore.setItemAsync(TOKEN_KEY, token);
        console.log("Token saved");

    } catch(err) {
        console.error("Error saving token:", err);
    }
}

export async function getToken(): Promise<string | null> {
    try {
        return await SecureStore.getItemAsync(TOKEN_KEY);

    } catch(err) {
        console.error("Error reading the token:", err);
        return null;
    }
}

export async function deleteToken() {
    try {
        await SecureStore.deleteItemAsync (TOKEN_KEY);
        console.log("Token delete");
    } catch(err) {
        console.error("Error deleting the token:", err);
    }
}