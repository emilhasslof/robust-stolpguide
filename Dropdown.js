import { React, useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

function Dropdown({ options, inputPosition }) {
    const [dropdownStyle, setDropdownStyle] = useState({})
    console.log("rendring dropdown. Position: ", inputPosition)

    return (
        <View style={{
            position: "absolute",
            height: 300,
            width: inputPosition.width,
            left: inputPosition.x,
            top: inputPosition.y + inputPosition.height,
            backgroundColor: "white",
            borderRadius: 10,
            borderBlockColor: "black",
            borderWidth: 1,
            zIndex: 1,
        }}>

        </View>
    );
}

export default Dropdown;