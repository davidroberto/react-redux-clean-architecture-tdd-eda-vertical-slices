import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ffd33d",
        headerStyle: {
          backgroundColor: "#25292e",
        },
        headerShadowVisible: false,
        headerTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: "#25292e",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons name={focused ? "home-sharp" : "home-outline"} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="exercices"
        options={{
          title: "Exercices",
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons name={focused ? "barbell" : "barbell-outline"} color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
