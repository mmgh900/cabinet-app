import { Box, Stack, Text } from "@chakra-ui/react";
import Layout from "../../components/Layout/Layout";
import { useGetUsersQuery } from "../../redux/api.slice";
import Link from 'next/link'
export default function User() {
    const { data: users } = useGetUsersQuery()
    return (
        <Layout>
            {
                users &&
                <Stack spacing={2}>
                    {
                        users.map(user =>
                            <Link key={user.email} passHref href={`/users/${user.email}`}>
                                <a>
                                    <Box sx={{
                                        '&:hover': {
                                            bg: 'blue.50'
                                        }
                                    }} bg='white' borderRadius={20} p={5} border='1px solid gray' borderColor='gray.200'>
                                        <Text fontSize={16} fontWeight={'semibold'}>{user.fullName}</Text>
                                        <Text>{user.email}</Text>
                                    </Box>
                                </a>
                            </Link>

                        )
                    }
                </Stack>


            }
        </Layout>
    )
}