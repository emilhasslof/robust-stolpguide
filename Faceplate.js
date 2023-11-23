import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";

function Faceplate({ modell, blueprintUrl }) {
    return (
        <View style={styles.faceplate}>
            <Text style={styles.model}>{modell}</Text>
            <Image
                source={{ uri: blueprintUrl }}
                style={styles.blueprint}
                resizeMode="contain"
            />
        </View>
    );
}

export default Faceplate