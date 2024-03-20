import React from 'react'
import { Pressable, Image } from 'react-native'

function ClearInputButton({ textInputRef, clearInput }) {
    return (
        <Pressable
            onPress={() => {
                if (textInputRef.current) {
                    //textInputRef.current.focus()
                    textInputRef.current.clear()
                    clearInput()
                }
            }}
            style={{
                position: 'absolute',
                right: 5,
                height: 25,
                width: 25
            }}
        >
            <Image
                source={require('./assets/icon-remove.png')}
                resizeMode="contain"
                style={{
                    height: 25,
                    width: 25
                }}
            />
        </Pressable>
    )
}

export default ClearInputButton
