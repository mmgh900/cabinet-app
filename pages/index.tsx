import {Box, Grid, GridItem} from "@chakra-ui/react";
import type {NextPage} from "next";
import React from "react";
import Layout from "../components/Layout/Layout";
import {useGetCurrentCommuteQuery} from "../redux/api.slice";
import CommuterPage from "../components/HomePage/commuter-page";
import {useAppSelector} from "../redux/hooks";
import {RootState} from "../redux/store";
import DriverPage from "../components/HomePage/driver-page";
import CurrentCommute from "../components/HomePage/current-commute";
import AdminPage from "../components/HomePage/admin-page";

const Home: NextPage = () => {
    const user = useAppSelector((state: RootState) => state.user.currentUser);
    const {data: currentCommute} = useGetCurrentCommuteQuery()
    return (
        <Layout>
            {
                currentCommute ?
                    <CurrentCommute/>
                    :
                    user?.role?.toLowerCase() === "admin" ?
                        <AdminPage/> :
                        user?.role?.toLowerCase() === "commuter" ?
                            <CommuterPage/> :
                            <DriverPage/>
            }
        </Layout>
    );
};

export default Home;
