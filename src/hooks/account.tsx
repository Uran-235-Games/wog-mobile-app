import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showToast } from "../components/Toast";

export type UserData = {
    auth: boolean,

    user: undefined | {
        name: string,
        email: string,
        token: string
    }
}

export function useAccount() {
    const [user, setUser] = useState<UserData | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
        try {
            const data = await AsyncStorage.getItem("userData");
            if (data) setUser(JSON.parse(data));
        } catch (err) {
            showToast("Error loading user data: " + err);

        } finally {
            setLoading(false);
        }
        })();
    }, []);

    const saveUser = async (data: UserData) => {
        try {
            await AsyncStorage.setItem("userData", JSON.stringify(data));
            setUser(data);
        } catch (err) {
            console.error("Error saving user:", err);
        }
    };

    const logout = async () => {
        await AsyncStorage.removeItem("userData");
        setUser(undefined);
    };

    return { user, loading, saveUser, logout };
}

type UseAccount = ReturnType<typeof useAccount>;
export type SaveUserFn = UseAccount["saveUser"];