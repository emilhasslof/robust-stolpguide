import { React, useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, FlatList, Pressable, Text } from 'react-native';

function Dropdown({ options, inputPosition, inputString }) {
    const [dropdownStyle, setDropdownStyle] = useState({})
    const [data, setData] = useState(options)
    console.log("rendring dropdown. Position: ", inputPosition)

    useEffect(() => {
        setData(options.filter(option => option.toLowerCase().includes(inputString.toLowerCase())))
    }, [inputString])

    const handlePress = (item) => {
        console.log("pressed" + item)
    }
    const styles = StyleSheet.create({
        container: {
            position: "absolute",
            height: 250,
            width: inputPosition.width,
            left: inputPosition.x,
            top: inputPosition.y + inputPosition.height,
            backgroundColor: "white",
            borderRadius: 10,
            borderBlockColor: "black",
            borderWidth: 1,
            zIndex: 1,
        },
        flatlist: {
            flex: 1,
        },
        text: {
            fontSize: 12,
        },
        listItem: {
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: 40,
            borderWidth: 1,
            backgroundColor: "lightgrey",
            marginTop: 5,
        }

    })

    return (
        <View style={styles.container}>
            <FlatList
                nestedScrollEnabled={true}
                style={styles.flatlist}
                data={data}
                horizontal={false}
                renderItem={({ item }) =>
                    <Pressable
                        onPress={() => handlePress(item)}>
                        <View style={styles.listItem}>
                            <Text style={styles.text}>{item}</Text>
                        </View>
                    </Pressable>}
                keyExtractor={item => item}
            />

        </View >
    );
}


export default Dropdown;