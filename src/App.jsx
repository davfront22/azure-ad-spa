import React, { useState, useEffect } from 'react';
import './styles/App.css';
import { PageLayout } from './components/PageLayout';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import Button from 'react-bootstrap/Button';
import { loginRequest } from './authConfig';
import { callMsGraph } from './graph';
import { ProfileData } from './components/ProfileData';
import { SignInButton } from './components/SignInButton';
import Grid from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Images from './components/Constants/Images';
import ScaleLoader from "react-spinners/ScaleLoader";
import Alert from 'react-bootstrap/Alert'


/**
 * Renders information about the signed-in user or a button to retrieve data about the user
 */



const ProfileContent = () => {


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
                console.log(accounts)
            });
    }

    return (
        <>
            <h5 className="card-title">Welcome to GoVending</h5>
            {graphData ? (
                <ProfileData graphData={graphData} />
            ) : (
                <Button variant="dark" onClick={RequestProfileData}>
                    See more
                </Button>
            )}
        </>
    );
};

/**
 * If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
 */
const MainContent = () => {
    //Loading component
    const [color, setColor] = useState("#0A5AFF");
    const [isLoadingComponents, setIsLoadingComponents] = useState(false);
    useEffect(() => {
        setIsLoadingComponents(true)
        setTimeout(() => {
            setIsLoadingComponents(false)
        }, 1000)
    }, [])



    return (
        <>
            {
                isLoadingComponents ?

                    <ScaleLoader

                        loading={isLoadingComponents}
                        color={color}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    />

                    :
                    <div className="App">
                        <AuthenticatedTemplate>
                        <ProfileContent />
                        </AuthenticatedTemplate>
                        <UnauthenticatedTemplate>
                            <Grid>
                                <Row>
                                    <Col xs={1} md={4}></Col>
                                    <Col xs={1} md={4}>
                                        <h4 className="text-start">Welcome back</h4>
                                        <p className="text-start">Sign in to your GoVending account.</p>
                                        <br/>
                                        <div className='d-grid gap-2' >
                                            <SignInButton title="Sign in" />
                                        </div>
                                        <br/>
                                        {[
                                            'primary',
                                        ].map((variant) => (
                                            <Alert key={variant} variant={variant}>
                                               If you have problems logging in, please contact us by email at support@govending.com
                                            </Alert>
                                        ))}
                                    </Col>
                                    <Col xs={1} md={4}></Col>
                                </Row>
                            </Grid>
                        </UnauthenticatedTemplate>
                    </div>
            }
        </>
    );
};

export default function App() {
    return (
        <PageLayout>
            <MainContent />
        </PageLayout>
    );
}
