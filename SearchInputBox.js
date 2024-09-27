import React, { useState, useEffect, useRef } from 'react'
import { View, TextInput, Pressable, Image, Text, Platform } from 'react-native'
import styles from './styles'
import Divider from './Divider'
import ClearInputButton from './ClearInputButton'
import Dropdown from './Dropdown'

// Renders input fields for search parameters and updates
// data array with search results
function SearchInputBox({ data, setData, fetchedData, showResults, setShowResults, flatListRef }) {
    const [parameters, setParameters] = useState({
        höjd: '',
        bredd: '',
        elslutbleck: '',
        karmprofil: '',
        modell: '',
        plösmått: ''
    })

    const setParameter = (key, value) => {
        setParameters({ ...parameters, [key]: value })
    }

    function lowerCase(s) {
        return s.toLowerCase()
    }

    useEffect(() => {
        const filteredData = fetchedData.filter((plate) => {
            return (
                plate.karmprofil.map(lowerCase).some((item) => {
                    return item.includes(parameters.karmprofil.toLowerCase())
                }) &&
                plate.höjd.includes(parameters.höjd.replace(/[^0-9.,]/g, '')) &&
                plate.bredd.includes(parameters.bredd.replace(/[^0-9.,]/g, '')) &&
                plate.elslutbleck.toLowerCase().includes(parameters.elslutbleck.toLowerCase()) &&
                plate.modell.toLowerCase().includes(parameters.modell.toLowerCase()) &&
                plate.plösmått.includes(parameters.plösmått.replace(/[^0-9.,]/g, ''))
            )
        })

        setData(filteredData)
    }, [parameters])

    const inputFields = [
        { name: 'höjd', numeric: true },
        { name: 'bredd', numeric: true },
        { name: 'elslutbleck', numeric: false },
        { name: 'karmprofil', numeric: false },
        { name: 'modell', numeric: false },
        { name: 'plösmått', numeric: true }
    ]

    // Need a reference for each field to be able to focus it
    inputFields.forEach((field) => {
        field.ref = React.createRef()
    })

    // Uses ref to focus the input field when the user clicks on the TouchableOpacity wrapper
    const focusTextInput = (index) => {
        inputFields[index].ref.current.focus()
    }

    // state necessary for rendering dropdown
    const [showDropdown, setShowDropdown] = useState(false)
    const focusedInputFieldRef = useRef(null)
    const [inputPositions, setInputPositions] = useState({
        höjd: { x: 0, y: 0, width: 0, height: 0 },
        bredd: { x: 0, y: 0, width: 0, height: 0 },
        elslutbleck: { x: 0, y: 0, width: 0, height: 0 },
        karmprofil: { x: 0, y: 0, width: 0, height: 0 },
        modell: { x: 0, y: 0, width: 0, height: 0 },
        plösmått: { x: 0, y: 0, width: 0, height: 0 }
    })
    const setInputPosition = (key, value) => {
        setInputPositions({ ...inputPositions, [key]: value })
    }
    const [focusedInputPosition, setFocusedInputPosition] = useState({ x: 0, y: 0, width: 0, height: 0 })
    const stateSetterRef = useRef()
    const [isScrolling, setIsScrolling] = useState(false)

    // state for dropdown options
    const [optionsMap, setOptionsMap] = useState(() => {
        const initialMap = {}
        inputFields.forEach((field) => {
            initialMap[field.name] = extractOptions(field.name)
        })
        return initialMap
    })

    useEffect(() => {
        map = {}
        inputFields.forEach((field) => {
            map[field.name] = extractOptions(field.name)
        })
        setOptionsMap(map)
    }, [data])

    function extractOptions(parameter) {
        let parametersEmpty = Object.values(parameters).every((value) => value === '')
        const source = parametersEmpty ? fetchedData : data
        result = source
            .map((robustPlate) => robustPlate[parameter])
            .flat()
            .filter((item) => item != '')
            .filter((item, index, array) => array.indexOf(item) === index)
            .sort()
        if (parameterIsNumerical(parameter)) {
            result = result.map((item) => item.replace(',', '.'))
            result = result.sort((a, b) => parseFloat(a) - parseFloat(b))
        }
        return result
    }
    function parameterIsNumerical(parameter) {
        return ['höjd', 'bredd', 'plösmått'].includes(parameter)
    }

    const [options, setOptions] = useState([])
    const [inputString, setInputString] = useState('')

    return (
        <View style={{ height: showResults ? 'auto' : 900 }}>
            <View style={styles.searchBox}>
                <Divider />
                {showDropdown && (
                    <Dropdown
                        options={options}
                        inputPosition={focusedInputPosition}
                        inputString={inputString}
                        choiceCallback={(item) => {
                            focusedInputFieldRef.current.setNativeProps({ text: item })
                            focusedInputFieldRef.current.blur()
                            stateSetterRef.current(item)
                            setShowDropdown(false)
                            setShowResults(true)
                        }}
                        setIsScrolling={setIsScrolling}
                    />
                )}
                {inputFields.map((field, index) => (
                    <View
                        style={styles.input}
                        key={index}
                        onLayout={(event) => {
                            const layout = event.nativeEvent.layout
                            setInputPosition(field.name, layout)
                        }}
                    >
                        <Image source={require('./assets/icon-search.png')} />
                        <Pressable
                            onPress={() => focusTextInput(index)}
                            hitSlop={{ top: 20, bottom: 20, left: 50 }}
                            style={{ width: '100%' }}
                        >
                            <TextInput
                                style={{ width: '70%' }}
                                ref={field.ref}
                                keyboardType={field.numeric ? 'numeric' : 'default'}
                                spellCheck={false}
                                autoCorrect={false}
                                onChangeText={(text) => {
                                    setParameter(field.name, text)
                                    setInputString(text)
                                }}
                                value={parameters[field.name]}
                                placeholder={
                                    field.name === 'modell'
                                        ? 'Mont. stolpe'
                                        : field.name.charAt(0).toUpperCase() + field.name.slice(1)
                                }
                                onFocus={() => {
                                    setShowDropdown(true)
                                    setShowResults(false)
                                    setFocusedInputPosition(inputPositions[field.name])
                                    setInputString(parameters[field.name])
                                    setOptions(optionsMap[field.name])
                                    focusedInputFieldRef.current = field.ref.current
                                    stateSetterRef.current = (item) => setParameter(field.name, item)
                                    flatListRef.current.scrollToOffset({ animated: true, offset: 150 })
                                }}
                                onBlur={() => {
                                    if(!isScrolling) {
                                        setShowDropdown(false)
                                        setShowResults(true)
                                    } else if(Platform.OS === 'ios') {
                                        setTimeout(() => focusedInputFieldRef.current.focus(), 800)
                                    }
                                }}
                            />
                        </Pressable>
                        {parameters[field.name] != '' && (
                            <ClearInputButton
                                textInputRef={field.ref}
                                clearInput={() => {
                                    setParameter(field.name, '')
                                }}
                            />
                        )}
                    </View>
                ))}
                <Divider />
            </View>
        </View>
    )
}

export default SearchInputBox
