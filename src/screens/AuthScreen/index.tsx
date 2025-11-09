import { USER_SERVICE_HOST } from "@/src/config/constants";
import React, { useState } from "react";
import { View } from "react-native";
import { Button, Text, TextInput, ActivityIndicator } from "react-native-paper";

export default function AuthScreen() {
    const [isFetching, setIsFetching] = useState(false);
    const [authMode, setAuthMode] = useState<"signUp" | "signIn">("signUp");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("pon3@gmail.cum");
    const [password, setPassword] = useState("poponpon");
    const [message, setMessage] = useState("");

    const handleSubmit = async () => {
        setMessage("");
        setIsFetching(true);

        try {
            const url =
                authMode === "signUp"
                ? `${USER_SERVICE_HOST}/api/v1/auth/sign-up`
                : `${USER_SERVICE_HOST}/api/v1/auth/sign-in`;

            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();
            setMessage(JSON.stringify(data));
        } catch (err) {
            setMessage("Помилка з'єднання з сервером\nдетальніше: "+err);
        } finally {
            setIsFetching(false);
        }
    };

    return (
        <View style={{ padding: 20, gap: 10 }}>
        <Text variant="titleMedium">
            {authMode === "signUp"
            ? "Зареєструйте новий аккаунт"
            : "Увійдіть до вашого аккаунту"}
        </Text>

        <View style={{ gap: 10 }}>
            <TextInput label="Email" value={email} onChangeText={setEmail} />

            {authMode === "signUp" && (
            <TextInput label="Name" value={name} onChangeText={setName} />
            )}

            <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            right={<TextInput.Icon icon="eye" />}
            />
        </View>

        {isFetching && <ActivityIndicator animating size="small" />}

        <Button mode="contained" onPress={handleSubmit} disabled={isFetching}>
            {authMode === "signUp" ? "Зареєструватись" : "Увійти"}
        </Button>

        <Button
            onPress={() =>
            setAuthMode(authMode === "signUp" ? "signIn" : "signUp")
            }
        >
            {authMode === "signUp"
            ? "Я вже маю аккаунт, увійти"
            : "У мене ще немає аккаунта, зареєструватись"}
        </Button>

        {message !== "" && (
            <Text variant="bodyMedium" style={{ marginTop: 10 }}>
            {message}
            </Text>
        )}
        </View>
    );
}
