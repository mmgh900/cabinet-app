import { Box, Center, Container, Flex, Text } from "@chakra-ui/react";
import React from "react";
import AppBar from "./AppBar";
import SideMenu from "./SideMenu";
export interface LayoutProps {
	children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
	return (
		<Flex
			maxW={"100vw"}
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				height: "100vh",
				width: "100vw",
			}}
			bg="grey.500"
		>
			<SideMenu />
			<Box sx={{ w: "100%", h: "100vh", backgroundColor: "#fafafa"}}>
				<AppBar />
				<Box
					sx={{
						px: "32px",
						width: "100%",
						height: '85%'
					}}
				>
					{children}
				</Box>
			</Box>
		</Flex>
	);
}
