import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ChatScreen = ({ navigation }) => {
  const handleWhatsAppRedirect = () => {
    const url = 'https://wa.me/917012975494'; // Replace with your WhatsApp number
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <View style={styles.container}>
      {/* <Header /> */}
      <ScrollView style={styles.content}>
        <Text style={styles.chatHeader}>Chat with our support team:</Text>
        <View style={styles.chatBox}>
          <Text style={styles.message}>Hello! How can we assist you today?</Text>
          <Text style={styles.message}>I'm having trouble with my order.</Text>
          <Text style={styles.message}>Could you please provide more details?</Text>
        </View>
        <View style={styles.feedbackSection}>
          <Text style={styles.feedbackHeader}>We Value Your Feedback!</Text>
          <Text style={styles.feedbackText}>
            Your feedback helps us improve our service. Please let us know your thoughts.
          </Text>
        </View>
        <TouchableOpacity style={styles.whatsAppButton} onPress={handleWhatsAppRedirect}>
          <Text style={styles.whatsAppText}>Contact Us on WhatsApp</Text>
        </TouchableOpacity>
      </ScrollView>
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
  },
  chatHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chatBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  feedbackSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  feedbackHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  feedbackText: {
    fontSize: 16,
    color: '#555',
  },
  whatsAppButton: {
    backgroundColor: '#25D366', // WhatsApp color
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  whatsAppText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChatScreen;
