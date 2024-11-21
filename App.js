import { StatusBar } from 'expo-status-bar'
import { Dimensions, Text, View, Image } from 'react-native'
import { GestureHandlerRootView, FlatList } from 'react-native-gesture-handler'
import React, { useState, useEffect, useRef } from 'react'
import styles from './styles'
import fetchData from './fetchData.js'
import Faceplate from './Faceplate.js'
import SearchInputBox from './SearchInputBox.js'
import TranslateInputBox from './TranslateInputBox.js'
import ToggleMode from './ToggleMode.js'
import BottomBar from './BottomBar.js'

export default function App() {
    const [searchMode, setSearchMode] = useState(true) // true = search, false = translate
    const [fetchedData, setFetchedData] = useState([]) // fetched data from robust-se.com
    const [data, setData] = useState([]) // List of faceplates displayed in the FlatList, changes when user searches or translates
    const [fetching, setFetching] = useState(true)
    const [showResults, setShowResults] = useState(true)

    const flatListRef = useRef(null)

    // Fetches data from robust-se.com writes it to state
    const fetchDataAndSetState = async () => {
        const data = await fetchData()
        setFetchedData(data)
        setData(data)
        setFetching(false)
    }

    // Fetches data on first render
    useEffect(() => {
        fetchDataAndSetState()
    }, [])

    useEffect(() => {
        if (showResults && data.length < 180 && data.length > 0 && !searchMode) {
            flatListRef.current.scrollToOffset({
                animated: true,
                offset: 400
            })
        }
    }, [showResults])

    const width = Dimensions.get('window').width
    const renderHeader = (searchMode) => {
        return (
            <View style={styles.header}>
                <StatusBar style="light" />
                {<Image resizeMode="contain" style={styles.logo} source={require('./assets/logo.png')} />}
                <ToggleMode searchMode={searchMode} setSearchMode={setSearchMode} />
                {searchMode && (
                    <SearchInputBox
                        data={data}
                        setData={setData}
                        fetchedData={fetchedData}
                        showResults={showResults}
                        setShowResults={setShowResults}
                        flatListRef={flatListRef}
                    />
                )}
                {!searchMode && (
                    <TranslateInputBox
                        data={data}
                        setData={setData}
                        fetchedData={fetchedData}
                        showResults={showResults}
                        setShowResults={setShowResults}
                        flatListRef={flatListRef}
                    />
                )}
                {fetching && <View style={styles.resultTextContainer}><Text style={styles.loadingText}>Hämtar data...</Text></View>}
                {!fetching && showResults && (
                    <View style={styles.resultTextContainer}>
                        <Text style={styles.resultText}>{data.length} Resultat</Text>
                    </View>
                )}
            </View>
        )
    }

    faceplateHeight = 550 + 15 // height + marginBottom of Faceplate component
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{ zIndex: 0, backgroundColor: '#E4E4E3' }}>
                <FlatList
                    ref={flatListRef}
                    ListHeaderComponent={renderHeader(searchMode)}
                    data={showResults ? data : []}
                    keyboardShouldPersistTaps="handled"
                    getItemLayout={(data, index) => ({
                        length: faceplateHeight,
                        offset: faceplateHeight * index,
                        index
                    })}
                    renderItem={({ item }) => (
                        <Faceplate
                            modell={item.modell}
                            blueprintUrl={item.bild}
                            translationMatch={item.translationMatch}
                            style={styles.faceplate}
                        />
                    )}
                />
            </View>
            <BottomBar />
        </GestureHandlerRootView>
    )
}
