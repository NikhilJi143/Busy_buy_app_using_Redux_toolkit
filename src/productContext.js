// React hooks
import { createContext, useContext, useEffect, useState } from "react";

// Firebase
import { db } from "./firebaseInit";
import { updateDoc, doc, arrayUnion, onSnapshot, arrayRemove } from "firebase/firestore";

// Importing list of all the products
import { data } from "./Assets/data";

// Values from custom hook (authentication)
import { useAuthValue } from "./authContext";

// Toast notification
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";

// Create Context API for product
export const productContext = createContext();

// Custom context hook
export function useProductContext() {
    return useContext(productContext);
}

// Provider for product-related context
export function ProductContext({ children }) {
    // User's login status and loggedIn user
    const { isLoggedIn, userLoggedIn, setLoggedIn, setUserLoggedIn } = useAuthValue();
    // Number of items in cart
    const [itemInCart, setItemInCart] = useState(0);
    // All products in cart
    const [cart, setCart] = useState([]);
    // All orders placed by the user
    const [myorders, setMyOrders] = useState([]);
    // Total amount of user's cart
    const [total, setTotal] = useState(0);

    // Return date in yy/mm/dd format
    function getDate() {
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return (`${year}-${month}-${day}`);
    }

    // To check if the user is still logged in on page refresh
    useEffect(() => {
        const token = window.localStorage.getItem("token");
        if (token) {
            const index = window.localStorage.getItem("index");
            const user = JSON.parse(index);
            setLoggedIn(token);
            setUserLoggedIn(user);
        }
    }, []);

    // Getting real-time update of user's cart
    useEffect(() => {
        if (isLoggedIn) {
            onSnapshot(doc(db, "buybusy", userLoggedIn.id), (doc) => {
                setCart(doc.data().cart);
                setMyOrders(doc.data().orders);
            });
            let sum = 0;
            cart.map((item) => Number(sum += item.price));
            setTotal(sum);
            setItemInCart(cart.length);
        }
    }, [userLoggedIn]);

    // To increase item's quantity
    async function increaseQuant(product) {
        const index = cart.findIndex((item) => item.name === product.name);
        cart[index].quantity++;
        setCart(cart);
        const userRef = doc(db, "buybusy", userLoggedIn.id);
        await updateDoc(userRef, {
            cart: cart
        });
        setItemInCart(itemInCart + 1);
        setTotal(Number(total + cart[index].price));
    }

    // To decrease item's quantity
    async function decreaseQuant(product) {
        const index = cart.findIndex((item) => item.name === product.name);
        setTotal(Number(total - cart[index].price));

        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            cart.splice(index, 1);
        }

        setCart(cart);
        setItemInCart(itemInCart - 1);

        const userRef = doc(db, "buybusy", userLoggedIn.id);
        await updateDoc(userRef, {
            cart: cart
        });
    }

    // Function to add product to cart
    async function addToCart(product) {
        if (!isLoggedIn) {
            toast.error("Please first login!");
            return;
        }

        const index = cart.findIndex((item) => item.name === product.name);
        if (index !== -1) {
            increaseQuant(cart[index]);
            toast.success("Product Quantity Increased!!");
            return;
        }

        const userRef = doc(db, "buybusy", userLoggedIn.id);
        await updateDoc(userRef, {
            cart: arrayUnion({ quantity: 1, ...product })
        });

        setTotal(Number(total + product.price));
        setItemInCart(itemInCart + 1);
        toast.success("Added to your Cart!!");
    }

    // Remove a single product from cart
    async function removeFromCart(product) {
        const userRef = doc(db, "buybusy", userLoggedIn.id);
        await updateDoc(userRef, {
            cart: arrayRemove(product)
        });

        setTotal(Number(total - (product.quantity * product.price)));
        setItemInCart(itemInCart - product.quantity);
        toast.success("Removed from Cart!!");
    }

    // Function to remove all products from cart
    async function clearCart() {
        if (itemInCart === 0) {
            toast.error("Nothing to remove in Cart!!");
            return;
        }

        const userRef = doc(db, "buybusy", userLoggedIn.id);
        await updateDoc(userRef, {
            cart: []
        });

        setTotal(0);
        setItemInCart(0);
        toast.success("Empty Cart!!");
    }

    // Function to purchase all the items in cart
    async function purchaseAll() {
        const currentDate = getDate();

        const userRef = doc(db, "buybusy", userLoggedIn.id);
        await updateDoc(userRef, {
            orders: arrayUnion({ date: currentDate, list: cart, amount: total })
        });

        clearCart();
    }

    // Context value with product-related functions and states
    const contextValue = {
        data,
        addToCart,
        cart,
        total,
        setTotal,
        removeFromCart,
        clearCart,
        purchaseAll,
        myorders,
        increaseQuant,
        decreaseQuant,
        itemInCart
    };

    // Providing context value to the component tree
    return (
        <productContext.Provider value={contextValue}>
            {children}
        </productContext.Provider>
    );
}
