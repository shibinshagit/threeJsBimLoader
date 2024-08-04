import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Header = ({ navigation }) => {
  return (
    <View style={styles.header}>
      {/* Logo */}
      <Image
        style={styles.logo}
        source={{ uri: 'https://bismimess.online/assets/img/gallery/bismi.png' }}
      />
      
      {/* App Name/Title */}
      <Text style={styles.title}>Bismi Mess</Text>

      {/* Navigation Icons */}
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon name="menu" size={30} color="#fff" />
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Icon name="person" size={30} color="#fff" />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFBF00',
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    justifyContent: 'space-between',
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Header;
