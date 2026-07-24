import { StatusBar } from 'expo-status-bar'
import { Text, View, Image } from 'react-native'
import { GestureHandlerRootView, FlatList } from 'react-native-gesture-handler'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import * as SplashScreen from 'expo-splash-screen';
import styles, { colors } from './styles'
import fetchData from './fetchData.js'
import Faceplate, { FACEPLATE_HEIGHT } from './Faceplate.js'
import SearchInputBox from './SearchInputBox.js'
import TranslateInputBox from './TranslateInputBox.js'
import ToggleMode from './ToggleMode.js'
import BottomBar from './BottomBar.js'
import OptionPicker from './OptionPicker.js'

export default function App() {
    const [searchMode, setSearchMode] = useState(true) // true = search, false = translate
    const [fetchedData, setFetchedData] = useState([]) // all products from the API
    const [data, setData] = useState([]) // faceplates shown in the list (search/translate results)
    const [fetching, setFetching] = useState(true)

    // The open picker, or null. Shape:
    // { label, options, numeric, query, onQueryChange, onSelect }
    const [picker, setPicker] = useState(null)

    const flatListRef = useRef(null)

    // Keep the splash screen visible while we fetch resources
    SplashScreen.preventAutoHideAsync();

    // Fetches data from the API, writes it to state, hides splash when done
    const fetchDataAndSetState = async () => {
        const startTime = Date.now()
        const data = await fetchData()
        setFetchedData(data)
        setData(data)
        setFetching(false)
        const elapsedTime = Date.now() - startTime
        await new Promise(resolve => setTimeout(resolve, 3000 - elapsedTime));
        SplashScreen.hideAsync()
    }

    // Fetches data on first render
    useEffect(() => {
        fetchDataAndSetState()
    }, [])

    // ---- Picker controller handed to the input boxes ----
    const openPicker = useCallback((descriptor) => {
        setPicker({ numeric: false, ...descriptor, query: descriptor.query ?? '' })
    }, [])
    const closePicker = useCallback(() => setPicker(null), [])

    // Typing in the sheet updates both the sheet's query and the field's live value
    const handleChangeQuery = (text) => {
        setPicker((prev) => (prev ? { ...prev, query: text } : prev))
        picker?.onQueryChange?.(text)
    }
    const handleSelect = (item) => {
        picker?.onSelect?.(item)
        closePicker()
    }

    const renderHeader = () => (
        <View>
            <View style={styles.brandBand}>
                <StatusBar style="light" />
                <Image resizeMode="contain" style={styles.logo} source={require('./assets/logo.png')} />
            </View>
            <View style={styles.body}>
                <ToggleMode searchMode={searchMode} setSearchMode={setSearchMode} />
                {searchMode ? (
                    <SearchInputBox
                        data={data}
                        setData={setData}
                        fetchedData={fetchedData}
                        openPicker={openPicker}
                    />
                ) : (
                    <TranslateInputBox
                        data={data}
                        setData={setData}
                        fetchedData={fetchedData}
                        openPicker={openPicker}
                    />
                )}
            </View>
        </View>
    )

    const renderFaceplate = ({ item }) => (
        <Faceplate
            modell={item.modell}
            blueprintUrl={item.bild}
        />
    )

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: colors.bg }}>
                <FlatList
                    ref={flatListRef}
                    ListHeaderComponent={renderHeader()}
                    data={data}
                    keyboardShouldPersistTaps="handled"
                    keyExtractor={(item, index) => `${item.modell}-${index}`}
                    renderItem={renderFaceplate}
                    getItemLayout={(d, index) => ({
                        length: FACEPLATE_HEIGHT,
                        offset: FACEPLATE_HEIGHT * index,
                        index
                    })}
                />
            </View>
            <BottomBar />
            <OptionPicker
                visible={!!picker}
                label={picker?.label}
                options={picker?.options}
                query={picker?.query ?? ''}
                numeric={picker?.numeric}
                symbols={picker?.symbols}
                unit={picker?.unit}
                onChangeQuery={handleChangeQuery}
                onSelect={handleSelect}
                onClose={closePicker}
            />
        </GestureHandlerRootView>
    )
}
