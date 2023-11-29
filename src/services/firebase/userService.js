import { getAuth, deleteUser } from 'firebase/auth';
import { db } from './firebaseConfig';
import {
    collection, setDoc, getDoc, updateDoc, deleteDoc, doc
} from 'firebase/firestore';

const usersCollectionRef = collection(db, 'users');
// Create a new user
export const createUser = async (data) => {
    try {
        await setDoc(doc(db, 'users', data.UID), data)
    } catch (error) {
        console.error("Error adding user: ", error);
    }
};

// Get a user by ID
export const getUser = async (userId) => {
    try {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            console.log('No such user!');
            return null;
        }
    } catch (error) {
        console.error('Error getting user: ', error);
    }
};

// Update a user

// Delete a user
export const removeUser = async(userId) => {
    try {
        const docRef = doc(db, 'users', userId);
        if (getUser(userId)) {
            const docDelete = await deleteDoc(docRef);
            getAuth().deleteUser(userId)
            console.log("Deleted user", userId);
        }
    } catch (error) {
        console.error('Error deleting a user: ', error);
    }
}