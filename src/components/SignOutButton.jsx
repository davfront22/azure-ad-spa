import React from "react";
import { useMsal } from "@azure/msal-react";

//UI
import { Button } from "react-bootstrap";
/**
 * Renders a sign-out button
 */
export const SignOutButton = () => {
    const { instance } = useMsal();

    const handleLogout = (logoutType) => {
        if (logoutType === "popup") {
            instance.logoutPopup({
                postLogoutRedirectUri: "/",
                mainWindowRedirectUri: "/"
            });
        } else if (logoutType === "redirect") {
            instance.logoutRedirect({
                postLogoutRedirectUri: "/",
            });
        }
    }

    
    return (
       
        <Button variant="primary" className="ml-auto"   onClick={() => handleLogout("redirect")}>
            Sign Out
        </Button>
    )
}