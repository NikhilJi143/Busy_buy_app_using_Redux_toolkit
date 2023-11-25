// Import styles
import styles from "../../styles/home.module.css";

// Import component to render a single item in the list
import ItemCard from "./ItemCard";

// Custom context hook
import { useProductContext } from "../../productContext";

// To show all the products
export default function MainContent(props) {
    // Values from props to filter list
    const { search, price, category, applyFilter } = props;

    // Product data
    const { data } = useProductContext();

    return (
        <div className={styles.itemContainer}>
            {/* Filter on the basis of search bar */}
            {data
                .filter((item) =>
                    search.toLocaleLowerCase() === ''
                        ? item
                        : item.name.toLocaleLowerCase().includes(search)
                )
                // Filter on the basis of price range
                .filter((item) => !applyFilter ? item : item.price <= price)
                // Filter on the basis of category
                .filter((item) =>
                    !applyFilter || category === 'none'
                        ? item
                        : item.category === category
                )
                // Map to each item of the array
                .map((item) => <ItemCard key={item.id} item={item} />)
            }
        </div>
    );
}
