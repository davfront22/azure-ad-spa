/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { useIsAuthenticated } from '@azure/msal-react';
import { SignInButton } from './SignInButton';
import { SignOutButton } from './SignOutButton';


import { callMsGraph } from '../graph';
import { loginRequest } from '../authConfig';
import Images from './Constants/Images';


/**
 * Renders the navbar component with a sign-in or sign-out button depending on whether or not a user is authenticated
 * @param props
 */
export const PageLayout = (props) => {
    const isAuthenticated = useIsAuthenticated();

    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);



    function RequestProfileData() {
        // Silently acquires an access token which is then attached to a request for MS Graph data
        instance
            .acquireTokenSilent({
                ...loginRequest,
                account: accounts[0],
            })
            .then((response) => {
                callMsGraph(response.accessToken).then((response) => setGraphData(response));
            });
    };




    return (
        <>
            <Navbar bg="white" className="navbarStyle">
                <img
                    src={Images.Logo}
                    alt="Logo"
                    height="1%"
                    width="3%"
                />
                <div className="collapse navbar-collapse justify-content-end ">
                    {
                        isAuthenticated ?
                            (
                                <div className="mx-auto justify-content-center d-flex flex-column">
                                    <Navbar.Text>
                                        Signed in as: <a href="/">{accounts[0].name}</a>
                                    </Navbar.Text>
                                    <Navbar.Text className='mr-3'  >
                                        <a href="/">{accounts[0].username}</a>
                                    </Navbar.Text>
                                </div>
                            )
                            :
                            null
                    }
                    <br />
                    {isAuthenticated ? <SignOutButton /> : null}
                </div>
            </Navbar>
            <br />
            <br />
            {props.children}
        </>
    );
};
