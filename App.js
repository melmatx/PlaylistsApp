import "react-native-polyfill-globals/auto";
import "./globals";

import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from "./navigation/MainNavigation.js";
import { HeaderButtonsProvider } from "react-navigation-header-buttons";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HeaderButtonsProvider stackType="native">
        <NavigationContainer>
          <MainNavigation />
        </NavigationContainer>
      </HeaderButtonsProvider>
    </GestureHandlerRootView>
  );
};

export default App;
