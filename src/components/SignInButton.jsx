import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";

//  UI
import { Button } from "react-bootstrap";

/**
 * Renders a drop down button with child buttons for logging in with a popup or redirect
 */
export const SignInButton = ({ title }) => {
    const { instance } = useMsal();

    const handleLogin = (loginType) => {
        if (loginType === "popup") {
            instance.loginPopup(loginRequest).catch(e => {
                console.log(e);
            });
        } else if (loginType === "redirect") {
            instance.loginRedirect(loginRequest).catch(e => {
                console.log(e);
            });
        }
    }
    return (
        <Button variant="primary" className="btn-block"  onClick={() => handleLogin("redirect")}>
            {title}
        </Button>
    )
};