import React from 'react';
import { View, Text, Image } from 'react-native';

const Faceplate = React.memo(({ modell, blueprintUrl }) => {
    const [imageHeight, setImageHeight] = React.useState(0);

    const handleImageLayout = (event) => {
        setImageHeight(event.nativeEvent.layout.height);
    };

    return (
        <View
            style={{
                borderColor: '#ECC091',
                backgroundColor: '#F8F8F8',
                borderRadius: 10,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                height: imageHeight,
                padding: 5,
                alignSelf: 'center',
                marginBottom: 15,
            }}
        >
            <Image
                source={{ uri: blueprintUrl }}
                style={{
                    height: 450,
                    width: 250,
                }}
                resizeMode="cover"
                onLayout={(event) => handleImageLayout(event)}
            />
        </View>
    );
});

export default Faceplate;

