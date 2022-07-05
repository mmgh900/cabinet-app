import {
    Badge,
    Box,
    Button,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Select,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text
} from "@chakra-ui/react";
import {FaHistory} from "react-icons/fa";
import React, {ChangeEventHandler, useState} from "react";
import {useGetNeighborhoodsQuery, useRequestCommuteMutation} from "../../redux/api.slice";
import {CommuteRequest} from "../../types/Commute";

export default function CommuterPage() {
    const {data: neighborhoods} = useGetNeighborhoodsQuery();

    const [form, setForm] = useState<Partial<CommuteRequest>>({
        destinationDetails: "",
        destinationNeighborhoodId: neighborhoods ? neighborhoods[0].id : 1,
        destinationId: undefined,
        originDetails: "",
        originId: undefined,
        originNeighborhoodId: neighborhoods ? neighborhoods[0].id : 1,
        price: "",

    });
    const [request] = useRequestCommuteMutation()
    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        request(form as CommuteRequest)
            .unwrap()
            .then(() => {
                console.log("requested");
            })
            .catch(error => {
                alert(error.message);
            })
    };
    return (
        <form onSubmit={handleSubmit}>
            <Box mb={6}
                 p={4}
                 bg="white"
                 borderRadius={20}
                 boxShadow="md"
            >
                <Stack spacing={5}>
                    <Box>
                        <Text fontSize={"2xl"}
                              fontWeight="bold"
                        >
                            Request Commute
                        </Text>
                    </Box>
                    <Tabs variant="soft-rounded"
                          colorScheme="green"
                    >
                        <Tabs size="md"
                              isFitted
                              variant="line"
                        >
                            <TabList mb={5}>
                                <Tab>Origin</Tab>
                                <Tab>Destination</Tab>
                                <Tab>Price</Tab>
                            </TabList>
                            <TabPanels minHeight={300}>
                                <TabPanel>
                                    <Stack spacing={5}>
                                        <FormControl>
                                            <FormLabel htmlFor="originNeighborhoodId">Neighborhood</FormLabel>
                                            <Select id={"originNeighborhoodId"}
                                                    name={"originNeighborhoodId"}
                                                    value={form.originNeighborhoodId}
                                                    onChange={handleChange}
                                            >
                                                {neighborhoods?.map((neighborhood) => (
                                                    <option
                                                        key={neighborhood.id}
                                                        value={neighborhood.id}
                                                    >
                                                        {neighborhood.name}
                                                    </option>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel htmlFor="originDetails">Details</FormLabel>
                                            <Input onChange={handleChange}
                                                   value={form.originDetails}
                                                   name={"originDetails"}
                                                   id="originDetails"
                                                   type="text"
                                            />
                                        </FormControl>
                                        <Flex alignItems={"center"}
                                              px={3}
                                        >
                                            <FaHistory size={20}/>
                                            <Box ml={5}>
                                                <Text fontSize={18}
                                                      fontWeight={"bold"}
                                                >
                                                    Sanabad
                                                    <Badge ml={2}>Recent Address</Badge>
                                                </Text>
                                                <Text fontSize={16}>
                                                    12 Azadi Street, Mashhad
                                                </Text>
                                            </Box>
                                        </Flex>

                                        <Divider/>
                                    </Stack>
                                </TabPanel>
                                <TabPanel>
                                    <Stack spacing={5}>
                                        <FormControl>
                                            <FormLabel htmlFor="destinationNeighborhoodId">Neighborhood</FormLabel>
                                            <Select onChange={handleChange}
                                                    value={form.destinationNeighborhoodId}
                                                    id={"destinationNeighborhoodId"}
                                                    name={"destinationNeighborhoodId"}
                                            >
                                                {neighborhoods?.map((neighborhood) => (
                                                    <option
                                                        key={neighborhood.id}
                                                        value={neighborhood.id}
                                                    >
                                                        {neighborhood.name}
                                                    </option>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel htmlFor="destinationDetails">Details</FormLabel>
                                            <Input value={form.destinationDetails}
                                                   onChange={handleChange}
                                                   id="destinationDetails"
                                                   name="destinationDetails"
                                                   type="text"
                                            />
                                        </FormControl>
                                        <Flex alignItems={"center"}
                                              px={3}
                                        >
                                            <FaHistory size={20}/>
                                            <Box ml={5}>
                                                <Text fontSize={18}
                                                      fontWeight={"bold"}
                                                >
                                                    Sanabad
                                                    <Badge ml={2}>Recent Address</Badge>
                                                </Text>
                                                <Text fontSize={16}>
                                                    12 Azadi Street, Mashhad
                                                </Text>
                                            </Box>
                                        </Flex>

                                        <Divider/>
                                    </Stack>
                                </TabPanel>
                                <TabPanel>
                                    <Stack spacing={5}>
                                        <FormControl>
                                            <FormLabel htmlFor="price">Suggested Price</FormLabel>
                                            <Input required value={form.price} onChange={handleChange} id="price"
                                                   name="price"
                                                   type="number"
                                                   max={100}
                                            />
                                        </FormControl>
                                    </Stack>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Tabs>

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
    )
}