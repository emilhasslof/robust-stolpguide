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
    const [step, setStep] = useState("")
    const [safetron, setSafetron] = useState("")
    const assaRef = useRef()
    const stepRef = useRef()
    const safetronRef = useRef()
    const parentRef = useRef()
    const [isFocused, setIsFocused] = useState(false)
    const [inputPosition, setInputPosition] = useState({})

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
            <View style={styles.translateInputBox} ref={parentRef}>
                <Divider />
                {isFocused && <Dropdown
                    options={[]}
                    inputPosition={inputPosition}
                />
                }

                {/* ASSA */}
                <Text style={styles.manufacturer}>ASSA</Text>
                <View style={[styles.input, { width: "48%" }]}>
                    <Image source={require('./assets/icon-search.png')} />
                    <Pressable
                        onPress={() => { assaRef.current.focus() }}
                        hitSlop={{ top: 20, bottom: 20, left: 50 }}
                        style={{ width: "100%" }} >
                        <TextInput
                            onChangeText={setAssa}
                            style={{ width: "100%" }}
                            ref={assaRef}
                            onFocus={() => {
                                setIsFocused(true)
                                assaRef.current.measureLayout(
                                    parentRef.current,
                                    (x, y, width, height) => {
                                        setInputPosition(
                                            { x: x, y: y, width: width, height: height }
                                        )
                                    })
                            }}
                            onBlur={() => setIsFocused(false)}
                        />
                    </Pressable>
                    {assa.length != "" && <ClearInputButton
                        textInputRef={assaRef}
                        clearInput={() => setAssa("")} />}
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
    );
}

export default TranslateInputBox