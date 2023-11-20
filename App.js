import { StatusBar } from "expo-status-bar";
import { Dimensions, FlatList, Pressable, StyleSheet, Text, View, Image, TextInput, Animated } from "react-native";
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
        keyboardShouldPersistTaps="handled"
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
  const [parameters, setParameters] = useState({
    höjd: "",
    bredd: "",
    elslutbleck: "",
    karmprofil: "",
    modell: "",
    plösmått: "",
  })

  const setParameter = (key, value) => {
    setParameters({ ...parameters, [key]: value })
  }

  useEffect(() => {
    const filteredData = dummyData.filter(plate => {
      return (
        plate.höjd.includes(parameters.höjd) &&
        plate.bredd.includes(parameters.bredd) &&
        plate.elslutbleck.toLowerCase().includes(parameters.elslutbleck.toLowerCase()) &&
        plate.karmprofil.toLowerCase().includes(parameters.karmprofil.toLowerCase()) &&
        plate.modell.toLowerCase().includes(parameters.modell.toLowerCase()) &&
        plate.plösmått.includes(parameters.plösmått)
      )
    })

    setData(filteredData)

  }, [parameters]);


  const inputFields = [
    { name: 'höjd', numeric: true },
    { name: 'bredd', numeric: true },
    { name: 'elslutbleck', numeric: false },
    { name: 'karmprofil', numeric: false },
    { name: 'modell', numeric: false },
    { name: 'plösmått', numeric: true },
  ];

  // Need a reference for each field to be able to focus it
  inputFields.forEach(field => {
    field.ref = React.createRef()
  })

  // Uses ref to focus the input field when the user clicks on the TouchableOpacity wrapper
  const focusTextInput = (index) => {
    inputFields[index].ref.current.focus()
  }

  return (
    <View>
      <Divider />
      <View style={styles.searchBox}>
        {inputFields.map((field, index) => (
          <View style={styles.input} key={index}>
            <Image source={require('./assets/icon-search.png')} />
            {/*<SearchIcon width={20} height={20} />*/}
            <Pressable onPress={() => focusTextInput(index)}
              hitSlop={{ top: 20, bottom: 20, left: 50 }} style={{ width: "100%" }}>
              <TextInput
                ref={field.ref}
                keyboardType={field.numeric ? 'numeric' : 'default'}
                onChangeText={(text) => setParameter(field.name, text)}
                placeholder={field.name.charAt(0).toUpperCase() + field.name.slice(1)}
              />
            </Pressable>
          </View>
        ))}
      </View>
      <Divider />
    </View >
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

