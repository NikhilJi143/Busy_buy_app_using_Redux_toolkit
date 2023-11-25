// React hooks
import { useState, useEffect } from "react";

// Required components: FilterBar and MainContent
import FilterBar from "../Component/Home/FilterBar";
import MainContent from "../Component/Home/MainContent";

// CSS styles
import styles from "../styles/home.module.css";

// Show loading spinner on first render
import Loader from "../Component/Loader/Loader";

// Render homepage
export function Home() {
    // Loading status by default true
    const [isLoading, setLoading] = useState(true);

    // To show/hide the filter bar on homepage
    const [applyFilter, setApplyFilter] = useState(false);

    // To filter items on the basis of price and item category
    const [price, setPrice] = useState(5000);
    const [category, setCategory] = useState('none');

    // For searched item
    const [search, setSearch] = useState('');

    // Hide loader spinner
    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 400);

        return () => clearTimeout(timeout);
    }, []);

    // Return component
    return (
        <>
            {/* Checking whether to show/hide loading spinner */}
            {isLoading ? <Loader /> :
                <>
                    {/* Page header */}
                    <div className={styles.header}>

                        {/* Search bar */}
                        <input
                            type="text"
                            placeholder="Search Item..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        {/* Apply filter button  */}
                        {/* Show/hide on button click */}
                        <button onClick={() => setApplyFilter(!applyFilter)}>
                            {applyFilter ? "Cancel" : "Apply Filter"}
                        </button>
                    </div>

                    {/* Rendering all the products and filter bar */}
                    <div className={styles.mainContainer}>
                        {/* If applyFilter is "true" then render it  */}
                        {applyFilter && <FilterBar price={price} setPrice={setPrice} setCategory={setCategory} />}

                        {/* Show all the products */}
                        {/* Props to apply filter on the products */}
                        <MainContent
                            search={search}
                            price={price}
                            category={category}
                            applyFilter={applyFilter}
                        />
                    </div>
                </>
            }
        </>
    );
}
