import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Image, View, Text, StyleSheet, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Context
import { AuthProvider, useAuth } from './src/contexts/AuthContext';

// Screens
import LoadingScreen from './src/components/LoadingScreen';
import LandingScreen from './src/screens/LandingScreen';
import AuthScreen from './src/screens/AuthScreen';
import CreatorsScreen from './src/screens/CreatorsScreen';
import CreatorProfileScreen from './src/screens/CreatorProfileScreen';
import ViewerDashboardScreen from './src/screens/ViewerDashboardScreen';
import CreatorDashboardScreen from './src/screens/CreatorDashboardScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import AboutScreen from './src/screens/AboutScreen';
import ContactScreen from './src/screens/ContactScreen';
import TermsScreen from './src/screens/TermsScreen';
import AdminScreen from './src/screens/AdminScreen';
import AuctionRoomScreen from './src/screens/AuctionRoomScreen';
import PostsScreen from './src/screens/PostsScreen';

// Utils
import { enableScreenProtection } from './src/utils/securityUtils';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Custom Tab Bar Icons
const TabIcon = ({ source, focused }) => (
  <View style={[styles.tabIcon, focused && styles.tabIconFocused]}>
    <Image 
      source={source} 
      style={[styles.tabIconImage, { tintColor: focused ? '#FFD700' : '#FFFFFF' }]} 
    />
  </View>
);

// Bottom Tab Navigator with Instagram-like Design
const MainTabs = () => {
  const { user } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FFD700',
        tabBarInactiveTintColor: '#FFFFFF',
      }}
    >
      <Tab.Screen
        name="Home"
        component={CreatorsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabIconContainer}>
              <Text style={[styles.tabIconText, { color: focused ? '#FFD700' : '#FFFFFF' }]}>🏠</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={CreatorsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabIconContainer}>
              <Text style={[styles.tabIconText, { color: focused ? '#FFD700' : '#FFFFFF' }]}>🔍</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={user?.accountType === 'creator' ? CreatorDashboardScreen : ViewerDashboardScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabIconContainer}>
              <Text style={[styles.tabIconText, { color: focused ? '#FFD700' : '#FFFFFF' }]}>🔔</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Reels"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabIconContainer}>
              <Text style={[styles.tabIconText, { color: focused ? '#FFD700' : '#FFFFFF' }]}>📋</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={user?.accountType === 'creator' ? CreatorDashboardScreen : ViewerDashboardScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.profileTabIcon, focused && styles.profileTabIconFocused]}>
              <Image
                source={{ uri: user?.profilePic || 'https://picsum.photos/100/100?random=user' }}
                style={styles.profileImage}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Auth Stack for unauthenticated users
const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Landing" component={LandingScreen} />
    <Stack.Screen name="Auth" component={AuthScreen} />
    <Stack.Screen name="About" component={AboutScreen} />
    <Stack.Screen name="Contact" component={ContactScreen} />
    <Stack.Screen name="Terms" component={TermsScreen} />
  </Stack.Navigator>
);

// Main App Stack for authenticated users
const AppStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MainTabs" component={MainTabs} />
    <Stack.Screen name="CreatorProfile" component={CreatorProfileScreen} />
    <Stack.Screen name="AuctionRoom" component={AuctionRoomScreen} />
    <Stack.Screen name="Posts" component={PostsScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
    <Stack.Screen name="About" component={AboutScreen} />
    <Stack.Screen name="Contact" component={ContactScreen} />
    <Stack.Screen name="Terms" component={TermsScreen} />
    <Stack.Screen name="Admin" component={AdminScreen} />
  </Stack.Navigator>
);

// Main App Component
const AppContent = () => {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    // Screen protection disabled for development/screenshots
    // Uncomment to enable in production:
    // try {
    //   enableScreenProtection();
    // } catch (error) {
    //   console.log('Screen protection not available on this platform');
    // }
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {/* Android-compatible StatusBar */}
      <StatusBar 
        style="light" 
        backgroundColor="transparent" 
        translucent={Platform.OS === 'android'}
      />
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

// Root App with Providers
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#000000',
    borderTopWidth: 0,
    height: Platform.OS === 'android' ? 65 : 75,
    paddingBottom: Platform.OS === 'android' ? 8 : 18,
    paddingTop: 8,
    elevation: 0,
    shadowColor: 'transparent',
  },
  tabIconContainer: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconText: {
    fontSize: 26,
  },
  tabIcon: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
  },
  tabIconFocused: {
    backgroundColor: 'transparent',
  },
  tabIconImage: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  profileTabIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    overflow: 'hidden',
  },
  profileTabIconFocused: {
    borderColor: '#FFD700',
    borderWidth: 2.5,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

