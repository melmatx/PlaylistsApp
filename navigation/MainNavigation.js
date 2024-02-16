import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Routes from "./Routes";
import Home from "./screens/Home";
import AddSongs from "./screens/AddSongs";

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={Routes.HOME} component={Home} />
      <Stack.Screen name={Routes.ADD_SONGS} component={AddSongs} />
    </Stack.Navigator>
  );
};

export default MainNavigation;
