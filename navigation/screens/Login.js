import React from "react";
import { Button, Text, View } from "react-native";
import useAuthStore from "../../stores/useAuthStore";
import Ionicons from "@expo/vector-icons/Ionicons";

const Login = () => {
  const login = useAuthStore((state) => state.login);

  return (
    <View style={styles.container}>
      <Ionicons name={"musical-notes"} size={100} style={styles.icon} />
      <Text>You are not logged in.</Text>
      <Button title="Log in" onPress={login} />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    rowGap: 15,
  },
  icon: {
    left: -3,
  },
};

export default Login;
