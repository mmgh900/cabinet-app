import {
	Box,
	Button,
	Collapse,
	Grid,
	GridItem,
	HStack,
	Input,
	InputGroup,
	InputRightElement,
	Radio,
	RadioGroup,
	Select,
	Stack,
	Text,
	useTheme,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { ChangeEventHandler, useState } from "react";
import Layout from "../components/Layout/Layout";

import User from "../types/User";
import {
	useGetNeighborhoodsQuery,
	useLoginMutation,
	useRegisterMutation,
} from "../redux/api.slice";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { RootState } from "../redux/store";
import { setCurrentUser } from "../redux/user.reducer";
const Home: NextPage = () => {
	const [showPassword, setShowPassword] = React.useState(false);
	const handlePasswordShowButtonClick = () => setShowPassword(!showPassword);
	const [isSignUp, setIsSignUp] = useState(false);
	const [isDriver, setIsDriver] = useState(false);
	const [form, setForm] = useState<Partial<User>>({});
	const [login] = useLoginMutation();
	const [register] = useRegisterMutation();
	const { data: neighborhoods } = useGetNeighborhoodsQuery();
	const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};
	const theme = useTheme();
	const router = useRouter();
	const user = useAppSelector((state: RootState) => state.user.currentUser);
	const dispatch = useAppDispatch();
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (isSignUp) {
			if (form.email && form.password && form.role) {
				register(form as User)
					.unwrap()
					.then(({ token }) => {
						dispatch(setCurrentUser(token));
						router.push("/");
					})
					.catch((err) => {
						alert(JSON.stringify(err));
					});
			} else {
				alert("Form is incomplete" + JSON.stringify(form));
			}
		} else {
			if (form.email && form.password) {
				login({
					email: form.email,
					password: form.password,
				})
					.unwrap()
					.then(({ token }) => {
						dispatch(setCurrentUser(token));
						router.push("/");
					})
					.catch((err) => {
						if (err.status == 401) {
							alert("Wrong Credentials");
							return
						}
						alert(JSON.stringify(err));
					});
			} else {
				alert("Form is incomplete" + JSON.stringify(form));
			}
		}
	};
	if (user) {
		router.push("/");
	}
	return (
		<Layout>
			<form onSubmit={handleSubmit}>
				<Box mb={6} p={4} bg="white" borderRadius={20} boxShadow="md">
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
								required
								onChange={handleChange}
								value={form.email}
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
									required
									value={form.password}
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
											required={isSignUp}
											value={form.firstName}
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
											required={isSignUp}
											value={form.lastName}
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
										required={isSignUp}
										value={form.phoneNumber}
										onChange={handleChange}
										type="phone"
										name="phoneNumber"
										id={"phoneNumber"}
										placeholder="0900 000 0000"
										size="md"
									/>
								</Box>

								<RadioGroup
									value={form.role}
									onChange={(nextValue: string) => {
										setIsDriver(nextValue.toLocaleLowerCase() === "driver");
										setForm({
											...form,
											role: nextValue.toUpperCase() as
												| "DRIVER"
												| "COMMUTER",
										});
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
										<Text mb={1}>Working Neighborhoods </Text>
										<select
											style={{ width: "100%", border: "1px solid grey" }}
											required={isSignUp && isDriver}
											multiple
											onChange={(event) => {
												setForm({
													...form,
													neighborhoods: Array.from(
														event.target.selectedOptions
													).map((option) => parseInt(option.value)),
												});
											}}
											name="neighborhoods"
											id="neighborhoods"
										>
											{neighborhoods?.map((neighborhood) => (
												<option
													key={neighborhood.id}
													value={neighborhood.id}
												>
													{neighborhood.name}
												</option>
											))}
										</select>
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
				</Box>
			</form>
		</Layout>
	);
};

export default Home;
