import React, { useState, useEffect } from 'react'
import { View, Pressable, Text } from 'react-native'
import styles from './styles'

// Special Elslutbleck option: selecting it shows all mechanical strike plates.
const MEKANISKA_SLUTBLECK = 'Mekaniska slutbleck'

// Search parameter fields (2-column labeled grid). Each field is a tap-target that
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

    // Filter the results whenever a parameter changes
    useEffect(() => {
        const filteredData = fetchedData.filter((plate) => {
            return (
                matchesArray(plate.karmprofil, parameters.karmprofil) &&
                (parameters.elslutbleck === MEKANISKA_SLUTBLECK
                    ? plate.product_type === 'mekaniskt_slutbleck'
                    : plate.elslutbleck.toLowerCase().includes(parameters.elslutbleck.toLowerCase())) &&
                plate.modell.toLowerCase().includes(parameters.modell.toLowerCase()) &&
                (parameters.plösmått === '' ? true : plate.plösmått.replace(/[^0-9.,]/g, '') == (parameters.plösmått.replace(/[^0-9.,]/g, ''))) &&
                (parameters.bredd === '' ? true : plate.bredd.replace(/[^0-9.,]/g, '') == (parameters.bredd.replace(/[^0-9.,]/g, ''))) &&
                (parameters.höjd === '' ? true : plate.höjd.replace(/[^0-9.,]/g, '') == (parameters.höjd.replace(/[^0-9.,]/g, '')))
            )
        })
        setData(filteredData)
    }, [parameters])

    const inputFields = [
        { name: 'höjd', label: 'Höjd', numeric: true },
        { name: 'bredd', label: 'Bredd', numeric: true },
        { name: 'elslutbleck', label: 'Elslutbleck', numeric: false },
        { name: 'karmprofil', label: 'Karmprofil', numeric: false },
        { name: 'modell', label: 'Stolpe', numeric: false },
        { name: 'plösmått', label: 'Plösmått', numeric: true }
    ]

    // Autocomplete options per field, recomputed as the result set narrows
    const [optionsMap, setOptionsMap] = useState(() => buildOptionsMap())
    useEffect(() => {
        setOptionsMap(buildOptionsMap())
    }, [data])

    function buildOptionsMap() {
        const map = {}
        inputFields.forEach((field) => {
            map[field.name] = extractOptions(field.name)
        })
        return map
    }

    function extractOptions(parameter) {
        const parametersEmpty = Object.values(parameters).every((value) => value === '')
        const source = parametersEmpty ? fetchedData : data
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
            options: optionsMap[field.name] || [],
            query: parameters[field.name],
            onQueryChange: (text) => setParameter(field.name, text),
            onSelect: (item) => setParameter(field.name, item)
        })
    }

    return (
        <View style={styles.searchBox}>
            {inputFields.map((field) => {
                const value = parameters[field.name]
                return (
                    <View style={styles.fieldWrap} key={field.name}>
                        <Text style={styles.fieldLabel}>{field.label}</Text>
                        <Pressable style={styles.field} onPress={() => openFor(field)}>
                            <Text
                                style={value ? styles.fieldValueText : styles.fieldPlaceholderText}
                                numberOfLines={1}
                            >
                                {value || '–'}
                            </Text>
                            {value ? (
                                <Pressable
                                    style={styles.fieldClear}
                                    hitSlop={10}
                                    onPress={() => setParameter(field.name, '')}
                                >
                                    <Text style={styles.fieldClearText}>✕</Text>
                                </Pressable>
                            ) : (
                                <Text style={styles.chevron}>▾</Text>
                            )}
                        </Pressable>
                    </View>
                )
            })}
        </View>
    )
}

export default SearchInputBox
