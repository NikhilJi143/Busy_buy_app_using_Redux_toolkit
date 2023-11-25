// Custom context hook for values (product)
import { useProductContext } from "../../productContext";

// CSS styles 
import oldStyles from "../../styles/home.module.css";
import styles from "../../styles/cart.module.css";

// Render single cart item 
export default function CartItem(props) {
    // Product data from props
    const { name, image, price, category, quantity } = props.product;

    // Required functions from the custom hook (product)
    const { removeFromCart, increaseQuant, decreaseQuant } = useProductContext();

    return (
        <>
            {/* Item card container */}
            <div className={oldStyles.cardContainer}>

                {/* Image container */}
                <div className={styles.imageContainer}>
                    {/* Product image */}
                    <img src={image} alt={category} />
                </div>

                {/* Description of the product name, price, add button */}
                <div className={styles.itemInfo}>
                    {/* Product name */}
                    <div className={styles.namePrice}>
                        {name}
                    </div>

                    <div className={styles.priceQuant}>
                        {/* Price of the product */}
                        <div className={styles.price}>
                            ₹{price}
                        </div>

                        {/* Quantity of the product */}
                        <div className={styles.quantity}>
                            {/* To decrease product quantity */}
                            <span className={styles.minus}>
                                <i className="fa-solid fa-circle-minus"
                                    onClick={() => decreaseQuant(props.product)}></i>
                            </span>

                            {/* Quantity */}
                            &nbsp; {quantity} &nbsp;

                            {/* Increase product quantity */}
                            <span className={styles.plus}>
                                <i className="fa-solid fa-circle-plus"
                                    onClick={() => increaseQuant(props.product)}>
                                </i>
                            </span>

                        </div>
                    </div>

                    {/* Remove from cart button */}
                    <div className={styles.btnContainer}>
                        <button className={styles.removeBtn}
                            onClick={() => removeFromCart(props.product)}>
                            Remove From Cart
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
