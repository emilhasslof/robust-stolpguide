import React from 'react'
import { View, Text, Image, Dimensions } from 'react-native'

function Faceplate({ modell, blueprintUrl }) {
    return (
        <View
            style={{
                borderColor: '#ECC091',
                backgroundColor: '#F8F8F8',
                borderWidth: 2,
                borderRadius: 10,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                height: 550,
                //height: Dimensions.get('window').height / 1.2,
                //width: '90%',
                padding: 5,
                alignSelf: 'center',
                marginBottom: 15
            }}
        >
            <Text
                style={{
                    color: 'black',
                    fontSize: 30
                }}
            >
                {modell}
            </Text>
            <Image
                source={{ uri: blueprintUrl }}
                style={{
                    height: 450,
                    width: 250
                }}
                resizeMode="cover"
            />
        </View>
    )
}

export default Faceplate
