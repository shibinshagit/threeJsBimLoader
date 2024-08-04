import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FeaturedPlans = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Featured Plans</Text>
      <View style={styles.itemList}>
        <View style={styles.item}>
          <Text style={styles.itemText}>3 Times Monthly</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemText}>2 Times Monthly</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemText}>1 Time Monthly</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  itemList: {
    width: '100%',
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  itemText: {
    fontSize: 16,
  },
});

export default FeaturedPlans;
