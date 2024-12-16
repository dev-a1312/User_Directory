import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import UserListScreen from './screens/UserListScreen';
import UserDetailsScreen from './screens/UserDetailsScreen';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<'UserList' | 'UserDetails'>('UserList');
  const [selectedUser, setSelectedUser] = useState(null);

  const navigate = (screen: 'UserList' | 'UserDetails', user?: any) => {
    setCurrentScreen(screen);
    if (user) setSelectedUser(user);
  };

  return (
    <View style={styles.container}>
      {currentScreen === 'UserList' && <UserListScreen navigate={navigate} />}
      {currentScreen === 'UserDetails' && <UserDetailsScreen user={selectedUser} navigate={navigate} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default App;
