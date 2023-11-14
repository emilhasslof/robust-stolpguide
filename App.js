import { StatusBar } from "expo-status-bar";
import { Button, Dimensions, StyleSheet, Text, View } from "react-native";
import * as Svg from "react-native-svg";
import Logo from "./assets/Logo.svg";

export default function App() {
  return (
    <View style={styles.container}>
      <Logo width={"100%"} />
      <StatusBar style="auto" />
      <ToggleMode />
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}

function ToggleMode() {
  return (
    <View style={styles.ToggleMode}>
      <Button
        style={styles.toggleButton}
        title="Sök"
        onPress={() => {
          //Go to search mode
        }}
      />
      <Button
        style={styles.toggleButton}
        title="Översätt"
        onPress={() => {
          //Go to translate mode
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 32,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "top",
  },
  ToggleMode: {
    flexDirection: "row",
    alignItems: "center",
    width: Dimensions.get("window").width,
    height: "8%",
    backgroundColor: "grey",
  },
  toggleButton: {
    width: "50%",
    height: "100%",
    backgroundColor: "red",
    cornerRadius: 5,
  },
});
