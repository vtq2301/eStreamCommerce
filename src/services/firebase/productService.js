// productService.js
import { db } from '../src/services/firebase/firebaseConfig';
import { collection, doc, getDoc, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';

const productsCollectionRef = collection(db, 'products');

export const addProduct = async (productData) => {
  try {
    const docRef = await addDoc(productsCollectionRef, productData);
    return docRef.id;
  } catch (error) {
    console.error('Error adding product:', error);
  }
};

export const removeProduct = async (productId) => {
  try {
    await deleteDoc(doc(productsCollectionRef, productId));
  } catch (error) {
    console.error('Error removing product:', error);
  }
};

export const getProductById = async (productId) => {
  try {
    const docRef = doc(productsCollectionRef, productId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error('Error fetching product:', error);
  }
};

export const updateProduct = async (productId, updatedData) => {
  try {
    await updateDoc(doc(productsCollectionRef, productId), updatedData);
  } catch (error) {
    console.error('Error updating product:', error);
  }
};

export const updateQuantity = async (productId, change) => {
  // 'change' can be positive (increase) or negative (decrease)
  const product = await getProductById(productId);
  if (product && product.stockQuantity + change >= 0) {
    await updateProduct(productId, { stockQuantity: product.stockQuantity + change });
  }
};

export const setRatings = async (productId, newRating) => {
  const product = await getProductById(productId);
  if (product) {
    // Assuming you have a field to store total ratings and total rating count
    const updatedRatings = (product.ratingsTotal + newRating) / (product.ratingCount + 1);
    await updateProduct(productId, { 
      ratingsTotal: product.ratingsTotal + newRating,
      ratingCount: product.ratingCount + 1,
      averageRating: updatedRatings
    });
  }
};
