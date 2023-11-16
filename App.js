import { StatusBar } from "expo-status-bar";
import { Button, Dimensions, FlatList, Pressable, StyleSheet, Text, View, Image, TextInput, Animated } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import * as Svg from "react-native-svg";
import Logo from "./assets/robust-logo";
import SearchIcon from "./assets/icon-search.svg";
import styles from "./styles";
import dummyData from "./dummy-data.js";

export default function App() {
  const [searchMode, setSearchMode] = useState(true); // true = search, false = translate
  const [data, setData] = useState(dummyData);

  const renderHeader = (searchMode) => {
    return (
    <View>
      <StatusBar style="auto" />
      <Logo width={Dimensions.get("window").width} />
      <ToggleMode searchMode={searchMode} setSearchMode={setSearchMode} />
      {searchMode && <SearchBox data={data} setData={setData} />}
      {!searchMode && <TranslateInputBox />} 
    </View>
    )
  }

  return (
    <View >
      <FlatList
        ListHeaderComponent={renderHeader(searchMode)}
        data={data}
        renderItem={({ item }) =>
          <Faceplate model={item.modell} blueprintUrl={item.URL} style={styles.faceplate} />
        }
      />
      <BottomBar />
    </View>
  );
}

// Animated marker that indicates which mode is active
function ModeMarker({ searchMode }) {
  const markerPosition = useRef(new Animated.Value(0)).current;
  const markerWidth = Dimensions.get("window").width / 2;
  const markerHeight = "100%"
  const markerStyle = {
    position: "absolute",
    width: markerWidth,
    height: markerHeight,
    backgroundColor: "#004691",
    borderRadius: 50,
    top: 0,
    left: 0,
    //shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    //elevation: 5, // for Android
  };
  const markerAnimation = Animated.timing(markerPosition, {
    toValue: searchMode ? 0 : markerWidth,
    duration: 200,
    useNativeDriver: true,
  });
  useEffect(() => {
    markerAnimation.start();
  }, [searchMode]);
  return (
    <Animated.View style={[markerStyle, { transform: [{ translateX: markerPosition }] }]} />
  );
}

// Renders input fields for search parameters and updates 
// data array with search results
function SearchBox({ data, setData }) {
  const [höjd, setHöjd] = useState("");
  const [bredd, setBredd] = useState("");
  const [elslutbleck, setElslutbleck] = useState("");
  const [karmprofil, setKarmprofil] = useState("");
  const [modell, setModell] = useState("");
  const [plösmått, setPlösmått] = useState("");

  useEffect(() => {
    const filteredData = dummyData.filter(item => {
      return (
        item.höjd.includes(höjd) &&
        item.bredd.includes(bredd) &&
        item.elslutbleck.includes(elslutbleck) &&
        item.karmprofil.includes(karmprofil) &&
        item.modell.includes(modell) &&
        item.plösmått.includes(plösmått)
      )})

    setData(filteredData);

  }, [höjd, bredd, elslutbleck, karmprofil, modell, plösmått]);

  const inputFields = [
    { name: 'höjd', setter: setHöjd, placeholder: 'Höjd', numeric: true },
    { name: 'bredd', setter: setBredd, placeholder: 'Bredd', numeric: true },
    { name: 'elslutbleck', setter: setElslutbleck, placeholder: 'Elslutbleck', numeric: false },
    { name: 'karmprofil', setter: setKarmprofil, placeholder: 'Karmprofil', numeric: false },
    { name: 'modell', setter: setModell, placeholder: 'Modell', numeric: false },
    { name: 'plösmått', setter: setPlösmått, placeholder: 'Plösmått', numeric: true },
  ];

  return (
    <View>
      <Divider />
      <View style={styles.searchBox}>
        {inputFields.map((field, index) => (
          <View style={styles.input} key={index}>
            <Image source={require('./assets/icon-search.png')} />
            {/*<SearchIcon width={20} height={20} />*/}
            <TextInput
              keyboardType={field.numeric ? 'numeric' : 'default'}
              onChangeText={field.setter}
              //value={field.name}
              placeholder={field.placeholder}
            />
          </View>
        ))}
      </View>
      <Divider />
    </View>
  );
}

function TranslateInputBox() {
  return ( 
    <View>
      <Text>Translating</Text>
      </View>
  );
}

function Faceplate({ model, blueprintUrl }) {
  return (
    <View style={styles.faceplate}>
      <Text style={styles.model}>{model}</Text>
      <Image source={{ uri: blueprintUrl }} style={styles.blueprint} />
    </View>
  );
}

function ToggleMode({ setSearchMode, searchMode }) {
  return (
    <Pressable
      style={styles.toggleMode}
      onPress={() => {
        setSearchMode(!searchMode);
      }}
    >
      <ModeMarker searchMode={searchMode} />
      <Text style={[styles.sök, { color: searchMode ? "white" : "black" }]}>Sök</Text>
      <Text style={[styles.översätt, { color: searchMode ? "black" : "white" }]}>Översätt</Text>
    </Pressable >
  );
}

function Divider() {
  return (<View style={styles.divider} />);
}

function BottomBar() {
  return (<View style={styles.bottomBar} />);
}

