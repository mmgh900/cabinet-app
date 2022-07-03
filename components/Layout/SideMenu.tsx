import { Box, Flex, Icon, IconButton, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { FaBars, FaClock, FaHome, FaUser, FaWallet } from "react-icons/Fa";
import Link from "next/link";
export default function SideMenu() {
	const [isOpen, setIsOpen] = React.useState(false);
	const router = useRouter();
	const { pathname } = router;
	return (
		<Flex>
			<Box
				transition={"all ease 500ms"}
				style={{ width: isOpen ? "200px" : "0" }}
				bg={"white"}
			></Box>

			<Stack
				spacing={6}
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					width: "80px",
					height: "100vh",
					backgroundColor: "white",
				}}
			>
				<IconButton
					onClick={() => setIsOpen(!isOpen)}
					aria-label="Menu"
					color="gray.300"
					size={"lg"}
					w={20}
					h={20}
					className="no-shadow"
					variant={"ghost"}
					icon={
						<Icon w={8} h={8} sx={{ transform: "rotate(90deg)" }} as={FaBars} />
					}
				/>
				<Link href="/" passHref>
					<IconButton
						as="a"
						aria-label="Home"
						color={pathname == "/" ? "black" : "gray.300"}
						size={"lg"}
						variant={"ghost"}
						icon={<Icon as={FaHome} />}
					/>
				</Link>
				<Link href="/history" passHref>
					<IconButton
						as="a"
						color={pathname == "/history" ? "black" : "gray.300"}
						aria-label="history"
						size={"lg"}
						variant={"ghost"}
						icon={<Icon as={FaClock} />}
					/>
				</Link>
				<Link href="/user" passHref>
					<IconButton
						as="a"
						color={pathname == "/user" ? "black" : "gray.300"}
						aria-label="User"
						size={"lg"}
						variant={"ghost"}
						icon={<Icon as={FaUser} />}
					/>
				</Link>
			</Stack>
		</Flex>
	);
}
