import {
    Badge,
    Box,
    Button,
    ButtonGroup, Center, Editable,
    EditableInput, EditablePreview,
    Flex, Heading,
    HStack,
    IconButton, Input, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack,
    Text,
    useEditableControls
} from "@chakra-ui/react";
import {FaCar, FaCarrot, FaClock, FaTaxi, FaUserAlt} from "react-icons/Fa";
import React, {useState} from "react";
import {
    useCancelCommuteMutation,
    useChangePriceMutation,
    useEndCommuteMutation,
    useGetCurrentCommuteQuery, useRateCommuteMutation
} from "../../redux/api.slice";
import {CheckIcon, CloseIcon, EditIcon} from "@chakra-ui/icons";
import {useAppSelector} from "../../redux/hooks";
import {RootState} from "../../redux/store";

export default function CommuterPage() {


    const {data: currentCommute} = useGetCurrentCommuteQuery(undefined, {
        pollingInterval: 1000,
    })
    const [cancel] = useCancelCommuteMutation()

    const [editPrice] = useChangePriceMutation()
    const [rate] = useRateCommuteMutation()
    const [end] = useEndCommuteMutation()
    const user = useAppSelector((state: RootState) => state.user.currentUser)
    const [sliderValue, setSliderValue] = useState(50)

    const labelStyles = {
        mt: '2',
        ml: '-2.5',
        fontSize: 'sm',
    }

    function EditableControls() {
        const {
            isEditing,
            getSubmitButtonProps,
            getCancelButtonProps,
            getEditButtonProps,
        } = useEditableControls()

        return isEditing ? (
            <ButtonGroup mt={5} justifyContent="center" size="lg">
                <IconButton icon={<CheckIcon/>} {...getSubmitButtonProps()} />
                <IconButton icon={<CloseIcon/>} {...getCancelButtonProps()} />
            </ButtonGroup>
        ) : (
            <ButtonGroup mt={5} justifyContent="center" size="lg">
                <Button mt={2} variant={'outline'} {...getEditButtonProps()}>
                    Edit Price
                </Button>
                <Button onClick={() => {
                    cancel({
                        id: currentCommute?.id,
                    })
                        .unwrap()
                        .catch(error => alert(JSON.stringify(error.data)))
                }} mt={2} colorScheme="red" variant={'outline'}
                >
                    Cancel
                </Button>
            </ButtonGroup>
        )
    }


    if (!currentCommute) {
        return <></>
    }
    return (
        <Box sx={{
            bg: 'white',
            p: 5,
            mb: 3,
            border: '1px solid gray',
            borderRadius: 20,
            borderColor: 'gray.200',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',

        }}
        >
            <Badge colorScheme="purple" mb={1}>{currentCommute.status}</Badge>
            <HStack mb={3} spacing={3}>
                <Text fontSize={16} fontWeight={'semibold'}>{currentCommute.origin}</Text>
                <FaTaxi/>
                <Text fontSize={16} fontWeight={'semibold'}>{currentCommute.destination}</Text>
            </HStack>

            {
                currentCommute.status !== 'Completed' ?
                    <img src={'/loading.gif'} width={500} height={400}/>
                    :
                    <Center flexDirection={'column'} p={5} width={'100%'}>
                        <Heading mb={1}>
                            Thanks for using Cabinet!
                        </Heading>
                        <Text fontSize={18} mb={5}>
                            How much did you like your commute?
                        </Text>
                        <Slider colorScheme="gray"
                                size={'lg'}
                                my={10}
                                aria-label="slider-ex-6"
                                onChange={(val) => setSliderValue(val)}
                        >

                            <SliderMark
                                value={sliderValue}
                                textAlign="center"
                                color="white"
                                ml="-5"
                                w="10"
                                fontSize={30}
                                sx={{
                                    marginTop: '-50px',
                                }}
                            >
                                {
                                    sliderValue < 10 ?
                                        '😡'
                                        :
                                        sliderValue < 50 ?
                                            '🤔'
                                            :
                                            sliderValue < 70 ?
                                                '😃'
                                                :
                                                sliderValue < 95 ?
                                                    '🤩'
                                                    :
                                                    '😍'

                                }

                            </SliderMark>
                            <SliderTrack>
                                <SliderFilledTrack/>
                            </SliderTrack>
                            <SliderThumb/>
                        </Slider>
                        <Button sx={{mt: 5}} onClick={() => {
                            rate({
                                id: currentCommute?.id,
                                score: sliderValue,
                            })
                                .unwrap()
                                .catch(error => alert(JSON.stringify(error.data)))
                        }} mt={2} colorScheme="gray" color={'white'} bg={'black'} variant={'solid'}
                        >
                            Rate commute
                        </Button>
                    </Center>
            }


            <HStack mb={1}>
                <FaUserAlt color={'gray'} fontSize={13}/>
                <Text mb={3}
                      fontWeight={'semibold'}
                      color={'gray'}
                      textTransform={'uppercase'}
                      fontSize={13}
                >{currentCommute.commuterName}</Text>
            </HStack>
            {
                currentCommute.status != "Waiting For Driver" &&
                <HStack mb={1}>
                    <FaCar color={'gray'} fontSize={13}/>
                    <Text mb={3}
                          fontWeight={'semibold'}
                          color={'gray'}
                          textTransform={'uppercase'}
                          fontSize={13}
                    >{currentCommute.driverName}</Text>
                </HStack>
            }
            <HStack mb={1}>
                <FaClock color={'gray'} fontSize={13}/>
                <Text mb={3}
                      fontWeight={'semibold'}
                      color={'gray'}
                      textTransform={'uppercase'}
                      fontSize={13}
                >{currentCommute.requestTime}</Text>
            </HStack>

            {
                currentCommute.status == "Waiting For Driver" &&
                <Flex mt={5} flexDirection={'column'} alignItems={"center"} justifyContent={'space-between'}>
                    <Editable
                        textAlign="center"
                        flexDirection={'column'}
                        onSubmit={(value) => {
                            editPrice({
                                id: currentCommute.id,
                                price: value
                            })
                                .unwrap()
                                .catch(error => alert(JSON.stringify(error.data)))
                        }}
                        defaultValue={currentCommute.price}
                        fontSize="3xl"
                        fontWeight={'bold'}
                        isPreviewFocusable={false}
                    >
                        <Box>
                            <EditablePreview/>$
                        </Box>

                        {/* Here is the custom input */}
                        <Input size={'xl'} as={EditableInput}/>
                        <EditableControls/>
                    </Editable>
                </Flex>
            }
            {
                currentCommute.status.toUpperCase() == "IN PROGRESS" && (user.role == 'Driver' ?
                        <Button sx={{mt: 5}} onClick={() => {
                            end({
                                id: currentCommute?.id,
                            })
                                .unwrap()
                                .catch(error => alert(JSON.stringify(error.data)))
                        }} mt={2} colorScheme="gray" color={'white'} bg={'black'} variant={'solid'}
                        >
                            End the commute
                        </Button>
                        :
                        <Button onClick={() => {
                            cancel({
                                id: currentCommute?.id,
                            })
                                .unwrap()
                                .catch(error => alert(JSON.stringify(error.data)))
                        }} mt={2} colorScheme="red" variant={'outline'}
                        >
                            Cancel
                        </Button>
                )
            }


        </Box>
    )

}