import { StatusBar } from "expo-status-bar";
import { Dimensions, FlatList, Pressable, StyleSheet, Text, View, Image, TextInput, Animated } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import * as Svg from "react-native-svg";
import Logo from "./assets/robust-logo";
import SearchIcon from "./assets/icon-search.svg";
import styles from "./styles";
//import dummyData from "./dummy-data.js";
import fetchData from "./fetchData.js";
import Faceplate from "./Faceplate.js";
import SearchInputBox from "./SearchInputBox.js";
import TranslateInputBox from "./TranslateInputBox.js";
import ToggleMode from "./ToggleMode.js";

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
      <View>
        <StatusBar style="auto" />
        <Logo width={Dimensions.get("window").width} />
        <ToggleMode searchMode={searchMode} setSearchMode={setSearchMode} />
        {searchMode && <SearchInputBox setData={setData} fetchedData={fetchedData} />}
        {!searchMode && <TranslateInputBox setData={setData} fetchedData={fetchedData} />}
        {fetching && <Text style={styles.loadingText}>Hämtar data{dots}</Text>}
        {!fetching && <Text style={styles.resultText}>{data.length} Resultat</Text>}
      </View>
    )
  }

  const flatListRef = useRef();
  faceplateHeight = Dimensions.get("window").height / 1.2;
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




function BottomBar() {
  return (<View style={styles.bottomBar} />);
}

