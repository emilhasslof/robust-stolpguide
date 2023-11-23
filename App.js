import { StatusBar } from "expo-status-bar";
import { Dimensions, FlatList, Text, View, Image } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import Logo from "./assets/Logo.svg";
import styles from "./styles";
import fetchData from "./fetchData.js";
import Faceplate from "./Faceplate.js";
import SearchInputBox from "./SearchInputBox.js";
import TranslateInputBox from "./TranslateInputBox.js";
import ToggleMode from "./ToggleMode.js";
import BottomBar from "./BottomBar.js";

export default function App() {
  const [searchMode, setSearchMode] = useState(true); // true = search, false = translate
  const [fetchedData, setFetchedData] = useState([]); // fetched data from robust-se.com
  const [data, setData] = useState([]); // List of faceplates displayed in the FlatList, changes when user searches or translates
  const [fetching, setFetching] = useState(true);
  const [dots, setDots] = useState('');

  // Adds animated dots to the loading text
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length < 3 ? prev + '.' : ''));
    }, 500); // Adjust the speed as needed

    return () => clearInterval(interval);
  }, []);

  // Fetches data from robust-se.com and sets state
  useEffect(() => {
    const fetchDataAndSetState = async () => {
      const data = await fetchData()
      setFetchedData(data)
      setData(data)
      setFetching(false)
    }
    fetchDataAndSetState()
  }, [])

  const renderHeader = (searchMode) => {
    return (
      <View style={{ marginTop: 25 }}>
        <StatusBar style="auto" />
        {false && <Logo width={Dimensions.get("window").width + 1} />}
        <Image resizeMode="contain" style={{ width: "100%", marginBottom: -15 }} source={require('./assets/Logo.png')} />
        <ToggleMode searchMode={searchMode} setSearchMode={setSearchMode} />
        {searchMode && <SearchInputBox setData={setData} fetchedData={fetchedData} />}
        {!searchMode && <TranslateInputBox setData={setData} fetchedData={fetchedData} />}
        {fetching && <Text style={styles.loadingText}>Hämtar data{dots}</Text>}
        {!fetching && <Text style={styles.resultText}>{data.length} Resultat</Text>}
      </View>
    )
  }

  const flatListRef = useRef();
  faceplateHeight = Dimensions.get("window").height / 1.2 + 15; // height + marginBottom of Faceplate component
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ListHeaderComponent={renderHeader(searchMode)}
        data={data}
        keyboardShouldPersistTaps="handled"
        getItemLayout={(data, index) => (
          { length: faceplateHeight, offset: faceplateHeight * index, index })
        }
        renderItem={({ item }) => <Faceplate modell={item.robust} blueprintUrl={item.bild} style={styles.faceplate} />
        }
      />

      <BottomBar />
    </View>
  );
}

