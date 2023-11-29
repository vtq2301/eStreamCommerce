import { db } from './firebaseConfig';
import {
    collection, setDoc, getDoc, updateDoc, deleteDoc, doc
} from 'firebase/firestore';

const usersCollectionRef = collection(db, 'users');
// Create a new user
export const createUser = async (userData) => {
    try {
        await setDoc(doc(db, 'users', 'AA'), {
            // UID: userData.uid,
            // name: userData.name,
            // email: userData.email,
            // userType: userData.userType,
            UID: "haha",
            name: "bb",
        })
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
}