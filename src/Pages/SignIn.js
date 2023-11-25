// React hook
import { useRef } from "react";

// React Router
import { NavLink, useNavigate } from "react-router-dom";

// CSS styles
import styles from "../styles/signIn.module.css";

// Custom context hook (authentication)
import { useAuthValue } from "../authContext";

// Sign-in page
export function SignIn() {
    // Sign-in function 
    const { signIn } = useAuthValue();

    // Navigate variable to navigate to some page
    const navigate = useNavigate();

    // Ref variables for email and password
    const emailRef = useRef();
    const passwordRef = useRef();

    // Form submit function
    async function handleSubmit(e) {
        e.preventDefault();
        
        // Storing user's data
        const data = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        };

        // Sign in user
        const status = await signIn(data);

        // If user signed in, redirect to corresponding page
        status ? navigate("/") : navigate("/signin");
    }

    return (
        // Main container of the page
        <div className={styles.container}>
            <div className={styles.inputForm}>
                {/* Heading */}
                <h1>Sign In</h1>
                {/* Form */}
                <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <input type="email" placeholder="Enter Email" required ref={emailRef} />
                    <br />

                    {/* Password */}
                    <input type="password" placeholder="Enter Password" required ref={passwordRef} />
                    <br />

                    {/* Submit button */}
                    <button>Submit</button>
                </form>
                <br />
                <span>or &nbsp;</span>

                {/* Link for signup page */}
                <NavLink to="/signup">
                    Create New Account
                </NavLink>
            </div>
        </div>
    );
}
