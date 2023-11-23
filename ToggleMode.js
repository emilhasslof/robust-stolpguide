import React, { useRef, useEffect } from "react";
import { View, Text, Pressable, Animated, Dimensions } from "react-native";
import styles from "./styles";

function ToggleMode({ setSearchMode, searchMode }) {
    return (
        <Pressable
            style={styles.toggleMode}
            onPress={() => {
                setSearchMode(!searchMode);
            }}
        >
            <ModeMarker searchMode={searchMode} />
            <Text style={[styles.sök, { color: searchMode ? "white" : "black" }]}>Sök</Text>
            <Text style={[styles.översätt, { color: searchMode ? "black" : "white" }]}>Översätt</Text>
        </Pressable >
    );
}

// Animated marker that indicates which mode is active
function ModeMarker({ searchMode }) {
    const markerPosition = useRef(new Animated.Value(0)).current;
    const markerWidth = Dimensions.get("window").width / 2;
    const markerHeight = "100%"
    const markerStyle = {
        position: "absolute",
        width: markerWidth,
        height: markerHeight,
        backgroundColor: "#004691",
        borderRadius: 50,
        top: 0,
        left: 0,
        //shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        //elevation: 5, // for Android
    };
    const markerAnimation = Animated.timing(markerPosition, {
        toValue: searchMode ? 0 : markerWidth,
        duration: 200,
        useNativeDriver: true,
    });
    useEffect(() => {
        markerAnimation.start();
    }, [searchMode]);
    return (
        <Animated.View style={[markerStyle, { transform: [{ translateX: markerPosition }] }]} />
    );
}

export default ToggleMode;