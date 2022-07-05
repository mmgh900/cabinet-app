import { Box, Avatar, Heading, Badge, HStack, Icon, Text, Button } from "@chakra-ui/react";
import { IoCarOutline, IoStarOutline } from "react-icons/io5";
import user from "../pages/user";
import { useToggleBlockMutation } from "../redux/api.slice";
import { useAppSelector } from "../redux/hooks";

export default function UserProfile({ userProfile }: { userProfile: any }) {
    const user = useAppSelector(state => state.user.currentUser)
    const [toggleBlock] = useToggleBlockMutation()
    return (
        <Box bg="white"
            w={"100%"}
            h="100%"
            p={5}
            display={'flex'}
            alignItems={'center'}
            flexDirection={'column'}
            borderRadius={20}
        >
            <Avatar mb={3} size="xl" />{' '}
            <Heading>{userProfile.firstName + " " + userProfile.lastName}</Heading>
            <HStack mt={2} spacing={2}>
                <Badge  colorScheme="purple" fontSize="lg">
                    {userProfile.role}
                </Badge>
                {
                    userProfile.isBlocked &&
                    <Badge mt={2} colorScheme="red" variant={'solid'} fontSize="lg">
                        Blocked
                    </Badge>
                }

            </HStack>
            <HStack width={'100%'} mt={8} spacing={4}>
                <Box bg={'blue.50'}
                    p={7}
                    width={'50%'}
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'end'}
                    height={180}
                    borderRadius={30}
                >
                    <Icon color={'blue.500'} fontSize={30} as={IoCarOutline} />
                    <Box flexGrow={1} />
                    <Text mb={-3} fontWeight={'light'} color={'blue.500'} fontSize={40}>{userProfile.numberOfCommutes}</Text>
                    <Text fontWeight={'light'} fontSize={20}>Commutes</Text>
                </Box>
                <Box bg={'green.50'}
                    p={7}
                    width={'50%'}
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'end'}
                    height={180}
                    borderRadius={30}
                >
                    <Icon color={'green.500'} fontSize={30} as={IoStarOutline} />
                    <Box flexGrow={1} />
                    <Text mb={-3} fontWeight={'light'} color={'green.500'} fontSize={40}>{userProfile.score / 10}</Text>
                    <Text fontWeight={'light'} fontSize={20}>Rating</Text>
                </Box>
            </HStack>
            <Box mt={5} bg={'gray.50'}
                p={7}
                width={'100%'}
                display={'flex'}
                flexDirection={'column'}
                alignItems={'start'}
                borderRadius={30}
            >
                <Text color={'gray.500'}>EMAIL</Text>
                <Text fontSize={18}>{userProfile.email}</Text>
                <Text mt={5} color={'gray.500'}>PHONE NUMBER</Text>
                <Text fontSize={18}>{userProfile.phoneNumber}</Text>

            </Box>
            {
                user.role == 'Admin' &&
                <Button mt={5} onClick={() => {
                    toggleBlock(userProfile.email)
                }}>
                    {userProfile.isBlocked ? 'Unblock' : 'Block'}
                </Button>
            }
           

        </Box>
    )
}