import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProfileCard from '../components/ProfileCard';

const ProfileScreen = ({ navigation }) => {
  // Dummy profile data
  const userProfile = {
    name: 'shah',
    email: 'sha@gmail.com',
    phone: '+7012975494',
    address: '1234 Elm Street, Springfield, IL',
  };

  return (
    <View style={styles.container}>
      {/* <Header /> */}
      <View style={styles.content}>
        <ProfileCard
          name={userProfile.name}
          email={userProfile.email}
          phone={userProfile.phone}
          address={userProfile.address}
        />
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    backgroundColor: '#ff5722',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;
