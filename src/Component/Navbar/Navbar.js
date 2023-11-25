// Custom context hook
import { useAuthValue } from "../../authContext";

// CSS styles 
import styles from "../../styles/navbar.module.css";

// Import from React Router
import { Outlet, NavLink } from "react-router-dom";

// Navbar Component
export default function Navbar() {
    // User's login status
    const { isLoggedIn, signOut } = useAuthValue();

    return (
        <>
            {/* Main container */}
            <div className={styles.navbarContainer}> 
                {/* App heading */}
                <div className={styles.appName}>
                    <NavLink to="/">
                        {/* Logo of the app */}
                        <i className="fa-solid fa-shop"></i>
                        &nbsp;Buy Busy
                    </NavLink>
                </div>

                {/* All navigation links */}
                <div className={styles.navLinks}>

                    {/* Homepage link */}
                    <NavLink to="/">
                        <span>
                            {/* Home logo */}
                            <i className="fa-solid fa-house"></i>
                            &nbsp; Home
                        </span>
                    </NavLink>

                    {/* My order link - Show when the user is logged in */}
                    {isLoggedIn && 
                        <NavLink to="/myorder">
                            <span>
                                {/* My order logo */}
                                <i className="fa-solid fa-bag-shopping"></i>
                                &nbsp; My Order
                            </span>
                        </NavLink>
                    }

                    {/* Cart link - Show when the user is logged in */}
                    {isLoggedIn && 
                        <NavLink to="/cart">
                            <span>
                                {/* Cart icon */}
                                <i className="fa-sharp fa-solid fa-cart-shopping"></i>
                                &nbsp; Cart
                            </span>
                        </NavLink>
                    }

                    {/* For signIn and signOut */}
                    <NavLink to={!isLoggedIn ? "/signin" : "/"}>
                        <span>
                            {!isLoggedIn ?
                                <>
                                    {/* Sign in icon */}
                                    <i className="fa-solid fa-right-to-bracket"></i>
                                    &nbsp; SignIn
                                </>
                                :
                                <>
                                    {/* Sign out icon */}
                                    <i className="fa-solid fa-right-from-bracket"></i>
                                    {/* Sign out user */}
                                    <span onClick={signOut}>SignOut</span>
                                </>
                            }
                        </span>
                    </NavLink>
                </div>
            </div>
            {/* Render child pages */}
            <Outlet />
        </>
    );
}
