import {
	Box,
	Button,
	Center,
	Collapse,
	Grid,
	GridItem,
	Heading,
	HStack,
	Icon,
	Input,
	InputGroup,
	InputRightElement,
	Radio,
	RadioGroup,
	Select,
	Stack,
	Text,
	useRadio,
	useRadioGroup,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { Formik } from "formik";
const Home: NextPage = () => {
	const [showPassword, setShowPassword] = React.useState(false);
	const handlePasswordShowButtonClick = () => setShowPassword(!showPassword);
	const [isSignUp, setIsSignUp] = useState(false);
	const [isDriver, setIsDriver] = useState(false);
	return (
		<Layout>
			<Grid
				sx={{ width: "100%", height: "100%" }}
				templateColumns="2fr 5fr"
				gap={"24px"}
			>
				<GridItem>
					<Box mb={6} p={4} bg="white" borderRadius={20} boxShadow="md">
						<Formik
							initialValues={{
								email: "",
								password: "",
								firstName: "",
								lastName: "",
								phoneNumber: "",
								role: "Commuter",
							}}
							onSubmit={(values, { setSubmitting }) => {
								setSubmitting(false);
								console.log(values);
							}}
						>
							{({ handleSubmit, handleChange, errors, isSubmitting }) => {
								return (
									<form onSubmit={handleSubmit}>
										<Stack spacing={5}>
											<Box>
												<Text fontSize={"2xl"} fontWeight="bold">
													{isSignUp ? "Sign Up" : "Login"}
												</Text>
												{isSignUp ? (
													<Text>
														Already have a account?{" "}
														<Button
															onClick={() => setIsSignUp(false)}
															variant={"link"}
														>
															Login
														</Button>
													</Text>
												) : (
													<Text>
														New here?{" "}
														<Button
															onClick={() => setIsSignUp(true)}
															variant={"link"}
														>
															Sign Up
														</Button>
													</Text>
												)}
											</Box>

											<Box as="label" htmlFor="email">
												<Text mb={1}>Email</Text>
												<Input
													onChange={handleChange}
													type="email"
													name="email"
													id={"email"}
													placeholder="bernard@example.com"
													size="md"
												/>
											</Box>

											<Box as="label" htmlFor="password">
												<Text mb={1}>Password</Text>
												<InputGroup size="md">
													<Input
														onChange={handleChange}
														id="password"
														pr="4.5rem"
														type={showPassword ? "text" : "password"}
														name="password"
														placeholder="Password"
													/>
													<InputRightElement width="4.5rem">
														<Button
															h="1.75rem"
															size="sm"
															onClick={handlePasswordShowButtonClick}
														>
															{showPassword ? "Hide" : "Show"}
														</Button>
													</InputRightElement>
												</InputGroup>
											</Box>
											<Collapse in={isSignUp}>
												<Stack spacing={5}>
													<HStack spacing={3}>
														<Box as="label" htmlFor="firstName">
															<Text mb={1}>First Name</Text>
															<Input
																onChange={handleChange}
																type="text"
																name="firstName"
																id="firstName"
																placeholder="Andrew"
																size="md"
															/>
														</Box>
														<Box as="label" htmlFor="lastName">
															<Text mb={1}>Last Name</Text>
															<Input
																onChange={handleChange}
																type="text"
																name="lastName"
																id="lastName"
																placeholder="Bernard"
																size="md"
															/>
														</Box>
													</HStack>
													<Box as="label" htmlFor="phoneNumber">
														<Text mb={1}>Phone Number</Text>
														<Input
															onChange={handleChange}
															type="phone"
															name="phoneNumber"
															id={"phoneNumber"}
															placeholder="0900 000 0000"
															size="md"
														/>
													</Box>

													<RadioGroup
														onChange={(nextValue: string) => {
															setIsDriver(
																nextValue.toLocaleLowerCase() === "driver"
															);
															handleChange(nextValue);
														}}
														name="role"
													>
														<HStack>
															<Text mr={4}>I am a </Text>
															<Radio value="COMMUTER">Commuter</Radio>
															<Radio value="DRIVER">Driver</Radio>
														</HStack>
													</RadioGroup>
													<Collapse in={isDriver}>
														<Box>
															<Text mb={1}>Neighborhood </Text>
															<Select placeholder="large size" size="md" />
														</Box>
													</Collapse>
												</Stack>
											</Collapse>

											<Button
												type="submit"
												size="md"
												bg="brand"
												colorScheme={"yellow"}
												w="100%"
											>
												Submit
											</Button>
										</Stack>
									</form>
								);
							}}
						</Formik>
					</Box>
				</GridItem>
				<GridItem h="100%">
					<Box h="100%" p={6} borderRadius={"20px"} bg="white"></Box>
				</GridItem>
			</Grid>
		</Layout>
	);
};

export default Home;
