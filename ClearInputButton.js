import React from 'react'
import { Pressable, Image } from 'react-native'

function ClearInputButton({ text_input_ref, clear_input }) {
    return (
        <Pressable
            onPress={() => {
                if (text_input_ref.current) {
                    text_input_ref.current.clear()
                    clear_input()
                }
            }}
            style={{
                position: "absolute",
                right: 5,
                height: 25,
                width: 25,
            }}>
            <Image
                source={require('./assets/icon-remove.png')}
                resizeMode="contain"
                style={{
                    height: 25,
                    width: 25,
                }} />
        </Pressable>
    )
}

export default ClearInputButton