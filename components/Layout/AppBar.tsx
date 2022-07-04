import {
	AvatarBadge,
	Badge,
	Box,
	Button,
	Center,
	Circle,
	Flex,
	Heading,
	Icon,
	IconButton,
	Stack,
	Text,
} from "@chakra-ui/react";
import Link from "next/link";
import {
	FaBars,
	FaBell,
	FaHome,
	FaLocationArrow,
	FaUser,
	FaUserCircle,
	FaWallet,
} from "react-icons/Fa";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
export default function AppBar() {
	const user = useAppSelector((state: RootState) => state.user.currentUser);
	return (
		<Stack
			direction={"row"}
			sx={{
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
				height: "80px",
				width: "100%",
				pl: "32px",
				pr: "32px",
			}}
		>
			<Link href="/">
				<a style={{ display: "flex", alignItems: "center" }}>
					<Box
						rounded={"full"}
						marginRight={-27}
						bg={"brand"}
						w={"30px"}
						h={"30px"}
					/>
					<Heading fontWeight={"black"} size={"xl"}>
						Cabinet
					</Heading>
				</a>
			</Link>

			<Box flexGrow={1} />
			{user ? (
				<Center>
					<Box mr={3} textAlign={"right"}>
						<Text
							mb={-1}

							color="gray.400"
							fontSize={12}
							textTransform={"uppercase"}
						>
							Welcome dear {user.role.toLocaleLowerCase()}
						</Text>
						<Text fontWeight="semibold" fontSize={14}>{user.email}</Text>
					</Box>

					<Icon color="gray.300" w={10} h={10} as={FaUserCircle} />
				</Center>
			) : (
				<Link href={"/login"}>
					<Button size="lg" bg="brand" colorScheme={"yellow"}>
						Login
					</Button>
				</Link>
			)}
		</Stack>
	);
}
