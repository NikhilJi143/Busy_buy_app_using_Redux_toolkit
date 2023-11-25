// React hooks and router
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Custom context hook for values from product and authentication
import { useProductContext } from "../productContext";
import { useAuthValue } from "../authContext";

// Required components
import CartItem from "../Component/Cart/CartItem";
import Loader from "../Component/Loader/Loader";

// CSS styles
import firstStyles from "../styles/home.module.css";
import secondStyles from "../styles/cart.module.css";

// For toast notification
import { toast } from "react-toastify";

// Render the cart page
export function Cart() {
    // To show/hide the loading spinner on the page
    const [isLoading, setLoading] = useState(true);

    // Data for product from custom hook (product)
    const { cart, total, clearCart, purchaseAll, itemInCart } = useProductContext();

    // Data of user from custom hook (authentication)
    const { userLoggedIn } = useAuthValue();

    // To navigate to some page
    const navigate = useNavigate();

    // To hide loading spinner after a given time
    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 300);

        return () => clearTimeout(timeout);
    }, []);

    // Purchase button handler
    function handlePurchase() {
        // If cart is empty, return
        if (itemInCart === 0) {
            toast.error("Nothing to purchase in Cart!!");
            return;
        }

        // Purchase function
        purchaseAll();

        // Show notification
        toast.success("Your order has been placed!!!");

        // Navigate to myorder page
        navigate("/myorder");
    }

    return (
        <>
            {/* Condition to show/hide the loading spinner */}
            {isLoading ? <Loader /> :
                // Main container of the page
                <div className={secondStyles.mainContainer}>

                    {/* Header within the page to show cart details */}
                    <div className={secondStyles.header}>

                        {/* Welcome message */}
                        <div className={secondStyles.userInfo}>
                            <h1>Hey {userLoggedIn.name}, <small>Your Cart has</small></h1>
                        </div>

                        {/* Cart detail and purchase button */}
                        <div className={secondStyles.cartDetail}>

                            <div>
                                {/* Items within the cart */}
                                Item: {itemInCart}
                                <br />

                                {/* Button to empty cart */}
                                <button className={secondStyles.removeAll} onClick={clearCart}>
                                    Remove All
                                </button>
                            </div>

                            <div>
                                {/* Total amount of all the products within the cart */}
                                Total Amount: ₹{total}
                                <br />
                                {/* Button to purchase product from cart */}
                                <button className={secondStyles.purchaseAll} onClick={handlePurchase}>
                                    Purchase All
                                </button>
                            </div>

                        </div>
                    </div>

                    {/* Rendering all the products within the user's cart */}
                    <div className={firstStyles.itemContainer}>
                        {/* If cart is empty */}
                        {cart.length === 0 ?
                            // Render this message
                            <h1>Nothing in Your Cart !!!</h1>
                            // Else render all the products one by one
                            : cart.map((product, i) => <CartItem key={i}
                            product={product} />)
                        }
                    </div>
                </div>
            }
        </>
    );
}
