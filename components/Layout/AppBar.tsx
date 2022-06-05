import { AvatarBadge, Badge, Box, Circle, Heading, Icon, IconButton, Stack, Text } from "@chakra-ui/react";
import {
	FaBars,
	FaBell,
	FaHome,
	FaLocationArrow,
	FaUser,
	FaUserCircle,
	FaWallet,
} from "react-icons/Fa";
export default function AppBar() {
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
			<Box rounded={"full"} bg={"brand"} w={"50px"} h={"50px"} />
            <Heading size={'lg'}>CabiNET</Heading>
			<Box flexGrow={1} />
			<IconButton
				aria-label="Home"
				color="gray.300"
				size={"lg"}
				w={20}
				h={20}
				variant={"ghost"}
				icon={<Icon w={8} h={8} as={FaBell} />}
			/>
			<IconButton
				aria-label="Home"
				color="gray.300"
				size={"lg"}
				w={20}
				h={20}
				variant={"ghost"}
				icon={<Icon w={8} h={8} as={FaUserCircle} />}
			/>
		</Stack>
	);
}
