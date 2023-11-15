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
        top: 32,
        flex: 1,
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
        margin: 10,
        backgroundColor: colors.toggleBackground,
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
        height: "5%",
        backgroundColor: colors.darkBlue,
    },
    faceplate: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "80%",
    },
    model: {
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
    }

});

export default styles;