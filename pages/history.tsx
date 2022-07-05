import {
	Box,
	Container,
	Table,
	TableCaption,
	TableContainer,
	Tbody,
	Td,
	Text,
	Tfoot,
	Th,
	Thead,
	Tr
} from "@chakra-ui/react";
import type { NextPage } from "next";
import React from "react";
import Layout from "../components/Layout/Layout";
import {useGetCommutesHistoryQuery, useGetPendingRequestsQuery} from "../redux/api.slice";
import CommuteCard from "../components/commute-card";


const Home: NextPage = () => {
	const {data: commutes} = useGetCommutesHistoryQuery()

	return (
		<Layout>
			<Box>
				<Text mb={3} fontSize={"2xl"}
					  fontWeight="bold"
				>
					Commutes History
				</Text>
				{
					commutes?.map(
						commute => (
							<CommuteCard key={commute.id} commute={commute}/>

						)
					)
				}
			</Box>
		</Layout>
	);
};

export default Home;
