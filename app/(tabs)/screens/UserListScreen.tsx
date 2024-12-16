import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserListScreenProps {
  navigate: (screen: 'UserList' | 'UserDetails', user?: User) => void;
}

const UserListScreen: React.FC<UserListScreenProps> = ({ navigate }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [displayedUsers, setDisplayedUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<'name' | 'email'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
      setDisplayedUsers(response.data);
    } catch (err) {
      console.error('Failed to load users.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(query.toLowerCase())
    );
    setDisplayedUsers(filteredUsers);
  };

  const handleSort = (key: 'name' | 'email') => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc'; // Toggle sort order
    setSortKey(key);
    setSortOrder(newSortOrder);

    const sortedUsers = [...displayedUsers].sort((a, b) => {
      const valueA = a[key].toLowerCase();
      const valueB = b[key].toLowerCase();

      if (newSortOrder === 'asc') {
        return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
      } else {
        return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
      }
    });

    setDisplayedUsers(sortedUsers);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const renderUserItem = ({ item }: { item: User }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigate('UserDetails', item)}>
      <Image
        source={{ uri: `https://picsum.photos/seed/${item.id}/100/100` }}
        style={styles.profilePicture}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Directory</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search users by name..."
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      {/* Sorting Buttons */}
      <View style={styles.sortButtonsContainer}>
        <Pressable style={styles.sortButton} onPress={() => handleSort('name')}>
          <Text style={styles.sortButtonText}>Sort by Name ({sortOrder})</Text>
        </Pressable>
        <Pressable style={styles.sortButton} onPress={() => handleSort('email')}>
          <Text style={styles.sortButtonText}>Sort by Email ({sortOrder})</Text>
        </Pressable>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <FlatList
          data={displayedUsers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderUserItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#1c1c1e', // Dark theme background
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
  },
  searchBar: {
    backgroundColor: '#2c2c2e',
    color: '#ffffff',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#3c3c3e',
  },
  sortButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sortButton: {
    flex: 1,
    backgroundColor: '#2c2c2e',
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 3,
  },
  sortButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2c2c2e',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 3,
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#3c3c3e',
  },
  infoContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  userEmail: {
    fontSize: 14,
    color: '#a9a9a9',
    marginTop: 4,
  },
});

export default UserListScreen;
