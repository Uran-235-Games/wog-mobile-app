export type ScreenProps = {
  changeScreen: (name: "Home" | "Auth" | "Account" | "Games") => void;
};