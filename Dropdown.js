import { React, useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

function Dropdown({ options, inputPosition }) {
    const [dropdownStyle, setDropdownStyle] = useState({})
    console.log("rendring dropdown. Position: ", inputPosition)

    return (
        <View style={{
            position: "absolute",
            height: 200,
            width: 200,
            left: inputPosition.x,
            top: inputPosition.y,
            backgroundColor: "red",
            zIndex: 1,
        }}>

        </View>
    );
}

export default Dropdown;