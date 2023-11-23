import React from "react";
import { View, Text, Image, Dimensions } from "react-native";

function Faceplate({ modell, blueprintUrl }) {
    return (
        <View style={{
            borderColor: "#ECC091",
            borderWidth: 2,
            borderRadius: 10,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
            height: Dimensions.get("window").height / 1.2,
            width: "90%",
            padding: 20,
            alignSelf: "center",
            marginBottom: 15,
        }}>
            <Text style={{
                color: "black",
                fontSize: 35,
                zIndex: 1,
            }}>{modell}</Text>
            <Image
                source={{ uri: blueprintUrl }}
                style={{
                    height: "90%",
                    width: "90%",
                }}
                resizeMode="cover"
            />
        </View>
    );
}

export default Faceplate