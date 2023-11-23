import React, { useState, useEffect } from 'react';
import { View, TextInput, Pressable, Image, Text } from 'react-native';
import styles from './styles';
import Divider from './Divider';

function lowerCase(s) {
    return s.toLowerCase()
}

function TranslateInputBox({ setData, fetchedData }) {
    const [assa, setAssa] = useState("")
    const [step, setStep] = useState("")
    const [safetron, setSafetron] = useState("")

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
        <View style={styles.translateInputBox}>
            <Divider />
            <Text style={styles.manufacturer}>ASSA</Text>
            <View style={[styles.input, { width: "48%" }]}>
                <Image source={require('./assets/icon-search.png')} />
                <TextInput onChangeText={setAssa} style={{ width: "100%" }} />
            </View>
            <Text style={styles.manufacturer}>Safetron</Text>
            <View style={[styles.input, { width: "48%" }]}>
                <Image source={require('./assets/icon-search.png')} />
                <TextInput onChangeText={setSafetron} style={{ width: "100%" }} />
            </View>
            <Text style={styles.manufacturer}>StepLock</Text>
            <View style={[styles.input, { width: "48%" }]}>
                <Image source={require('./assets/icon-search.png')} />
                <TextInput onChangeText={setStep} style={{ width: "100%" }} />
            </View>
            <Divider />
        </View>
    );
}

export default TranslateInputBox