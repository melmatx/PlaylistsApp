import "./globals";

import { RootSiblingParent } from "react-native-root-siblings";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from "./navigation/MainNavigation.js";
import { HeaderButtonsProvider } from "react-navigation-header-buttons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import useAuthStore from "./stores/useAuthStore.js";
import * as SplashScreen from "expo-splash-screen";
import * as Linking from "expo-linking";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow.js";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const { isReady, fetchKeyAndIdentity, setIdentity } = useAuthStore(
    useShallow((state) => ({
      isReady: state.isReady,
      fetchKeyAndIdentity: state.fetchKeyAndIdentity,
      setIdentity: state.setIdentity,
    }))
  );
  const url = Linking.useURL();

  useEffect(() => {
    if (url) {
      const { queryParams } = Linking.parse(url);
      const delegation = queryParams.delegation;

      if (delegation) {
        setIdentity(delegation);
        console.log("Done setting identity");
      }
    }
  }, [url]);

  useEffect(() => {
    fetchKeyAndIdentity();
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HeaderButtonsProvider stackType="native">
        <NavigationContainer onReady={() => SplashScreen.hideAsync()}>
          <RootSiblingParent>
            <MainNavigation />
          </RootSiblingParent>
        </NavigationContainer>
      </HeaderButtonsProvider>
    </GestureHandlerRootView>
  );
};

export default App;
