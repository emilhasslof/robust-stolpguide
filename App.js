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
        {!searchMode && <TranslateInputBox setData={setData} />}
        <Text style={styles.resultText}>{data.length} Resultat</Text>
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


// Renders input fields for search parameters and updates 
// data array with search results
function SearchBox({ setData }) {
  const [höjd, setHöjd] = useState("")
  const [bredd, setBredd] = useState("")
  const [elslutbleck, setElslutbleck] = useState("")
  const [karmprofil, setKarmprofil] = useState("")
  const [modell, setModell] = useState("")
  const [plösmått, setPlösmått] = useState("")

  useEffect(() => {
    const filteredData = dummyData.filter(plate => {
      return (
        plate.höjd.includes(höjd) &&
        plate.bredd.includes(bredd) &&
        plate.elslutbleck.toLowerCase().includes(elslutbleck.toLowerCase()) &&
        plate.karmprofil.toLowerCase().includes(karmprofil.toLowerCase()) &&
        plate.modell.toLowerCase().includes(modell.toLowerCase()) &&
        plate.plösmått.includes(plösmått)
      )
    })

    setData(filteredData)

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

function TranslateInputBox({ setData }) {
  const [assa, setAssa] = useState("")
  const [step, setStep] = useState("")
  const [safetron, setSafetron] = useState("")

  useEffect(() => {
    const filteredData = dummyData.filter(plate => {
      return (
        plate.ASSA.map(s => s.toLowerCase()).some((item) => { return item.includes(assa.toLowerCase()) }) &&
        plate.Step.map(s => s.toLowerCase()).some((item) => { return item.includes(step.toLowerCase()) }) &&
        plate.Safetron.map(s => s.toLowerCase()).some((item) => { return item.includes(safetron.toLowerCase()) })
      )
    })

    setData(filteredData)

  }, [assa, step, safetron])

  return (
    <View style={styles.translateInputBox}>
      <Divider />
      <Text style={styles.manufacturer}>ASSA</Text>
      <View style={[styles.input, { width: "48%" }]}>
        <Image source={require('./assets/icon-search.png')} />
        <TextInput onChangeText={setAssa} style={{ width: "100%" }} />
      </View>
      <Text style={styles.manufacturer}>Safetron</Text>
      <View style={[styles.input, { width: "48%" }]}>
        <Image source={require('./assets/icon-search.png')} />
        <TextInput onChangeText={setSafetron} style={{ width: "100%" }} />
      </View>
      <Text style={styles.manufacturer}>StepLock</Text>
      <View style={[styles.input, { width: "48%" }]}>
        <Image source={require('./assets/icon-search.png')} />
        <TextInput onChangeText={setStep} style={{ width: "100%" }} />
      </View>
      <Divider />
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

function Divider() {
  return (<View style={styles.divider} />);
}

function BottomBar() {
  return (<View style={styles.bottomBar} />);
}

