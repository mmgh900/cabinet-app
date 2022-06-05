import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from 'next/app'
import { extendTheme } from "@chakra-ui/react";
import '../styles/globals.css';
// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
	brand: "#fdbf5a",
};
const theme = extendTheme({ colors });

export default function App({ Component, pageProps } : AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}
