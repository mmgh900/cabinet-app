import { Avatar, Badge, Box, Button, Heading, HStack, Icon, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { IoCarOutline, IoStarOutline } from "react-icons/io5";
import Layout from "../components/Layout/Layout";
import UserProfile from "../components/user-profile";
import { useGetUserProfileQuery } from "../redux/api.slice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { logout } from "../redux/user.reducer";

const Home: NextPage = () => {

    const user = useAppSelector((state: RootState) => state.user.currentUser);
    const { data: userProfile } = useGetUserProfileQuery(user?.email)
    if (!userProfile) {
        return <Layout>
            Loading...
        </Layout>
    }
    const dispatch = useAppDispatch();
    return (
        <Layout>
            <UserProfile userProfile={userProfile}/>
            <Button mt={5} width={'100%'} h={50} variant={'ghost'} colorScheme={'red'} onClick={() => {
                dispatch(logout());
            }}
            >
                Logout
            </Button>
        </Layout>
    );
};

export default Home;
