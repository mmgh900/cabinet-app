import { Box, Container, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import type { NextPage } from "next";
import React from "react";
import Layout from "../components/Layout/Layout";

const Home: NextPage = () => {

	return (
		<Layout>
			<Box bg="white" w={"100%"} h="100%" borderRadius={20}>
				<TableContainer w={"100%"}>
					<Table variant="striped" w={"100%"}>
						<Thead>
							<Tr>
								<Th>Pickup Time</Th>
								<Th>Pickup Address</Th>
								<Th>Driver</Th>
								<Th>Vihcle</Th>
								<Th isNumeric>Amount</Th>
							</Tr>
						</Thead>
						<Tbody>
							<Tr>
								<Td>inches</Td>
								<Td>millimetres (mm)</Td>
								<Td>millimetres (mm)</Td>
								<Td>millimetres (mm)</Td>
								<Td isNumeric>25.4</Td>
							</Tr>
							<Tr>
								<Td>inches</Td>
								<Td>millimetres (mm)</Td>
								<Td>millimetres (mm)</Td>
								<Td>millimetres (mm)</Td>
								<Td isNumeric>25.4</Td>
							</Tr>
							<Tr>
								<Td>inches</Td>
								<Td>millimetres (mm)</Td>
								<Td>millimetres (mm)</Td>
								<Td>millimetres (mm)</Td>
								<Td isNumeric>25.4</Td>
							</Tr>
							<Tr>
								<Td>inches</Td>
								<Td>millimetres (mm)</Td>
								<Td>millimetres (mm)</Td>
								<Td>millimetres (mm)</Td>
								<Td isNumeric>25.4</Td>
							</Tr>
						</Tbody>
					</Table>
				</TableContainer>
			</Box>
		</Layout>
	);
};

export default Home;
