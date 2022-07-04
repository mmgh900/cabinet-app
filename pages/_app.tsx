import {ChakraProvider} from "@chakra-ui/react";
import {AppProps} from "next/app";
import {extendTheme} from "@chakra-ui/react";
import {PersistGate} from 'redux-persist/integration/react'
import {Provider} from "react-redux";
import "../styles/globals.css";
import store, {persistor} from "../redux/store";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
    brand: "#fdbf5a",
};
const theme = extendTheme({colors});

export default function App({Component, pageProps}: AppProps) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ChakraProvider theme={theme}>

                    <Component {...pageProps} />
                </ChakraProvider>
            </PersistGate>
        </Provider>
    );
}
