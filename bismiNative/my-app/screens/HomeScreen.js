import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button, Linking, Dimensions } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';

const { width: viewportWidth } = Dimensions.get('window');

// Dummy data for carousel
const carouselData = [
  { id: '1', image: 'https://bismimess.online/assets/img/gallery/bg3.jpg', title: 'Plan 1' },
  { id: '2', image: 'https://bismimess.online/assets/img/gallery/bg3.jpg', title: 'Plan 2' },
  { id: '3', image: 'https://bismimess.online/assets/img/gallery/bg3.jpg', title: 'Plan 3' },
];

const HomeScreen = ({ navigation }) => {
  const scrollRef = useRef(null);
  const scrollInterval = useRef(null);
  const currentIndex = useRef(0);

  useEffect(() => {
    scrollInterval.current = setInterval(() => {
      if (scrollRef.current) {
        currentIndex.current = (currentIndex.current + 1) % carouselData.length;
        scrollRef.current.scrollTo({
          x: currentIndex.current * viewportWidth * 0.8,
          animated: true,
        });
      }
    }, 2000);

    return () => clearInterval(scrollInterval.current); // Cleanup interval on unmount
  }, []);

  const handleBookNow = () => {
    // Call or WhatsApp functionality
    Linking.openURL('tel:+917012975494');
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.mainContent}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.carousel}
          ref={scrollRef}
        >
          {carouselData.map((item) => (
            <View key={item.id} style={styles.carouselItem}>
              <Image source={{ uri: item.image }} style={styles.carouselImage} />
              <Text style={styles.carouselTitle}>{item.title}</Text>
            </View>
          ))}
        </ScrollView>
        <Button title="Book Now" onPress={handleBookNow} />
      </ScrollView>
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingBottom: 60, // Ensure there's space for the footer
  },
  mainContent: {
    alignItems: 'center',
    padding: 20,
  },
  carousel: {
    width: viewportWidth,
    height: 200,
    marginVertical: 10,
  },
  carouselItem: {
    width: viewportWidth * 0.8,
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginHorizontal: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    position: 'relative',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    resizeMode: 'cover', // Ensure the image covers the entire container
  },
  carouselTitle: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: 'rgba(255,255,255, 0.5)', // Semi-transparent background for readability
    padding: 5,
    borderRadius: 5,
  },
});

export default HomeScreen;
