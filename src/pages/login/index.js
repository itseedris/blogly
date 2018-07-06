import React from 'react';
import Head from 'next/head';
import Router from 'next/router';
import View from './view';
import { createToast, isLoggedIn } from '../../lib/helpers';
import './style.less';

export class Login extends React.Component {
    static async getInitialProps({ res, isServer, req }) {
        if (isServer) {
            if (isLoggedIn(req)) {
                const backURL = req.header('Referer') || '/';
                res.writeHead(302, {
                    Location: backURL
                });
                res.end();
                res.finished = true;
            }
        } else {
            if (isLoggedIn()) {
                Router.back();
                createToast('You\'re already logged in');
            }
        }

        return {};
    }
    render() {
        return (
            <React.Fragment>
                <Head>
                    <title>Login - Reactpress</title>
                </Head>
                <View />
            </React.Fragment>
        );
    }
}

export default Login;
