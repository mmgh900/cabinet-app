import { Box, Center, Collapse, Container, Flex, Grid, GridItem, SlideFade, Text } from "@chakra-ui/react";
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
                flexDirection: { base: 'column-reverse', md: 'row' },
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

                        width: "100%",
                        height: "85%",
                        px: { base: 3, lg: 5 }
                    }}
                >
                    <Flex sx={{ width: "100%", height: "100%" }}
                    >
                        <Box width={'100%'} maxWidth={400} pr={{ base: 0, md: 3 }}
                            overflow={"auto"}
                        >
                            {children}
                        </Box>
                        <Box display={{ base: 'none', md: 'block' }} h="100%" width="100%">
                            <Box h="100%"
                                p={6}
                                width="100%"
                                borderRadius={"20px"}
                                bg="white"
                            >
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18187.629240345734!2d59.52833910052133!3d36.308693632668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f6c925d73674337%3A0x6325879f5fb01d18!2sFerdowsi%20University%20Mashhad!5e0!3m2!1sen!2snl!4v1654416342544!5m2!1sen!2snl"
                                    width="100%"
                                    height="100%"
                                ></iframe>
                            </Box>
                        </Box>
                    </Flex>

                </Box>
            </Box>

        </Flex>
    );
}

