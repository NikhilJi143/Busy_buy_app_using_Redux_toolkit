// Importing styles
import styles from "../../styles/myorder.module.css";

// Render each order detail
export default function OrderDetail(props) {
    // Order details from props
    const { date, list, amount } = props.order;

    return (
        // Single order container
        <div>
            {/* Date of the order */}
            <h1 className={styles.orderHeading}>
                Ordered On: {date}
            </h1>

            {/* Table containing order details */}
            <table className={styles.orderTable}>
                {/* First row of the table */}
                <tr>
                    <th>S.no</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                </tr>

                {/* Rendering all the products within the order */}
                {list.map((product, i) => (
                    <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>x{product.quantity}</td>
                        <td>₹{product.quantity * product.price}</td>
                    </tr>
                ))}

                {/* Last row to show the total amount of the order */}
                <tr>
                    <td colSpan={4}>Grand Total</td>
                    <td>₹{amount}</td>
                </tr>
            </table>
        </div>
    );
}
