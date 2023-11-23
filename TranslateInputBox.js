import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Pressable, Image, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import Divider from './Divider';

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

    useEffect(() => {
        console.log("translating")
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
        <View style={styles.translateInputBox}>
            <Divider />

            {/* ASSA */}
            <Text style={styles.manufacturer}>ASSA</Text>
            <View style={[styles.input, { width: "48%" }]}>
                <Image source={require('./assets/icon-search.png')} />
                <TouchableOpacity
                    onPress={() => {
                        console.log("assaRef.current.focus()")
                        assaRef.current.focus()
                    }}
                    hitSlop={{ top: 20, bottom: 20, left: 50 }}
                    style={{ width: "100%" }} >
                    <TextInput onChangeText={setAssa} style={{ width: "100%" }} ref={assaRef} />
                </TouchableOpacity>
                {assa.length > 0 && <Pressable
                    onPress={() => { setAssa("") }} style={{ position: "absolute", right: 0, top: 0 }}>
                    <Image source={require('./assets/icon-remove.png')} />
                </Pressable>}
            </View>

            {/* SAFETRON */}
            <Text style={styles.manufacturer}>Safetron</Text>
            <View style={[styles.input, { width: "48%" }]}>
                <Image source={require('./assets/icon-search.png')} />
                <Pressable
                    onPress={() => { safetronRef.current.focus() }}
                    hitSlop={{ top: 20, bottom: 20, left: 50 }} >
                    <TextInput onChangeText={setSafetron} style={{ width: "100%" }} ref={safetronRef} />
                </Pressable>
            </View>

            {/* STEPLOCK */}
            <Text style={styles.manufacturer}>StepLock</Text>
            <View style={[styles.input, { width: "48%" }]}>
                <Image source={require('./assets/icon-search.png')} />
                <Pressable
                    onPress={() => { stepRef.current.focus() }}
                    hitSlop={{ top: 20, bottom: 20, left: 50 }} >
                    <TextInput onChangeText={setStep} style={{ width: "100%" }} ref={stepRef} />
                </Pressable>
            </View>
            <Divider />
        </View>
    );
}

export default TranslateInputBox