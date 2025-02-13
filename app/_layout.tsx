import store from "@/src/shared/application/root.store";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="exercices/create-exercice"
            options={{
              title: "Créer un exercice",
              headerStyle: {
                backgroundColor: "#25292e",
              },
              headerShadowVisible: false,
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="exercices/update/[id]"
            options={{
              title: "Modifier un exercice",
              headerStyle: {
                backgroundColor: "#25292e",
              },
              headerShadowVisible: false,
              headerTintColor: "#fff",
            }}
          />
        </Stack>
      </GestureHandlerRootView>
    </Provider>
  );
}
