import { Box, Button, Container, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import type { NextPage } from "next";
import React from "react";
import Layout from "../components/Layout/Layout";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { AppStore, RootState } from "../redux/store";
import { logout, setCurrentUser } from "../redux/user.reducer";

const Home: NextPage = () => {

	const user = useAppSelector((state: RootState) => state.user.currentUser);
	const dispatch = useAppDispatch();
	return (
		<Layout>
			<Box bg="white" w={"100%"} h="100%" borderRadius={20}>
				<Button onClick={() => {
					logout();
				}}>
					Logout
				</Button>
			</Box>
		</Layout>
	);
};

export default Home;
