import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Footer = ({ navigation }) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
        accessibilityLabel="Home"
        accessibilityRole="button"
      >
        <Icon name="home" size={24} color="#ff5722" />
        <Text style={styles.footerText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Order Status')}
        accessibilityLabel="Order Status"
        accessibilityRole="button"
      >
        <Icon name="list" size={24} color="#ff5722" />
        <Text style={styles.footerText}>Order</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Chat')}
        accessibilityLabel="Chat"
        accessibilityRole="button"
      >
        <Icon name="chat" size={24} color="#ff5722" />
        <Text style={styles.footerText}>Chat</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Profile')}
        accessibilityLabel="Profile"
        accessibilityRole="button"
      >
        <Icon name="person" size={24} color="#ff5722" />
        <Text style={styles.footerText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 4, // Add shadow for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10, // Smaller padding to maintain height
  },
  footerText: {
    fontSize: 12,
    color: '#ff5722',
    marginTop: 2, // Reduced margin to maintain height
  },
});

export default Footer;
