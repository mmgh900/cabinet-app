import {Box, Text} from "@chakra-ui/react";
import {useGetPendingRequestsQuery} from "../../redux/api.slice";
import React from "react";
import CommuteCard from "../commute-card";

export default function DriverPage() {
    const {data: requests} = useGetPendingRequestsQuery(undefined, {
        pollingInterval: 1000,
    })

    return (
        <Box>
            <Text mb={3} fontSize={"2xl"}
                  fontWeight="bold"
            >
                Pending Requests
            </Text>
            {
                requests?.map(
                    request => (
                        <CommuteCard withAcceptButton commute={request}/>
                    )
                )
            }
        </Box>
    )
}