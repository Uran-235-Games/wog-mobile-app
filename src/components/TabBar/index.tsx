import { ScreenProps } from "@/src/types/screen";
import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

type TabBarProps = {
  isDisable?: boolean;
  changeScreen: ScreenProps["changeScreen"];
};

export default function TabBar({ isDisable = false, changeScreen }: TabBarProps) {
  if (isDisable) return null;

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
        backgroundColor: "#303030ff",
      }}
    >
      <Button mode="text" onPress={() => changeScreen("Home")}>Головна</Button>
      <Button mode="text" onPress={() => changeScreen("Games")}>Ігри</Button>
      <Button mode="text" onPress={() => changeScreen("Account")}>Аккаунт</Button>
    </View>
  );
}
