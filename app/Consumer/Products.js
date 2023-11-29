// Consumer/Products.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { db } from '../../src/services/firebase/firebaseConfig';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

export default function ConsumerProducts() {
  const [products, setProducts] = useState([]);
  const [topRatedProducts, setTopRatedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productList = [];
      querySnapshot.forEach((doc) => {
        productList.push({ id: doc.id, ...doc.data() });
      });
      setProducts(productList);

      // Assuming 'averageRating' is a field in your product documents
      const topRatedQuery = query(collection(db, 'products'), orderBy('averageRating', 'desc'));
      const topRatedSnapshot = await getDocs(topRatedQuery);
      const topRatedList = [];
      topRatedSnapshot.forEach((doc) => {
        topRatedList.push({ id: doc.id, ...doc.data() });
      });
      setTopRatedProducts(topRatedList.slice(0, 5)); // Top 5 rated products
    };

    fetchProducts();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Top Rated Products</Text>
      <FlatList
        horizontal
        data={topRatedProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.averageRatings} stars</Text>
            <Text style={styles.title}>{item.name}</Text>
            <Text>{item.price} {item.currency}</Text>
            <Text>{item.vendorName}</Text>
          </View>
        )}
      />
      <Text style={styles.sectionTitle}>All Products</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <TouchableOpacity onPress={() => router.replace('Consumer/[id].js')}>
            </TouchableOpacity>
            <Image source={{ uri: item.imageUrl }} style={styles.productImage} />

            <Text>{item.averageRatings} stars</Text>
            <Text style={styles.title}>{item.name}</Text>
            <Text>{item.price} {item.currency}</Text>
            <Text>{item.vendorName}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
  },
  // Add more styles as needed
});
