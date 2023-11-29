import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { db, auth } from '../../src/services/firebase/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function VendorProducts() {
    const [products, setProducts] = useState([]);
    const currentUserId = auth.currentUser.uid;

    useEffect(() => {
        const fetchProducts = async () => {
            const q = query(collection(db, 'products', where('vendorId', '==', currentUserId)));
            const querySnapshot = await getDocs(q);
            const productList = [];
            querySnapshot.forEach((doc) => {
                productList.push({ id: doc.id, ...doc.data() });
            });
            setProducts(productList);
        };

        fetchProducts();
    }, []);

    return (
        <View style={styles.container}>
          <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.title}>{item.name}</Text>
                {/* Additional product details */}
              </View>
            )}
          />
        </View>
    );
};
 
const styles = StyleSheet.create({
    container: {
    flex: 1,
    padding: 10,
    },
    item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    },
    title: {
    fontSize: 20,
    },
    // Add more styles as needed
});
