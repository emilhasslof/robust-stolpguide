import { React, useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, FlatList, Pressable } from 'react-native';

function Dropdown({ options, inputPosition, inputString }) {
    const [dropdownStyle, setDropdownStyle] = useState({})
    const [data, setData] = useState(options)
    console.log("rendring dropdown. Position: ", inputPosition)

    useEffect(() => {
        setData(options.filter(option => option.toLowerCase().includes(inputString.toLowerCase())))
    }, [inputString])

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
            <FlatList
                data={data}
                renderItem={({ item }) =>
                    <Pressable
                        onPress={handlePress}>
                        <Text>{item}</Text>
                    </Pressable>}
                keyExtractor={item => item}
            />

        </View>
    );
}

export default Dropdown;