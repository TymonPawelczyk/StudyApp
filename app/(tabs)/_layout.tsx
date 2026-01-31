import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { useAuth } from "../../context/AuthContext";

export default function TabsLayout() {
  const { user } = useAuth();

  const plan =
    (user?.app_metadata as any)?.plan ??
    (user?.user_metadata as any)?.plan ??
    null;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#c0f000",
        tabBarInactiveTintColor: "#94a3b8",
        tabBarStyle: {
          backgroundColor: "#0f172a",
          borderTopColor: "#1e293b",
        },
        tabBarLabelStyle: {
          fontWeight: "700",
        },
      }}
    >
      {/* Home Screen */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      {/* Calendar Screen */}
      <Tabs.Protected guard={user != null}>
        <Tabs.Screen
          name="calendar"
          options={{
            title: "Calendar",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar-outline" size={size} color={color} />
            ),
          }}
        ></Tabs.Screen>
      </Tabs.Protected>
      {/* Materials Screen */}
      <Tabs.Protected guard={user != null}>
        <Tabs.Screen
          name="materials"
          options={{
            title: "Materials",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="book-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs.Protected>
      {/* Screen with statistics */}
      <Tabs.Protected guard={user != null}>
        <Tabs.Screen
          name="statistics"
          options={{
            title: "Statistics",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="bar-chart-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs.Protected>
      {/* Profile Screen */}
      <Tabs.Protected guard={user != null}>
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="person-circle-outline"
                size={size}
                color={color}
              />
            ),
            tabBarBadge: user ? undefined : "!",
          }}
        />
      </Tabs.Protected>
      {/* Hidden Edit Profile Screen */}
      <Tabs.Protected guard={user != null}>
        <Tabs.Screen
          name="edit-profile"
          options={{
            href: null, // Hide from tab bar
          }}
        />
      </Tabs.Protected>
      {/* Hidden Settings Screen */}
      <Tabs.Protected guard={user != null}>
        <Tabs.Screen
          name="settings"
          options={{
            href: null, // accessed via burger menu
          }}
        />
      </Tabs.Protected>
    </Tabs>
  );
}
