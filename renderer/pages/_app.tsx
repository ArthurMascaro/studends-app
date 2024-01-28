import React from 'react';
import type { AppProps } from 'next/app';

import '../styles/output.css';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Component {...pageProps} />
            <Toaster 
                position="bottom-right" 
                toastOptions={{ 
                    style: {
                        backgroundColor: "#352C48",
                        color: "white",
                        fontWeight: "bold",
                        margin: 20
                    }
                }}
            />
        </>
    )
}

export default MyApp;
