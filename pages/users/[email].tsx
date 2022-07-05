import { useRouter } from "next/router";
import Layout from "../../components/Layout/Layout";
import UserProfile from "../../components/user-profile";
import { useGetUserProfileQuery } from "../../redux/api.slice";

export default function ProfilePage() {
    const router = useRouter()
    const {data} = useGetUserProfileQuery(router.query['email'])

    return <Layout>
        {
            data && <UserProfile userProfile={data} />
        }
        
    </Layout>
}
