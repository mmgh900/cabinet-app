import {
	Box,
	Button,
	Center,
	Collapse,
	Divider,
	Flex,
	Grid,
	GridItem,
	Heading,
	Icon,
	Input,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	SimpleGrid,
	Stack,
	StackDivider,
	Text,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import { ReactNode } from "react";
import { FaDotCircle, FaHome, FaLocationArrow } from "react-icons/fa";
import Layout from "../components/Layout/Layout";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
	const [activeInput, setActiveInput] = React.useState<null | string>(null);
	const AddressInput = ({
		icon,
		name,
		placeholder,
		iconColor,
		setActiveInput,
	}: {
		icon: any;
		name: string;
		placeholder: string;
		iconColor?: string;
		setActiveInput: (input: string | null) => void;
	}) => {
		const height = "45px";
		return (
			<Center p={2}>
				<Center w={height} h={height}>
					<Icon color={iconColor} as={icon} />
				</Center>

				<Input
					name={name}
					height={"100%"}
					variant="ghost"
					placeholder={placeholder}
					onFocus={(e) => setActiveInput(e.target.name)}
					onBlur={() => activeInput == name && setActiveInput(null)}
				/>
			</Center>
		);
	};
	const SavedLocation = ({
		icon,
		address,
		name,
	}: {
		icon: any;
		name: string;
		address: string;
	}) => {
		return (
			<Button
				justifyContent={"start"}
				textAlign="start"
				display={"flex"}
				variant="ghost"
				h={"80px"}
				alignItems={"center"}
				p={2}
			>
				<Center boxShadow={"md"} rounded="full" mr={6} w={50} h={50}>
					<Icon as={icon} />
				</Center>

				<Box>
					<Heading mb={1} size="sm">
						{name}
					</Heading>
					<Text color="gray.400">{address}</Text>
				</Box>
			</Button>
		);
	};
	const format = (val) => `$` + val;
	const parse = (val) => val.replace(/^\$/, "");

	const [value, setValue] = React.useState("1.53");
	return (
		<Layout>
			<Grid
				sx={{ width: "100%", height: "100%" }}
				templateColumns="2fr 5fr"
				gap={"24px"}
			>
				<GridItem>
					<Box mb={6} p={4} bg="white" borderRadius={20} boxShadow="md">
						<Box bg="white" borderRadius={20} boxShadow="md">
							<AddressInput
								setActiveInput={setActiveInput}
								icon={FaDotCircle}
								name="origin"
								placeholder="Enter origin address"
							/>
							<Divider />
							<AddressInput
								setActiveInput={setActiveInput}
								iconColor="brand"
								icon={FaLocationArrow}
								name="destination"
								placeholder="Enter destination address"
							/>
						</Box>
						<Collapse in={!!activeInput} animateOpacity>
							<Stack mt={4} divider={<StackDivider />}>
								<SavedLocation
									icon={FaHome}
									name="Home"
									address="2 Smith Street, Mayor Blv"
								/>
								<SavedLocation
									icon={FaHome}
									name="Home"
									address="2 Smith Street, Mayor Blv"
								/>
							</Stack>
						</Collapse>
					</Box>
					<Box p={4} bg="white" borderRadius={20} boxShadow="md">
						<Heading size="md">Suggested Price</Heading>
						<Flex p={5}>
							<NumberInput
								variant={"ghost"}
								onChange={(valueString) => setValue(parse(valueString))}
								value={format(value)}
								size="lg"
								w="200px"
								min={3}
								max={50}
							>
								<NumberInputField fontSize={50} />
							</NumberInput>
						</Flex>
					</Box>
					<Button size="lg" mt={6} bg="brand" colorScheme={"yellow"} w="100%">
						Submit
					</Button>
				</GridItem>
				<GridItem></GridItem>
			</Grid>
		</Layout>
	);
};

export default Home;
