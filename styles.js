import { StyleSheet, Dimensions } from "react-native";


const colors = {
    divider: "#8FAECF",
    toggleBackground: "#D8E6F6",
    darkBlue: "#004691",
    searchFieldBackground: "#EEF4FB",
    faceplateBorder: "#ECC091",
    test: "red",
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "top",
    },
    toggleMode: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height / 12,
        borderRadius: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5, // for Android    
        backgroundColor: colors.toggleBackground,
        marginBottom: 10,
    },
    sök: {
        textAlign: "center",
        fontSize: 24,
        width: "50%",
    },
    översätt: {
        textAlign: "center",
        fontSize: 24,
        width: "50%",
    },
    divider: {
        width: "100%",
        height: 2,
        backgroundColor: colors.divider,
    },
    bottomBar: {
        position: "absolute",
        bottom: 0,
        width: Dimensions.get("window").width,
        height: 10,
        backgroundColor: colors.darkBlue,
    },
    faceplate: {
        borderColor: colors.faceplateBorder,
        borderWidth: 2,
        borderRadius: 10,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: Dimensions.get("window").height / 1.2,
        width: "90%",
        padding: 20,
        alignSelf: "center",
        margin: 15,
    },
    model: {
        marginTop: 20,
        color: "black",
        fontSize: 35,
    },
    blueprint: {
        width: "100%",
        height: "100%",
    },
    searchBox: {
        backgroundColor: colors.searchFieldBackground,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    input: {
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        width: "40%",
        borderRadius: 20,
        borderWidth: 2,
        padding: 5,
        marginHorizontal: '4%',
        marginVertical: '2%',
    },
    resultText: {
        textAlign: "center",
        fontSize: 40,
        fontWeight: "200",
        margin: 10,
        marginBottom: 30,
    },

});

export default styles;