import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
//Screens
import { LoginScreen, RegistrationScreen } from './screens';
import { HomeScreen, SettingsScreen, LibraryScreen, ExchangeScreen } from './screens/loggedIn';

function App(): JSX.Element {
  const [loggedIn, setLoggedIn] = useState(false);


  useEffect(() => {
    try {
      getAuth().onAuthStateChanged(user => {
        if (user) {
          setLoggedIn(true);
        }
        else {
          setLoggedIn(false);
        }
      });
    } catch (e) {
      console.log("error connecting firebase");
    }
  }, []);

  //navigators
  const Stack = createNativeStackNavigator();
  const Tab = createMaterialBottomTabNavigator();

  const renderAuthScreens = () => {
    return (<Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegistrationScreen} options={{ headerShown: false }} />
    </Stack.Navigator>);
  }

  const renderTabNavigator = () => {
    return (<Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName: any;
          switch (route.name) {
            case 'Home':
              iconName = focused ? "scale-sharp" : 'ios-information-circle-outline';
              break;
            case 'Library':
              iconName = focused ? 'library' : 'list-outline';
              break;
            case 'Post':
              iconName = focused ? 'camera' : 'list-outline';
              break;
            case 'Settings':
              iconName = focused ? 'settings-sharp' : 'list-outline';
              break;
            default:
              break;
          }
          return <Ionicons name={iconName} color={color} />;
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name='Library' component={LibraryScreen} />
      <Tab.Screen name='Post' component={ExchangeScreen} />
      <Tab.Screen name='Settings' component={SettingsScreen} />
    </Tab.Navigator>);
  }

  return (
    <NavigationContainer>
      {loggedIn ? renderTabNavigator() : renderAuthScreens()}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
});

export default App;
