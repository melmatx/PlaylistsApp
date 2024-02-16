import "react-native-polyfill-globals/auto";
import "./globals";

import { RootSiblingParent } from "react-native-root-siblings";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from "./navigation/MainNavigation.js";
import { HeaderButtonsProvider } from "react-navigation-header-buttons";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HeaderButtonsProvider stackType="native">
        <NavigationContainer>
          <RootSiblingParent>
            <MainNavigation />
          </RootSiblingParent>
        </NavigationContainer>
      </HeaderButtonsProvider>
    </GestureHandlerRootView>
  );
};

export default App;
