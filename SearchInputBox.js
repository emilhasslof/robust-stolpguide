import React, { useState, useEffect } from 'react';
import { View, TextInput, Pressable, Image, Text } from 'react-native';
import styles from './styles';
import Divider from './Divider';
import ClearInputButton from './ClearInputButton';

// Renders input fields for search parameters and updates 
// data array with search results
function SearchInputBox({ setData, fetchedData, setCurrFocusedInputRef }) {
    const [parameters, setParameters] = useState({
        höjd: "",
        bredd: "",
        elslutbleck: "",
        karmprofil: "",
        modell: "",
        plösmått: "",
    })

    const setParameter = (key, value) => {
        setParameters({ ...parameters, [key]: value })
    }

    useEffect(() => {
        const filteredData = fetchedData.filter(plate => {
            return (
                plate.höjd.includes(parameters.höjd.replace(/\D/g, "")) &&
                plate.bredd.includes(parameters.bredd.replace(/\D/g, "")) &&
                plate.elslutbleck.toLowerCase().includes(parameters.elslutbleck.toLowerCase()) &&
                plate.karmprofil.toLowerCase().includes(parameters.karmprofil.toLowerCase()) &&
                plate.robust.toLowerCase().includes(parameters.modell.toLowerCase()) &&
                plate.plösmått.includes(parameters.plösmått.replace(/\D/g, ""))
            )
        })

        setData(filteredData)

    }, [parameters]);


    const inputFields = [
        { name: 'höjd', numeric: true },
        { name: 'bredd', numeric: true },
        { name: 'elslutbleck', numeric: false },
        { name: 'karmprofil', numeric: false },
        { name: 'modell', numeric: false },
        { name: 'plösmått', numeric: true },
    ];

    // Need a reference for each field to be able to focus it
    inputFields.forEach(field => {
        field.ref = React.createRef()
    })

    // Uses ref to focus the input field when the user clicks on the TouchableOpacity wrapper
    const focusTextInput = (index) => {
        inputFields[index].ref.current.focus()
    }

    return (
        <View>
            <Divider />
            <View style={styles.searchBox}>
                {inputFields.map((field, index) => (
                    <View style={styles.input} key={index}>
                        <Image source={require('./assets/icon-search.png')} />
                        <Pressable
                            onPress={() => focusTextInput(index)}
                            hitSlop={{ top: 20, bottom: 20, left: 50 }}
                            style={{ width: "100%" }}>
                            <TextInput
                                ref={field.ref}
                                keyboardType={field.numeric ? 'numeric' : 'default'}
                                onChangeText={(text) => setParameter(field.name, text)}
                                value={parameters[field.name]}
                                onEndEditing={(event) => {
                                    if (field.numeric && event.nativeEvent.text != "" && !event.nativeEvent.text.includes("mm")) {
                                        console.log("onEndEditing")
                                        console.log(event.nativeEvent.text)
                                        setParameter(field.name, event.nativeEvent.text + " mm")
                                    }
                                }}
                                placeholder={field.name === "modell" ?
                                    "Mont. stolpe" : field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                            />
                        </Pressable>
                        {parameters[field.name] != "" && <ClearInputButton
                            textInputRef={field.ref}
                            clearInput={() => { setParameter(field.name, "") }} />
                        }
                    </View>
                ))}
            </View>
            <Divider />
        </View >
    );
}

export default SearchInputBox;