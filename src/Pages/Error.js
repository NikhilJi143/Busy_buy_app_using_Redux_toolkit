// react hook
import { useEffect } from "react";

// react router
import { useNavigate } from "react-router-dom"

// render error page
export function Error(){
    const navigate = useNavigate();

    // redirect to homepage after 3 seconds
    useEffect(() => {
        const redirectTimer = setTimeout(() => {
            navigate("/");
        }, 3000);

        // Clear the timer to avoid side effects
        return () => clearTimeout(redirectTimer);
    }, [navigate]); // Include navigate in the dependency array

    return (
        // Error message on screen
        <div style={{ textAlign: "center" }}>
            <h1>Error, Something went wrong !!!</h1>
            <p>Redirecting back to homepage... </p>
        </div>
    );
}
