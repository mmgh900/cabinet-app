import { Box, Flex, Icon, IconButton, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { FaBars, FaClock, FaHome, FaUser, FaUsers, FaWallet } from "react-icons/Fa";
import Link from "next/link";
import { useAppSelector } from "../../redux/hooks";

export default function SideMenu() {
    const router = useRouter();
    const user = useAppSelector(state => state.user.currentUser)
    const { pathname } = router;
    return (
        <Flex>
            <Stack
                spacing={6}
                direction={{ base: "row", md: 'column' }}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: { base: "100%", md: '70px' },
                    height: { base: "70px", md: '100vh' },
                    backgroundColor: "white",
                    py: 5
                }}
            >

                <Link href="/" passHref>
                    <IconButton
                        as="a"
                        aria-label="Home"
                        color={pathname == "/" ? "black" : "gray.300"}
                        size={"lg"}
                        variant={"ghost"}
                        icon={<Icon fontSize={20} as={FaHome} />}
                    />
                </Link>
                {
                    user?.role != 'Admin' &&
                    <>

                        <Link href="/history" passHref>
                            <IconButton
                                as="a"
                                color={pathname == "/history" ? "black" : "gray.300"}
                                aria-label="history"
                                size={"lg"}
                                variant={"ghost"}
                                icon={<Icon fontSize={20} as={FaClock} />}
                            />
                        </Link>


                    </>

                }
                <Link href="/user" passHref>
                    <IconButton
                        as="a"
                        color={pathname == "/user" ? "black" : "gray.300"}
                        aria-label="User"
                        size={"lg"}
                        variant={"ghost"}
                        icon={<Icon fontSize={20} as={FaUser} />}
                    />
                </Link>
                {
                    user?.role == 'Admin' &&
                    <Link href="/users" passHref>
                        <IconButton
                            as="a"
                            color={pathname == "/users" ? "black" : "gray.300"}
                            aria-label="Users"
                            size={"lg"}
                            variant={"ghost"}
                            icon={<Icon fontSize={20} as={FaUsers} />}
                        />
                    </Link>
                }
            </Stack>
        </Flex>
    );
}
