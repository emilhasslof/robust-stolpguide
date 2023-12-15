import { React, useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, FlatList, Pressable, Text } from 'react-native';

function Dropdown({ options, inputPosition, inputString, choiceCallback }) {
    const [data, setData] = useState(options)

    // Listen for user input and update options to match it
    useEffect(() => {
        setData(options.filter(option => option.toLowerCase().includes(inputString.toLowerCase())))
    }, [inputString])

    const handlePress = (item) => {
        choiceCallback(item)
    }
    const containerHeight = Math.min(data.length * 30, 500)
    const styles = StyleSheet.create({
        container: {
            position: "absolute",
            height: containerHeight,
            overflow: "hidden",
            width: inputPosition.width - 20,
            left: inputPosition.x + 10,
            top: inputPosition.y + inputPosition.height,
            backgroundColor: "white",
            borderBlockColor: "black",
            borderWidth: 1,
            zIndex: 1,
        },
        flatlist: {
            flex: 1,
            alignContent: "center",
        },
        text: {
            fontSize: 12,
            textAlign: "center",
        },
        listItem: {
            justifyContent: "center",
            alignItems: "center",
            width: "90%",
            height: 30,
            marginHorizontal: "5%",
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