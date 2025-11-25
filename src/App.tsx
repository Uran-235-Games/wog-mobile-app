import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { ActivityIndicator, PaperProvider, Text } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';
import TabBar from './components/TabBar';
import AccountScreen from './screens/AccountScreen';
import GamesScreen from './screens/GamesScreen';
import Toast from './components/Toast';
import { useUserStore } from './hooks/useUserStore';


const ScreenLayout = ({ children }: { children: React.ReactNode }) => (
  <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.keyboardAvoidingView}
  >
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContent}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.touchableWrapper}>{children}</View>
      </TouchableWithoutFeedback>
    </ScrollView>
  </KeyboardAvoidingView>
);


export default function App() {
  const [currentScreen, setCurrentScreen] =
    useState<keyof typeof screens>("Auth");

  const user = useUserStore(state => state.user);
  const loading = useUserStore(state => state.loading);
  const logout = useUserStore(state => state.logout);

  const ChangeScreen = (screen: keyof typeof screens) => {
    setCurrentScreen(screen);
  };

  // Автопереключение на экран Auth если юзер не авторизован
  useEffect(() => {
    if (!loading && (!user || !user.auth)) {
      ChangeScreen("Auth");
    }
  }, [loading]);

  const screens = {
    Home: <HomeScreen />,
    Auth: <AuthScreen changeScreen={ChangeScreen} />,
    Account: (
      <AccountScreen
        ChangeScreen={ChangeScreen}
        user={user?.user}
        onDelete={() => {}}
        onLogout={logout}
      />
    ),
    Games: <GamesScreen />,
  } as const;


  return (
    <SafeAreaProvider>
      <PaperProvider>
        <View style={styles.container}>
          <StatusBar style="dark" />

          <View style={styles.header}>
            <Text variant="bodyMedium">Header</Text>
          </View>

          <View style={styles.contentArea}>
            {loading ? (
              <View style={styles.loaderContainer}>
                <ActivityIndicator animating={true} />
                <Text style={{ marginTop: 10 }}>
                  Завантаження данних...
                </Text>
              </View>
            ) : (
              <ScreenLayout>{screens[currentScreen]}</ScreenLayout>
            )}
          </View>

          <Toast />

          {user?.auth && (
            <TabBar
              changeScreen={ChangeScreen}
              isDisable={false}
            />
          )}
        </View>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  header: {
    width: "100%",
    padding: 10,
    backgroundColor: "#3f3f3fff",
  },
  contentArea: {
    flex: 1,
    backgroundColor: "#e5e5e5ff",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardAvoidingView: { flex: 1 },
  scrollView: { flex: 1 },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  touchableWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
});
