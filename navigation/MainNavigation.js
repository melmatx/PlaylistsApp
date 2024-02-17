import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Routes from "./Routes";
import Login from "./screens/Login";
import Home from "./screens/Home";
import AddSongs from "./screens/AddSongs";
import useAuthStore from "../stores/useAuthStore";

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  const identity = useAuthStore((state) => state.identity);

  return (
    <Stack.Navigator>
      {identity ? (
        <>
          <Stack.Screen name={Routes.HOME} component={Home} />
          <Stack.Screen name={Routes.ADD_SONGS} component={AddSongs} />
        </>
      ) : (
        <Stack.Screen
          name={Routes.LOGIN}
          component={Login}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default MainNavigation;
