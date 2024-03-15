import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Pressable, Image, Text, TouchableOpacity, Modal, Dimensions } from 'react-native';
import styles from './styles';
import Divider from './Divider';
import ClearInputButton from './ClearInputButton';
import Dropdown from './Dropdown';

function lowerCase(s) {
    return s.toLowerCase()
}

function TranslateInputBox({ setData, fetchedData, showResults, setShowResults }) {
    // state for text entered into each input field
    const [assa, setAssa] = useState("")
    const [safetron, setSafetron] = useState("")
    const [step, setStep] = useState("")

    // refs for each textInput
    const assaRef = useRef()
    const safetronRef = useRef()
    const stepRef = useRef()
    const stateSetterRef = useRef()

    // state necessary for rendering dropdown
    const [showDropdown, setShowDropdown] = useState(false)
    const focusedInputFieldRef = useRef(null)
    const [inputPositions, setInputPositions] = useState({
        assa: { x: 0, y: 0, width: 0, height: 0 },
        safetron: { x: 0, y: 0, width: 0, height: 0 },
        step: { x: 0, y: 0, width: 0, height: 0 },
    })
    const setInputPosition = (key, value) => {
        setInputPositions({ ...inputPositions, [key]: value })
    }
    const [focusedInputPosition, setFocusedInputPosition] = useState({ x: 0, y: 0, width: 0, height: 0 })

    // state for dropdown options
    const assaOptions = extractOptions("assa")
    const safetronOptions = extractOptions("safetron")
    const stepOptions = extractOptions("step")
    function extractOptions(manufacturer) {
        return fetchedData.map(robustPlate => robustPlate[manufacturer])
            .flat()
            .filter(item => item != "")
            .filter((item, index, array) => array.indexOf(item) === index)
            .sort()
    }

    const [options, setOptions] = useState([])
    const [inputString, setInputString] = useState("")


    useEffect(() => {
        const matchingPlates = fetchedData.filter(plate => {
            return (
                plate.assa.map(lowerCase).some((item) => { return item.includes(assa.toLowerCase()) }) &&
                plate.step.map(lowerCase).some((item) => { return item.includes(step.toLowerCase()) }) &&
                plate.safetron.map(lowerCase).some((item) => { return item.includes(safetron.toLowerCase()) })
            )
        })

        matchingPlates.forEach(plate => {
            if (assa != "" && plate.assa.map(lowerCase).some((item) => { return item.includes(assa.toLowerCase()) })) {
                plate.translationMatch = plate.assa;
            } else if (step != "" && plate.step.map(lowerCase).some((item) => { return item.includes(step.toLowerCase()) })) {
                plate.translationMatch = plate.step;
            } else if (safetron != "" && plate.safetron.map(lowerCase).some((item) => { return item.includes(safetron.toLowerCase()) })) {
                plate.translationMatch = plate.safetron;
            }
        });
        setData(matchingPlates)

    }, [assa, step, safetron])

    return (
        <View>
            <View style={[styles.searchBox, { height: showResults ? "auto" : 700 }]} >
                {/*<View style={styles.searchBox} >*/}
                <Divider />
                {showDropdown && <Dropdown
                    options={options}
                    inputPosition={focusedInputPosition}
                    inputString={inputString}
                    choiceCallback={(item) => {
                        setShowDropdown(false)
                        focusedInputFieldRef.current.setNativeProps({ text: item })
                        focusedInputFieldRef.current.blur()
                        stateSetterRef.current(item)
                    }}
                />
                }

                {/* ASSA */}
                <Text style={styles.manufacturer}>ASSA</Text>
                <View style={[styles.input, { width: "48%" }]}
                    onLayout={(event) => {
                        setInputPosition("assa", event.nativeEvent.layout)
                    }}>
                    <Image source={require('./assets/icon-search.png')} />
                    <Pressable
                        onPress={() => { assaRef.current.focus() }}
                        hitSlop={{ top: 20, bottom: 20, left: 50 }}
                        style={{ width: "100%" }} >
                        <TextInput
                            onChangeText={(text) => {
                                setAssa(text)
                                setInputString(text)
                            }}
                            style={{ width: "100%" }}
                            ref={assaRef}
                            autoCorrect={false}
                            spellCheck={false}
                            onFocus={() => {
                                setShowDropdown(true)
                                setOptions(assaOptions)
                                setFocusedInputPosition(inputPositions.assa)
                                focusedInputFieldRef.current = assaRef.current
                                stateSetterRef.current = setAssa
                                setShowResults(false)
                            }}
                            onBlur={() => {
                                setShowDropdown(false)
                                setShowResults(true)
                            }}
                        />
                    </Pressable>
                    {assa.length != "" && <ClearInputButton
                        textInputRef={assaRef}
                        clearInput={() => {
                            setAssa("")
                            setInputString("")
                        }} />}
                </View>

                {/* SAFETRON */}
                <Text style={styles.manufacturer}>Safetron</Text>
                <View style={[styles.input, { width: "48%" }]}
                    onLayout={(event) => {
                        setInputPosition("safetron", event.nativeEvent.layout)
                    }}>
                    <Image source={require('./assets/icon-search.png')} />
                    <Pressable
                        onPress={() => { safetronRef.current.focus() }}
                        hitSlop={{ top: 20, bottom: 20, left: 50 }}
                        style={{ width: "100%" }} >
                        <TextInput
                            autoCorrect={false}
                            spellCheck={false}
                            onChangeText={(text) => {
                                setSafetron(text)
                                setInputString(text)
                            }}
                            style={{ width: "100%" }}
                            ref={safetronRef}
                            onFocus={() => {
                                setShowDropdown(true)
                                setOptions(safetronOptions)
                                setFocusedInputPosition(inputPositions.safetron)
                                focusedInputFieldRef.current = safetronRef.current
                                stateSetterRef.current = setSafetron
                                setShowResults(false)
                            }}
                            onBlur={() => {
                                setShowDropdown(false)
                                setShowResults(true)
                            }}
                        />
                    </Pressable>
                    {safetron.length != "" &&
                        <ClearInputButton
                            textInputRef={safetronRef}
                            clearInput={() => {
                                setSafetron("")
                                setInputString("")
                            }} />}
                </View>

                {/* STEPLOCK */}
                <Text style={styles.manufacturer}>StepLock</Text>
                <View style={[styles.input, { width: "48%" }]}
                    onLayout={(event) => {
                        setInputPosition("step", event.nativeEvent.layout)
                    }}>
                    <Image source={require('./assets/icon-search.png')} />
                    <Pressable
                        onPress={() => { stepRef.current.focus() }}
                        hitSlop={{ top: 20, bottom: 20, left: 50 }}
                        style={{ width: "100%" }} >
                        <TextInput
                            autoCorrect={false}
                            spellCheck={false}
                            onChangeText={(text) => {
                                setStep(text)
                                setInputString(text)
                            }}
                            style={{ width: "100%" }}
                            ref={stepRef}
                            onFocus={() => {
                                setShowDropdown(true)
                                setOptions(stepOptions)
                                setFocusedInputPosition(inputPositions.step)
                                focusedInputFieldRef.current = stepRef.current
                                stateSetterRef.current = setStep
                                setShowResults(false)
                            }}
                            onBlur={() => {
                                setShowDropdown(false)
                                setShowResults(true)
                            }}
                        />
                    </Pressable>
                    {step.length != "" &&
                        <ClearInputButton
                            textInputRef={stepRef}
                            clearInput={() => {
                                setStep("")
                                setInputString("")
                            }} />}
                </View>
                {showResults && <Divider />}
            </View>
        </View >
    )
}


export default TranslateInputBox