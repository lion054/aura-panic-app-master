/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 console.disableYellowBox = true;

import 'react-native-gesture-handler';

import React, { PureComponent } from 'react';
import { Dimensions, Text, View } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import colors from './src/helpers/colors';

// Pre-define $rem to calculate lightStyles and darkStyles
EStyleSheet.build({
  $rem: Dimensions.get('window').width / 375,
  ...colors
});

import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/scenes/Home';
import Contacts from './src/scenes/Contacts';
import Profile from './src/scenes/Profile';
import HealthAlert from './src/scenes/HealthAlert';
import SecurityAlert from './src/scenes/SecurityAlert';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

import { displayFontStyles } from './src/helpers/fonts';

const tabStyles = EStyleSheet.create({
  tabBar: {
    paddingHorizontal: '50rem'
  }
});

const AppTabs = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: EStyleSheet.value('$primaryColor'),
      labelStyle: tabStyles.label,
      style: tabStyles.tabBar
    }}
  >
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarLabel: ({ focused, color, position }) => (
          <Text style={[focused ? displayFontStyles.semibold : displayFontStyles.regular, {
            color,
            fontSize: EStyleSheet.value(focused ? '14rem' : '12rem'),
            borderBottomWidth: EStyleSheet.value('5rem'),
            borderBottomColor: focused ? color : 'transparent'
          }]}>Home</Text>
        ),
        tabBarIcon: ({ focused, color, size }) => (
          <Icon
            name="home"
            size={EStyleSheet.value('20rem')}
            color={color}
          />
        )
      }}
    />
    <Tab.Screen
      name="Contacts"
      component={Contacts}
      options={{
        tabBarLabel: ({ focused, color, position }) => (
          <Text style={[focused ? displayFontStyles.semibold : displayFontStyles.regular, {
            color,
            fontSize: EStyleSheet.value(focused ? '14rem' : '12rem'),
            borderBottomWidth: EStyleSheet.value('5rem'),
            borderBottomColor: focused ? color : 'transparent'
          }]}>Contacts</Text>
        ),
        tabBarIcon: ({ focused, color, size }) => (
          <Icon
            name="call"
            size={EStyleSheet.value('20rem')}
            color={color}
          />
        )
      }}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarLabel: ({ focused, color, position }) => (
          <Text style={[focused ? displayFontStyles.semibold : displayFontStyles.regular, {
            color,
            fontSize: EStyleSheet.value(focused ? '14rem' : '12rem'),
            borderBottomWidth: EStyleSheet.value('5rem'),
            borderBottomColor: focused ? color : 'transparent'
          }]}>Profile</Text>
        ),
        tabBarIcon: ({ focused, color, size }) => (
          <Icon
            name="person"
            size={EStyleSheet.value('20rem')}
            color={color}
          />
        )
      }}
    />
  </Tab.Navigator>
)

import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import socketReducer from './src/controllers/socket/reducer';
import apiMiddleware from './src/middleware/api';

const appReducer = combineReducers({
  socket: socketReducer
});

const store = createStore(appReducer, applyMiddleware(thunk, apiMiddleware));

import { Provider } from 'react-redux';

class App extends PureComponent {
  render = () => (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="AppTabs"
            component={AppTabs}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="HealthAlert"
            component={HealthAlert}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="SecurityAlert"
            component={SecurityAlert}
            options={{
              headerShown: false
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App;
