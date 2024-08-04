import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProfileCard = ({ name, email, phone }) => {
  return (
    <View style={styles.card}>
      <Image
        style={styles.avatar}
        source={{ uri: 'https://www.w3schools.com/w3images/avatar2.png' }}
      />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{email}</Text>
      <Text style={styles.phone}>{phone}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    margin: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#555',
  },
  phone: {
    fontSize: 14,
    color: '#555',
  },
});

export default ProfileCard;
