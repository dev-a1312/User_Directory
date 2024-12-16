import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserListScreen from '../screens/UserListScreen';
import UserDetailsScreen from '../screens/UserDetailsScreen';

const Stack = createStackNavigator();

const StackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserList" component={UserListScreen} options={{ title: 'User Directory' }} />
      <Stack.Screen name="UserDetails" component={UserDetailsScreen} options={{ title: 'User Details' }} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
