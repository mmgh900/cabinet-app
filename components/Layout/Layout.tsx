import { Box, Center, Collapse, Container, Flex, SlideFade, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import AppBar from "./AppBar";
import SideMenu from "./SideMenu";
export interface LayoutProps {
	children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
	const user = useAppSelector((state: RootState) => state.user.currentUser);
	const router = useRouter();
	if (!user && typeof window !== "undefined") {
		router.push("/login");
	}
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
			<Collapse in={!!user}>
				<SideMenu />
			</Collapse>

			<Box sx={{ w: "100%", h: "100vh", backgroundColor: "#fafafa" }}>
				<AppBar />
				<Box
					sx={{
						px: "32px",
						width: "100%",
						height: "85%",
					}}
				>
					{children}
				</Box>
			</Box>
		</Flex>
	);
}
