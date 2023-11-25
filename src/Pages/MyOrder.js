// React hooks 
import { useEffect, useState } from "react";

// React Router
import { Link } from "react-router-dom";

// Custom context hook for value (product)
import { useProductContext } from "../productContext";

// Required components for OrderDetail and Loading spinner
import OrderDetail from "../Component/MyOrder/OrderDetail";
import Loader from "../Component/Loader/Loader";

// CSS styles
import styles from "../styles/myorder.module.css";

// Render MyOrder page
export function MyOrder() {
    // Getting all orders from custom context hook
    const { myorders } = useProductContext();

    // To show/hide loading spinner on the page
    const [isLoading, setLoading] = useState(true);

    // Hide the spinner after a given time
    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 300);

        return () => clearTimeout(timeout);
    }, []);

    return (
        // Conditions to show/hide spinner
        <>
            {isLoading ? <Loader /> :
                // Main page container
                <div className={styles.mainContainer}>

                    {/* Page heading */}
                    <h1 className={styles.orderHeading}>
                        My Orders
                    </h1>

                    {/* To show a message if no orders in the list */}
                    {myorders.length === 0 ?
                        <>
                            {/* Message of no orders */}
                            <h1>You haven't placed any order yet !!</h1>
                            {/* Link to redirect to the home page */}
                            <Link to="/">!!! Start Shopping !!!</Link>
                        </>
                        :
                        // If there are orders, render them one by one
                        // Order list container
                        <div className={styles.orderListContainer}>
                            {myorders.map((order, i) => <OrderDetail key={i} order={order} />)}
                        </div>
                    }
                </div>
            }
        </>
    );
}
