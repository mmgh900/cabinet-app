import {Box, Text} from "@chakra-ui/react";
import {useGetCommutesQuery} from "../../redux/api.slice";
import React from "react";
import CommuteCard from "../commute-card";

export default function AdminPage() {
    const {data: commutes} = useGetCommutesQuery(undefined, {
        pollingInterval: 1000,
    })

    return (
        <Box>
            <Text mb={3} fontSize={"2xl"}
                  fontWeight="bold"
            >
                All Commutes
            </Text>
            {
                commutes?.map(
                    commute => (
                        <CommuteCard commute={commute}/>
                    )
                )
            }
        </Box>
    )
}