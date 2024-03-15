import { StyleSheet, Dimensions } from "react-native";


const colors = {
    divider: "#8FAECF",
    toggleBackground: "#D8E6F6",
    darkBlue: "#004691",
    // searchFieldBackground: "#EEF4FB",
    searchFieldBackground: "#D8E6F6",
    faceplateBorder: "#ECC091",
    test: "#0000FF30",
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "#fff",
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
        paddingTop: 50,
        color: "black",
        fontSize: 35,
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
        padding: 8,
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
    loadingText: {
        textAlign: "left",
        fontSize: 40,
        fontWeight: "200",
        margin: 10,
        marginBottom: 30,
    },
    manufacturer: {
        textAlign: "left",
        textAlignVertical: "center",
        justifyContent: "center",
        width: "40%",
        fontSize: 25,
        fontWeight: "300",
        marginLeft: "4%",
    },
});

export default styles;