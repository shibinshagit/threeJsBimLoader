import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';

const OrderStatusScreen = ({ navigation }) => {
  // Dummy data for order status
  const orderDetails = {
    status: 'In Progress',
    orderNumber: 'ORD123456',
    estimatedDelivery: '2024-08-10',
    items: [
      { name: 'Meal Plan A', quantity: 2 },
      { name: 'Meal Plan B', quantity: 1 },
    ],
  };

  return (
    <View style={styles.container}>
      {/* <Header /> */}
      <View style={styles.content}>
        <Text style={styles.headerText}>Order Status</Text>
        <View style={styles.statusCard}>
          <Text style={styles.statusLabel}>Order Number:</Text>
          <Text style={styles.statusValue}>{orderDetails.orderNumber}</Text>
          <Text style={styles.statusLabel}>Status:</Text>
          <Text style={[styles.statusValue, styles.inProgress]}>
            {orderDetails.status}
          </Text>
          <Text style={styles.statusLabel}>Estimated Delivery:</Text>
          <Text style={styles.statusValue}>{orderDetails.estimatedDelivery}</Text>
          <Text style={styles.statusLabel}>Items:</Text>
          {orderDetails.items.map((item, index) => (
            <Text key={index} style={styles.itemText}>
              {item.quantity} x {item.name}
            </Text>
          ))}
        </View>
        <TouchableOpacity
          style={styles.contactButton}
          onPress={() => navigation.navigate('Chat')}
        >
          <Text style={styles.contactButtonText}>Contact Support</Text>
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
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#333',
  },
  statusCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  statusValue: {
    fontSize: 16,
    fontWeight: '400',
    color: '#333',
    marginBottom: 10,
  },
  inProgress: {
    color: '#ff5722',
  },
  itemText: {
    fontSize: 14,
    color: '#333',
  },
  contactButton: {
    backgroundColor: '#ff5722',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OrderStatusScreen;
