import { createContext, useEffect, useState } from 'react';
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
    sendEmailVerification,
} from 'firebase/auth';
import { app } from '../../firebase.config';

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = async (email, password, name, photo) => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const newUser = userCredential.user;

            // Update user profile with display name and photo URL
            await updateProfile(newUser, {
                displayName: name,
                photoURL: photo,
            });

            // Send email verification
            await sendEmailVerification(newUser);
            
            console.log('User registered:', newUser); // Log the new user
            return newUser; // Return the new user
        } catch (error) {
            console.error('Error creating user:', error);
            throw error; // Propagate the error
        } finally {
            setLoading(false);
        }
    };

    const signIn = async (email, password) => {
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential.user; // Return the signed-in user
        } catch (error) {
            console.error('Error signing in:', error);
            throw error; // Propagate the error
        } finally {
            setLoading(false);
        }
    };

    const signInWithGoogle = () => {
      setLoading(true);
      return signInWithPopup(auth, googleProvider);
  };

    const logOut = async () => {
        setLoading(true);
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error logging out:', error);
            throw error; // Propagate the error
        } finally {
            setLoading(false);
        }
    };

    // onAuthStateChange
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log('Current User:', currentUser);
            setLoading(false);
        });
        return () => {
            return unsubscribe();
        };
    }, []);

    const authInfo = {
        user,
        setUser,
        loading,
        createUser,
        signIn,
        signInWithGoogle,
        logOut,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
