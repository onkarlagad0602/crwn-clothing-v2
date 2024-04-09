import { initializeApp } from "firebase/app";
import {
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword,
} from 'firebase/auth';
import {
    doc, getDoc, setDoc, getFirestore
} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyBMTMPm3h3dm7LBh0Sy9PyIoBr9953uRT8",
  authDomain: "crwn-closthing-db.firebaseapp.com",
  projectId: "crwn-closthing-db",
  storageBucket: "crwn-closthing-db.appspot.com",
  messagingSenderId: "37811823347",
  appId: "1:37811823347:web:3e2cfea06b2f51054b0d86"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt:'select_account'
})

export const auth=getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
export const db = getFirestore();
export const createUserDocumentFromAuth = async(userAuth, additionalInformation={})=>{
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid)
    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot)
    console.log(userSnapshot.exists())

    if (!userSnapshot.exists()){
        const {displayName, email}=userAuth;
        const createdAt = new Date();
        try{
            await(setDoc(userDocRef, {displayName, email, createdAt, ...additionalInformation }));
    
        }catch(error){
            console.log("Error creating the user", error.message);
    
        }
    }
    
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) =>{
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);

}