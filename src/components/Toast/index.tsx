import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Snackbar } from "react-native-paper";

let showToastExternal: (text: string, duration?: number) => void;

export default function Toast() {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [duration, setDuration] = useState(3000);

  const show = useCallback((text: string, duration = 3000) => {
    setMessage(text);
    setDuration(duration);
    setVisible(true);
  }, []);

  useEffect(() => {
    showToastExternal = show;
  }, [show]);

  const onDismiss = () => setVisible(false);

  return (
    <View style={[styles.container, { bottom: 60 }]}>
      <Snackbar
        visible={visible}
        onDismiss={onDismiss}
        duration={duration}
        action={{
          label: 'Скрыть',
          onPress: onDismiss,
        }}
      >
        {message}
      </Snackbar>
    </View>
  );
}

export const showToast = (text: string, duration?: number) => {
  if (showToastExternal) {
    showToastExternal(text, duration);
  } else {
    console.warn("Toast component is not mounted yet.");
  }
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 8,
    right: 8,
    zIndex: 1000, 
  },
});