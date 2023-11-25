// Import the custom Context hook for values
import { useProductContext } from "../../productContext";

// CSS styles
import styles from "../../styles/home.module.css";

// Component to render a single product item on the screen
export default function ItemCard(props) {
    // Destructure values from props
    const { name, image, price, category } = props.item;

    // Function to add item to cart
    const { addToCart } = useProductContext();

    return (
        <>
            {/* Main container */}
            <div className={styles.cardContainer}>

                {/* Image container */}
                <div className={styles.imageContainer}>
                    <img src={image} alt={category} />
                </div>

                {/* Description of the product name, price, add button */}
                <div className={styles.itemInfo}>
                    <div className={styles.namePrice}>
                        {/* Name of the product */}
                        <div className={styles.name}>
                            {name}
                        </div>

                        {/* Price of the product */}
                        <div className={styles.price}>
                            ₹{price}
                        </div>
                    </div>

                    {/* Add to cart button */}
                    <div className={styles.btnContainer}>
                        <button
                            className={styles.addBtn}
                            onClick={() => addToCart(props.item)}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
