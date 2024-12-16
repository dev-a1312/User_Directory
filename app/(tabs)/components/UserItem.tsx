import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserItem: React.FC<{ user: any }> = ({ user }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.name}>{user.name}</Text>
      <Text>{user.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  name: { fontSize: 18, fontWeight: 'bold' , color: 'white',},
});

export default UserItem;
