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
        backgroundColor: 'pink',
        marginTop: 0,
    },
    headerTop: {
        backgroundColor: colors.darkBlue,
    },
    headerBottom: {
        backgroundColor: 'red',
        flex: 1,
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
        height: 36,
        width: '40%',
        borderRadius: 20,
        padding: 8,
        marginHorizontal: '4%',
        marginTop: '4%',
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
        fontFamily: 'Poppins-Regular',
        fontWeight: '600',
        letterSpacing: 2,
        color: colors.darkBlue,
        marginVertical: 10
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
        fontFamily: 'Popins-Regular',
        letterSpacing: 2,
        textAlign: 'center',
        width: '40%',
        fontSize: 18,
        fontWeight: '600',
        marginLeft: '4%',
        marginTop: '6%'

    },

    choiceText: {
        width: '70%',
        color: '#004691',
        fontFamily: 'Poppins-Regular',
        fontWeight: 'bold',
    }
})

export default styles
