import { React, useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

function Dropdown({ options, textInputRef }) {
    const [dropdownStyle, setDropdownStyle] = useState({})
    //console.log("rendering dropdown:", textInputRef)

    useEffect(() => {
        if (!textInputRef.current) return
        textInputRef.current.measure((x, y, width, height, pageX, pageY) => {
            setDropdownStyle({
                position: "absolute",
                top: pageY + height,
                left: pageX,
                width: width,
                height: 200,
                maxHeight: Dimensions.get("window").height / 2,
                backgroundColor: "red",
                zIndex: 1,
            })
        })
    })

    return (
        <View style={dropdownStyle}>

        </View>
    );
}

const styles = StyleSheet.create({
    dropdown: {
        position: "absolute",
        width: "40%",
        height: 200,
        maxHeight: Dimensions.get("window").height / 2,
        backgroundColor: "red",
        zIndex: 1,
    }
})

export default Dropdown;