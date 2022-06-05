import {
	Box,
	Center,
	Collapse,
	Flex,
	Icon,
	IconButton,
	Stack,
} from "@chakra-ui/react";
import React from "react";
import {
	FaBars,
	FaHome,
	FaLocationArrow,
	FaUser,
	FaWallet,
} from "react-icons/Fa";
export default function SideMenu() {
	const [isOpen, setIsOpen] = React.useState(false);
	return (
		<Flex>
			<Box
				transition={"all ease 1s"}
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
					boxShadow="none !important"
					variant={"ghost"}
					icon={
						<Icon w={8} h={8} sx={{ transform: "rotate(90deg)" }} as={FaBars} />
					}
				/>
				<IconButton
					aria-label="Home"
					color="gray.300"
					size={"lg"}
					variant={"ghost"}
					icon={<Icon as={FaHome} />}
				/>
				<IconButton
					aria-label="Locations"
					color="gray.300"
					size={"lg"}
					variant={"ghost"}
					icon={<Icon as={FaLocationArrow} />}
				/>

				<IconButton
					aria-label="User"
					color="gray.300"
					size={"lg"}
					variant={"ghost"}
					icon={<Icon as={FaUser} />}
				/>
				<IconButton
					aria-label="Wallet"
					color="gray.300"
					size={"lg"}
					variant={"ghost"}
					icon={<Icon as={FaWallet} />}
				/>
			</Stack>
		</Flex>
	);
}
