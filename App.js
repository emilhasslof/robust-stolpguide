import { StatusBar } from "expo-status-bar";
import { Dimensions, FlatList, Text, View, Image } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import styles from "./styles";
import fetchData from "./fetchData.js";
import Faceplate from "./Faceplate.js";
import SearchInputBox from "./SearchInputBox.js";
import TranslateInputBox from "./TranslateInputBox.js";
import ToggleMode from "./ToggleMode.js";
import BottomBar from "./BottomBar.js";
import Dropdown from "./Dropdown.js";

export default function App() {
  const [searchMode, setSearchMode] = useState(true); // true = search, false = translate
  const [fetchedData, setFetchedData] = useState([]); // fetched data from robust-se.com
  const [data, setData] = useState([]); // List of faceplates displayed in the FlatList, changes when user searches or translates
  const [fetching, setFetching] = useState(true);
  const [showResults, setShowResults] = useState(true);

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

  const renderHeader = (searchMode) => {
    return (
      <View style={{ marginTop: 25 }}>
        <StatusBar style="auto" />
        {<Image resizeMode="contain" style={{ width: "100%", marginBottom: -15 }} source={require('./assets/Logo.png')} />}
        <ToggleMode searchMode={searchMode} setSearchMode={setSearchMode} />
        {searchMode && <SearchInputBox setData={setData} fetchedData={fetchedData} showResults={showResults} setShowResults={setShowResults} />}
        {!searchMode && <TranslateInputBox setData={setData} fetchedData={fetchedData}
          showResults={showResults} setShowResults={setShowResults} />}
        {fetching && <Text style={styles.loadingText}>Hämtar data...</Text>}
        {!fetching && showResults && <Text style={styles.resultText}>{data.length} Resultat</Text>}
      </View>
    )
  }

  faceplateHeight = Dimensions.get("window").height / 1.2 + 15; // height + marginBottom of Faceplate component
  return (
    <View style={{ flex: 1 }}>
      <View style={{ zIndex: 0, overflow: "visible" }}>
        <FlatList
          ListHeaderComponent={renderHeader(searchMode)}
          data={showResults ? data : []}
          keyboardShouldPersistTaps="handled"
          getItemLayout={(data, index) => (
            { length: faceplateHeight, offset: faceplateHeight * index, index })
          }
          renderItem={({ item }) => <Faceplate modell={item.modell} blueprintUrl={item.bild} translationMatch={item.translationMatch} style={styles.faceplate} />
          }
        />
      </View>
      <BottomBar />
    </View>
  );
}

