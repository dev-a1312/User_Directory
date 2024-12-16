import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

interface User {
  id: number;
  name: string;
  email: string;
  address: {
    street: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
  };
}

interface UserDetailsScreenProps {
  user: User | null;
  navigate: (screen: 'UserList' | 'UserDetails') => void;
}

const UserDetailsScreen: React.FC<UserDetailsScreenProps> = ({ user, navigate }) => {
  if (!user) {
    return <Text style={styles.error}>No user data available</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{user.name}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user.email}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>
          {`${user.address.street}, ${user.address.city}, ${user.address.zipcode}`}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Company:</Text>
        <Text style={styles.value}>{user.company.name}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Back to User List" onPress={() => navigate('UserList')} color="#1E90FF" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#1c1c1e', // Dark theme background
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#2c2c2e',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#a9a9a9',
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    fontWeight: '400',
    color: '#ffffff',
  },
  buttonContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  error: {
    color: '#ff6b6b',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default UserDetailsScreen;
