import React from "react";
import { View } from "react-native";
import { Text, Button } from "react-native-paper";

type ErrorScreenProps = {
  message?: string;
  onRetry?: () => void;
  buttonText?: string;
};

export default function ErrorScreen({ message = "Сталася помилка", onRetry, buttonText="Спробувати ще раз" }: ErrorScreenProps) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text variant="titleMedium" style={{ marginBottom: 10 }}>
        {message}
      </Text>
      {onRetry && (
        <Button mode="contained" onPress={onRetry}>
          {buttonText}
        </Button>
      )}
    </View>
  );
}
