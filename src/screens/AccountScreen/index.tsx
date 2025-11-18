import ErrorScreen from "@/src/components/Error";
import { UserData } from "@/src/hooks/account";
import { ScreenProps } from "@/src/types/screen";
import React from "react";
import { View } from "react-native";
import { Text, Button, Card } from "react-native-paper";

type AccountScreenProps = {
  user: UserData["user"];
  onLogout: () => void;
  onDelete: () => void;
  ChangeScreen: ScreenProps["changeScreen"];
};

export default function AccountScreen({ ChangeScreen, user, onLogout, onDelete }: AccountScreenProps) {
    if (!user) return (
        <ErrorScreen message="Помилка завантаження даних аккаунту"
            onRetry={()=>{onLogout(); ChangeScreen("Auth")}}
            buttonText="Увійти в аккаунт"
        />
    );

    return (
        <View style={{ flex: 1, padding: 20, justifyContent: "center", gap: 20 }}>
            <Card>
                <Card.Content>
                <Text variant="titleLarge">Профіль</Text>
                <Text>Ім’я: {user.name}</Text>
                <Text>Email: {user.email}</Text>
                {/* <Text>ID: {user.id}</Text> */}
                </Card.Content>
            </Card>

            <Button mode="contained" onPress={onLogout}>
                Вийти з аккаунта
            </Button>

            <Button mode="contained-tonal" textColor="red" onPress={onDelete}>
                Видалити аккаунт
            </Button>
        </View>
    );
}
