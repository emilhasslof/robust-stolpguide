import { StyleSheet, Dimensions } from 'react-native'

const colors = {
    divider: '#8FAECF',
    darkBlue: '#004691',
    searchFieldBackground: '#E4E4E3',
    faceplateBorder: '#ECC091',
    test: '#0000FF30'
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: colors.darkBlue,
        marginTop: 0,
    },
    headerFiller: {
        backgroundColor: 'searchFieldBackground',
    },
    logo: {
        width: '50%',
        height: 50,
        marginTop: 30,
        marginLeft: '6%',
        marginBottom: 10,
    },
    container: {
        height: '100%',
        backgroundColor: '#fff'
    },
    divider: {
        width: '100%',
        height: 2,
        backgroundColor: colors.divider
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        width: Dimensions.get('window').width,
        height: 10,
        backgroundColor: colors.darkBlue
    },
    model: {
        paddingTop: 50,
        color: 'black',
        fontSize: 35
    },
    searchBox: {
        backgroundColor: colors.searchFieldBackground,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    input: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        width: '40%',
        borderRadius: 20,
        padding: 8,
        marginHorizontal: '4%',
        marginVertical: '2%',
        shadowColor: 'black',
        shadowOffset: {
            width: 4,
            height: 4
        },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 3
    },
    resultTextContainer: {
        backgroundColor: colors.searchFieldBackground,
    },
    resultText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        letterSpacing: 2,
        color: colors.darkBlue,
        marginBottom: 10
    },
    loadingText: {
        textAlign: 'left',
        fontSize: 40,
        fontWeight: '200',
        margin: 10,
        marginBottom: 30
    },
    manufacturer: {
        color: colors.darkBlue,
        letterSpacing: 2,
        textAlign: 'center',
        textAlignVertical: 'center',
        width: '40%',
        fontSize: 18,
        fontWeight: '400',
        marginLeft: '4%',
        marginVertical: '3%'
    }
})

export default styles
