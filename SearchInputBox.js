import React, { useState, useEffect } from 'react'
import { View, Pressable, Text } from 'react-native'
import styles from './styles'
import Chevron from './Chevron.js'

// Special Elslutbleck option: selecting it shows all mechanical strike plates.
const MEKANISKA_SLUTBLECK = 'Mekaniska slutbleck'

// Search parameter fields (2-column card grid). Each card is a tap-target that
// opens the shared picker overlay (owned by App); it never focuses a keyboard inline.
function SearchInputBox({ data, setData, fetchedData, openPicker }) {
    const [parameters, setParameters] = useState({
        höjd: '',
        bredd: '',
        elslutbleck: '',
        karmprofil: '',
        modell: '',
        plösmått: ''
    })

    const setParameter = (key, value) => {
        setParameters((prev) => ({ ...prev, [key]: value }))
    }

    // Does an array field satisfy the query? An empty query means "not filtering on
    // this field", so it matches even when the post's array is empty (e.g. a post with
    // no frame profile still shows up until you actually filter by karmprofil).
    const matchesArray = (articles, query) => {
        const q = query.toLowerCase()
        if (q === '') return true
        return articles.some((item) => item.toLowerCase().includes(q))
    }

    const numMatch = (value, query) => {
        if (query === '') return true
        return value.replace(/[^0-9.,]/g, '') == query.replace(/[^0-9.,]/g, '')
    }

    // Whether a plate satisfies a set of parameter values.
    const plateMatches = (plate, params) => (
        matchesArray(plate.karmprofil, params.karmprofil) &&
        (params.elslutbleck === MEKANISKA_SLUTBLECK
            ? plate.product_type === 'mekaniskt_slutbleck'
            : plate.elslutbleck.toLowerCase().includes(params.elslutbleck.toLowerCase())) &&
        plate.modell.toLowerCase().includes(params.modell.toLowerCase()) &&
        numMatch(plate.plösmått, params.plösmått) &&
        numMatch(plate.bredd, params.bredd) &&
        numMatch(plate.höjd, params.höjd)
    )

    // Filter the results whenever a parameter changes
    useEffect(() => {
        setData(fetchedData.filter((plate) => plateMatches(plate, parameters)))
    }, [parameters, fetchedData])

    const inputFields = [
        { name: 'höjd', label: 'Höjd', numeric: true, unit: 'mm' },
        { name: 'bredd', label: 'Bredd', numeric: true, unit: 'mm' },
        { name: 'elslutbleck', label: 'Elslutbleck', numeric: false },
        { name: 'karmprofil', label: 'Karmprofil', numeric: false },
        { name: 'modell', label: 'Stolpe', numeric: false, symbols: true },
        { name: 'plösmått', label: 'Plösmått', numeric: true, unit: 'mm' }
    ]

    // Faceted autocomplete options per field: each field's options reflect the OTHER
    // active filters but not its own value, so opening a field that already has a value
    // (or clearing it inside the picker) still shows the full set of choices.
    const [optionsMap, setOptionsMap] = useState({})
    useEffect(() => {
        const map = {}
        inputFields.forEach((field) => {
            map[field.name] = extractOptions(field.name)
        })
        setOptionsMap(map)
    }, [parameters, fetchedData])

    function extractOptions(parameter) {
        // Ignore this field's own value so its option list isn't narrowed to just the
        // currently-selected value.
        const otherParams = { ...parameters, [parameter]: '' }
        const source = fetchedData.filter((plate) => plateMatches(plate, otherParams))
        let result = source
            .map((robustPlate) => robustPlate[parameter])
            .flat()
            .filter((item) => item != '')
            .filter((item, index, array) => array.indexOf(item) === index)
            .sort()
        if (parameterIsNumerical(parameter)) {
            result = result.map((item) => item.replace(',', '.'))
            result = result.sort((a, b) => parseFloat(a) - parseFloat(b))
        }
        if (parameter === 'elslutbleck') {
            result = [...result, MEKANISKA_SLUTBLECK]
        }
        return result
    }
    function parameterIsNumerical(parameter) {
        return ['höjd', 'bredd', 'plösmått'].includes(parameter)
    }

    const openFor = (field) => {
        openPicker({
            label: field.label,
            numeric: field.numeric,
            symbols: field.symbols,
            options: optionsMap[field.name] || [],
            query: parameters[field.name],
            unit: field.unit,
            onQueryChange: (text) => setParameter(field.name, text),
            onSelect: (item) => setParameter(field.name, item)
        })
    }

    return (
        <>
        <View style={styles.searchBox}>
            {inputFields.map((field) => {
                const value = parameters[field.name]
                return (
                    <View style={styles.fieldWrap} key={field.name}>
                        <Pressable style={styles.field} onPress={() => openFor(field)}>
                            <View style={styles.fieldMain}>
                                <Text style={styles.fieldLabel} numberOfLines={1}>{field.label}</Text>
                                <View style={styles.fieldRow}>
                                    <Text
                                        style={value ? styles.fieldValueText : styles.fieldPlaceholderText}
                                        numberOfLines={1}
                                    >
                                        {value ? (field.unit ? `${value} ${field.unit}` : value) : '–'}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.fieldSide}>
                                {value ? (
                                    <Pressable
                                        style={styles.fieldClear}
                                        hitSlop={10}
                                        onPress={() => setParameter(field.name, '')}
                                    >
                                        <Text style={styles.fieldClearText}>✕</Text>
                                    </Pressable>
                                ) : (
                                    <View style={styles.chevron}><Chevron /></View>
                                )}
                            </View>
                        </Pressable>
                    </View>
                )
            })}
        </View>
        <View style={styles.resultBar}>
            <Text style={styles.resultText}>{data.length} Träffar</Text>
        </View>
        </>
    )
}

export default SearchInputBox
