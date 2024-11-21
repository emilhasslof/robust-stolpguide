import React, { useRef, useEffect } from 'react'
import { View, Text, Pressable, Animated, Dimensions, StyleSheet } from 'react-native'

function ToggleMode({ setSearchMode, searchMode }) {
    return (
        <Pressable
            style={styles.toggleMode}
            onPress={() => {
                setSearchMode(!searchMode)
            }}
        >
            <ModeMarker searchMode={searchMode} />
            <Text style={[styles.sök, { color: '#004691', letterSpacing: 2 }]}>Sök</Text>
            <Text style={[styles.översätt, { color: '#004691', letterSpacing: 2 }]}>Översätt</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    toggleMode: {
        marginBottom: 30,
        marginLeft: '10%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        height: Dimensions.get('window').height / 14,
        borderRadius: 50,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4
        },
        backgroundColor: 'white'
    },
    sök: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        width: '50%',
        zIndex: 1
    },
    översätt: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        width: '50%',
        zIndex: 1
    }
})

// Animated marker that indicates which mode is active
function ModeMarker({ searchMode }) {
    const markerPosition = useRef(new Animated.Value(0)).current
    const markerWidth = Dimensions.get('window').width * 0.4
    const markerHeight = '100%'
    const markerStyle = {
        position: 'absolute',
        width: markerWidth,
        height: markerHeight,
        backgroundColor: '#ED9A43',
        borderTopLeftRadius: searchMode ? 50 : 0,
        borderBottomLeftRadius: searchMode ? 50 : 0,
        borderTopRightRadius: searchMode ? 0 : 50,
        borderBottomRightRadius: searchMode ? 0 : 50,
        top: 0,
        left: 0,
        //shadow
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5 // for Android
    }
    const markerAnimation = Animated.timing(markerPosition, {
        toValue: searchMode ? 0 : markerWidth,
        duration: 200,
        useNativeDriver: true
    })
    useEffect(() => {
        markerAnimation.start()
    }, [searchMode])
    return <Animated.View style={[markerStyle, { transform: [{ translateX: markerPosition }] }]} />
}

export default ToggleMode
