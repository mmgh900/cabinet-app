import {Badge, Box, Button, Flex, HStack, Text} from "@chakra-ui/react";
import {useAcceptCommuteMutation, useGetPendingRequestsQuery} from "../../redux/api.slice";
import {FaCar, FaTaxi, FaUserAlt} from "react-icons/fa";
import {FaClock} from "react-icons/Fa";
import React from "react";

export default function DriverPage() {
    const {data: requests} = useGetPendingRequestsQuery(undefined, {
        pollingInterval: 1000,
    })
    const [acceptRequest] = useAcceptCommuteMutation()
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
                        <Box sx={{
                            bg: 'white',
                            p: 5,
                            mb: 3,
                            border: '1px solid gray',
                            borderRadius: 20,
                            borderColor: 'gray.200'
                        }}
                        >
                            <Badge colorScheme="purple" mb={1}>{request.status}</Badge>
                            <HStack mb={3} spacing={3}>
                                <Text fontSize={16} fontWeight={'semibold'}>{request.origin}</Text>
                                <FaTaxi/>
                                <Text fontSize={16} fontWeight={'semibold'}>{request.destination}</Text>
                            </HStack>
                            <HStack mb={1}>
                                <FaUserAlt color={'gray'} fontSize={13}/>
                                <Text mb={3}
                                      fontWeight={'semibold'}
                                      color={'gray'}
                                      textTransform={'uppercase'}
                                      fontSize={13}
                                >{request.commuterName}</Text>
                            </HStack>
                            <HStack mb={5}>
                                <FaClock color={'gray'} fontSize={13}/>
                                <Text mb={3}
                                      fontWeight={'semibold'}
                                      color={'gray'}
                                      textTransform={'uppercase'}
                                      fontSize={13}
                                >{request.requestTime}</Text>
                            </HStack>
                            <Flex alignItems={"center"} justifyContent={'space-between'}>
                                <Text fontWeight={'bold'} fontSize={30}>
                                    {request.price} $
                                </Text>
                                <Button onClick={() => {
                                    acceptRequest({
                                        id: request.id,
                                    }).unwrap()
                                        .catch(console.error)

                                }} colorScheme={'yellow'} bg={'brand'}
                                >
                                    Accept
                                </Button>
                            </Flex>


                        </Box>

                    )
                )
            }
        </Box>
    )
}