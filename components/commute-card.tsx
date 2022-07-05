import { Badge, Box, Button, Flex, HStack, Text } from "@chakra-ui/react";
import { FaClock, FaTaxi, FaUserAlt } from "react-icons/Fa";
import React from "react";
import Commute from "../types/Commute";
import { useAcceptCommuteMutation } from "../redux/api.slice";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import Link from 'next/link'
export const statusColors = {
    'Waiting For Driver': 'purple',
    'In Progress': 'green',
    'Canceled': 'red',
    'Completed': 'blue',

}
export default function CommuteCard({ commute, withAcceptButton }: { commute: Commute, withAcceptButton?: boolean }) {
    const [acceptRequest] = useAcceptCommuteMutation()
    const user = useAppSelector((state: RootState) => state.user.currentUser)
    return (
        <Box sx={{
            bg: 'white',
            p: 5,
            mb: 3,
            border: '1px solid gray',
            borderRadius: 20,
            borderColor: 'gray.200'
        }}
        >
            <Badge variant={'outline'} colorScheme={statusColors[commute.status]} mb={1}>{commute.status}</Badge>
            <HStack mb={3} spacing={3}>
                <Text fontSize={16} fontWeight={'semibold'}>{commute.origin}</Text>
                <FaTaxi />
                <Text fontSize={16} fontWeight={'semibold'}>{commute.destination}</Text>
            </HStack>
            {
                commute.driverName && commute.driverName.trim() != "" &&
                <Link passHref href={`/users/${commute.driverEmail}`}>
                    <HStack as='a' mb={1}>
                        <FaUserAlt color={'gray'} fontSize={13} />

                        <Text mb={3}
                            fontWeight={'semibold'}
                            color={'gray'}
                            fontSize={13}
                        >
                            {
                                commute.driverName
                            }

                        </Text>
                        {
                            commute.driverScore &&
                            <Badge fontSize={10} colorScheme={'green'} ml={1}>{commute.driverScore}/10</Badge>
                        }
                    </HStack>
                </Link>
            }
            {
                commute.commuterName && commute.commuterName.trim() != "" &&
                <Link passHref href={`/users/${commute.commuterEmail}`}>
                    <HStack as='a' mb={1}>
                        <FaUserAlt color={'gray'} fontSize={13} />

                        <Text mb={3}
                            fontWeight={'semibold'}
                            color={'gray'}
                            fontSize={13}
                        >
                            {
                                commute.commuterName
                            }

                        </Text>

                    </HStack>
                </Link>

            }

            <HStack mb={5}>
                <FaClock color={'gray'} fontSize={13} />
                <Text mb={3}
                    fontWeight={'semibold'}
                    color={'gray'}
                    fontSize={13}
                >{commute.requestTime}</Text>
            </HStack>
            <Flex alignItems={"center"} justifyContent={'space-between'}>
                <Text fontWeight={'bold'} fontSize={30}>
                    {commute.price} $
                </Text>
                {
                    withAcceptButton && (
                        <Button onClick={() => {
                            acceptRequest({
                                id: commute.id,
                            }).unwrap()
                                .catch(err => {
                                    alert(err.data.detail)
                                })

                        }} colorScheme={'yellow'} bg={'brand'}
                        >
                            Accept
                        </Button>
                    )
                }
                {
                    commute.score && (
                        <Badge variant='solid' colorScheme={commute.score > 50 ? 'green' : 'red'} fontSize={14}>
                            {commute.score}  / 100
                        </Badge>
                    )
                }

            </Flex>


        </Box>

    )
}