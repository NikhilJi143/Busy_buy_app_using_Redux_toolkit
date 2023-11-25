// react hooks ,firebase database, toast notification
import { createContext, useContext, useEffect, useState } from "react";
import {db} from "./firebaseInit";
import { collection, addDoc, onSnapshot } from "firebase/firestore"; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// create contextAPI for authentication 
export const authContext = createContext();

// custom context hook to return values
export function useAuthValue(){
    return useContext(authContext);
}

// Authentication context provider
export function AuthContext({children}){
    // State for user list, login status, and logged-in user
    const [userList,setUserList]=useState([]);
    const [isLoggedIn,setLoggedIn]=useState(false);
    const [userLoggedIn,setUserLoggedIn]=useState(null);

    // Fetching all the users from data base on first render of page
    useEffect(()=>{
        onSnapshot(collection(db, "buybusy"), (snapShot) => {
            const users = snapShot.docs.map((doc) => {
                return {
                    id:doc.id,
                    ...doc.data()
                }
            });
            setUserList(users);
        });
    },[isLoggedIn]);
    
    // creating new user
    async function createUser(data){
        // checking whether the email address already in use or not
        const index = userList.findIndex((user) => user.email === data.email);

        // if found email display notification
        if(index !== -1){
            toast.error("Email Address already exist, Try Again or SignIn Instead!!!");
            return;
        }
        // if email not found create new user 
        await addDoc(collection(db, "buybusy"), {
            name: data.name,
            email: data.email,
            password: data.password,
            cart: [],
            orders: []
        });
        toast.success("New user Created, Please LogIn to Continue !!");
    }

    // Function to sign in a user 
    async function signIn(data){
        // finding user in database
        const index = userList.findIndex((user) => user.email === data.email);

        // if user not found show notification
        if(index === -1){
            toast.error("Email does not exist, Try again or SignUp Instead!!!");
            return false;
        }
        
        // if email found in database then match password
        if(userList[index].password === data.password){
            toast.success("Sign In Successfully!!!");
            // logging in user and storing its data in local variable
            setLoggedIn(true);
            setUserLoggedIn(userList[index]);
            // generating user's login token and store user's data 
            window.localStorage.setItem("token",true);
            window.localStorage.setItem("index",JSON.stringify(userList[index]));
            return true;
        }
        else{
            // if password doesn't match in database
            toast.error("Wrong UserName/Password, Try Again");
            return false;
        }
    }

    // Function to sign out
    function signOut(){
        // removing user' data and token from local storage
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("index");

        // Updating login status and user data
        setLoggedIn(false);
        setUserLoggedIn(null);

        // Displaying success notification
        toast.success("Sign Out Successfully!!!!");
    }

    // Context value with authentication functions and states
    const contextValue = {
    createUser,
    isLoggedIn,
    setLoggedIn,
    signIn,
    userLoggedIn,
    setUserLoggedIn,
    signOut
};

    // Providing context value to the component tree
    return (
        <authContext.Provider value={contextValue}>
            <ToastContainer />
            {children}
        </authContext.Provider>
    );
}