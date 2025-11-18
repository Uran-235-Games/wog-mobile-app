import { showToast } from "@/src/components/Toast";
import { USER_SERVICE_HOST } from "@/src/config/constants";
import { ScreenProps } from "@/src/types/screen";
import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    View,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import { Button, Text, TextInput, ActivityIndicator } from "react-native-paper";

export default function AuthScreen({ changeScreen }: ScreenProps) {
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
            if (authMode == "signUp") {
                showToast("Ви успішно зареєструвались, теперь увійдіть до аккаунту");
            } else {
                showToast("Ви війшли в аккаунт");
                changeScreen("Home");
            }
        } catch (err) {
            setMessage("Помилка з'єднання з сервером\nдетальніше: " + err);
        } finally {
            setIsFetching(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Text variant="titleMedium" style={styles.title}>
                        {authMode === "signUp"
                            ? "Зареєструйте новий аккаунт"
                            : "Увійдіть до вашого аккаунту"}
                    </Text>

                    <View style={styles.inputContainer}>
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
                        <Text variant="bodyMedium" style={styles.message}>
                            {message}
                        </Text>
                    )}
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e5e5e5ff",
    },
    scrollContent: {
        flexGrow: 1,
        padding: 20,
        gap: 15,
        // justifyContent: "center",
    },
    title: {
        textAlign: 'center',
        marginBottom: 10,
    },
    inputContainer: {
        gap: 10,
    },
    message: {
        marginTop: 10,
        textAlign: 'center',
    },
});