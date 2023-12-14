import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Pressable, Image, Text, TouchableOpacity, Modal } from 'react-native';
import styles from './styles';
import Divider from './Divider';
import ClearInputButton from './ClearInputButton';
import Dropdown from './Dropdown';

function lowerCase(s) {
    return s.toLowerCase()
}

function TranslateInputBox({ setData, fetchedData }) {
    const [assa, setAssa] = useState("")
    const [safetron, setSafetron] = useState("")
    const [step, setStep] = useState("")

    const assaRef = useRef()
    const safetronRef = useRef()
    const stepRef = useRef()

    const [showDropdown, setShowDropdown] = useState(false)
    const inputFieldRef = useRef(null)
    const [inputPosition, setInputPosition] = useState({ x: 0, y: 0, width: 0, height: 0 })

    const assaOptions = extractOptions("assa")
    const safetronOptions = fetchedData.map(plate => plate.safetron).flat().filter((item, index, array) => array.indexOf(item) === index).sort()
    const stepOptions = fetchedData.map(plate => plate.step).flat().filter((item, index, array) => array.indexOf(item) === index).sort()
    const [options, setOptions] = useState([])
    const [inputString, setInputString] = useState("")

    function extractOptions(manufacturer) {
        return fetchedData.map(plate => plate[manufacturer])
            .flat()
            .filter(item => item != "")
            .filter((item, index, array) => array.indexOf(item) === index)
            .sort()
    }

    useEffect(() => {
        const filteredData = fetchedData.filter(plate => {
            return (
                plate.assa.map(lowerCase).some((item) => { return item.includes(assa.toLowerCase()) }) &&
                plate.step.map(lowerCase).some((item) => { return item.includes(step.toLowerCase()) }) &&
                plate.safetron.map(lowerCase).some((item) => { return item.includes(safetron.toLowerCase()) })
            )
        })

        setData(filteredData)

    }, [assa, step, safetron])

    return (
        <View style={{ height: "auto" }}>
            <View style={styles.translateInputBox} >
                <Divider />
                {showDropdown && <Dropdown
                    options={options}
                    inputPosition={inputPosition}
                    inputString={inputString}
                    choiceCallback={(item) => {
                        setShowDropdown(false)
                        assaRef.current.setNativeProps({ text: item })
                        setAssa(item)
                    }}
                />
                }

                {/* ASSA */}
                <Text style={styles.manufacturer}>ASSA</Text>
                <View style={[styles.input, { width: "48%" }]} onLayout={(event) => { setInputPosition(event.nativeEvent.layout) }}>
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
                            onFocus={() => {
                                setShowDropdown(true)
                                setOptions(assaOptions)
                                inputFieldRef.current = assaRef
                            }}
                            onBlur={() => setShowDropdown(false)}
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
                <View style={[styles.input, { width: "48%" }]}>
                    <Image source={require('./assets/icon-search.png')} />
                    <Pressable
                        onPress={() => { safetronRef.current.focus() }}
                        hitSlop={{ top: 20, bottom: 20, left: 50 }}
                        style={{ width: "100%" }} >
                        <TextInput
                            onChangeText={setSafetron}
                            style={{ width: "100%" }}
                            ref={safetronRef}
                        />
                    </Pressable>
                    {safetron.length != "" &&
                        <ClearInputButton
                            textInputRef={safetronRef}
                            clearInput={() => setSafetron("")} />}
                </View>

                {/* STEPLOCK */}
                <Text style={styles.manufacturer}>StepLock</Text>
                <View style={[styles.input, { width: "48%" }]}>
                    <Image source={require('./assets/icon-search.png')} />
                    <Pressable
                        onPress={() => { stepRef.current.focus() }}
                        hitSlop={{ top: 20, bottom: 20, left: 50 }}
                        style={{ width: "100%" }} >
                        <TextInput
                            onChangeText={setStep}
                            style={{ width: "100%" }}
                            ref={stepRef}
                        />
                    </Pressable>
                    {step.length != "" &&
                        <ClearInputButton
                            textInputRef={stepRef}
                            clearInput={() => setStep("")} />}
                </View>
                <Divider />
            </View>
        </View>
    )
}


export default TranslateInputBox