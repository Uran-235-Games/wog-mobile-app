import { useUserStore } from "@/src/hooks/useUserStore";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Avatar } from "react-native-paper";

type TopBarProps = {
  onLoginPress?: () => void;
};

export default function TopBar({ onLoginPress }: TopBarProps) {
  const user = useUserStore(state => state.user);

  return (
    <View style={styles.container}>
      {user?.user ? (
        <Avatar.Text size={40} label={user.user.name[0].toUpperCase()} />
      ) : (
        <Button mode="contained" onPress={onLoginPress}>
          Увіти
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    backgroundColor: "#3f3f3f",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
