import React, { useState } from 'react'
import { View, Pressable, Text } from 'react-native'
import styles from './styles'

function lowerCase(s) {
    return s.toLowerCase()
}

// Translate mode: pick a competitor article (ASSA / Safetron / StepLock) and get the
// matching Robust post. Each field opens the shared picker overlay (owned by App).
function TranslateInputBox({ data, setData, fetchedData, openPicker }) {
    const [values, setValues] = useState({ assa: '', safetron: '', step: '' })

    const setValue = (key, value) => {
        // Only one competitor manufacturer can be active at a time: entering/selecting a
        // value in one field clears the others (clearing a field just empties that one).
        setValues((prev) =>
            value === ''
                ? { ...prev, [key]: value }
                : { assa: '', safetron: '', step: '', [key]: value }
        )
    }

    function extractOptions(manufacturer) {
        return fetchedData
            .map((robustPlate) => robustPlate[manufacturer])
            .flat()
            .filter((item) => item != '')
            .filter((item, index, array) => array.indexOf(item) === index)
            .sort()
    }

    // Does a manufacturer's article list satisfy the query? An empty query means
    // "not filtering on this manufacturer" — so it matches regardless of whether the
    // post has any article for that manufacturer (the API returns [] when it has none).
    const matches = (articles, query) => {
        const q = query.trim().toLowerCase()
        if (q === '') return true
        return articles.some((item) => item.toLowerCase().includes(q))
    }

    // Recompute matches whenever a field changes
    React.useEffect(() => {
        const { assa, safetron, step } = values
        const matchingPlates = fetchedData.filter((plate) =>
            matches(plate.assa, assa) &&
            matches(plate.step, step) &&
            matches(plate.safetron, safetron)
        )

        matchingPlates.forEach((plate) => {
            if (assa != '' && matches(plate.assa, assa)) {
                plate.translationMatch = plate.assa
            } else if (step != '' && matches(plate.step, step)) {
                plate.translationMatch = plate.step
            } else if (safetron != '' && matches(plate.safetron, safetron)) {
                plate.translationMatch = plate.safetron
            }
        })
        setData(matchingPlates)
    }, [values])

    const fields = [
        { name: 'assa', label: 'ASSA' },
        { name: 'safetron', label: 'Safetron' },
        { name: 'step', label: 'StepLock' }
    ]

    const openFor = (field) => {
        openPicker({
            label: field.label,
            numeric: false,
            options: extractOptions(field.name),
            query: values[field.name],
            onQueryChange: (text) => setValue(field.name, text),
            onSelect: (item) => setValue(field.name, item)
        })
    }

    const count = data.length
    const noun = count === 1 ? 'montagestolpe' : 'montagestolpar'
    const filled = fields.filter((f) => values[f.name].trim() !== '')
    const competitor = filled.map((f) => `${f.label} ${values[f.name].trim()}`).join(' och ')

    return (
        <>
        <View style={styles.searchBox}>
            {fields.map((field) => {
                const value = values[field.name]
                return (
                    <View style={styles.fieldWrapFull} key={field.name}>
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
                                    onPress={() => setValue(field.name, '')}
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
        <View style={styles.resultBar}>
            {competitor ? (
                <Text style={styles.resultText}>
                    {count} {noun} motsvarar{'\n'}<Text style={[styles.resultText, styles.resultEmphasis]}>{competitor}</Text>
                </Text>
            ) : (
                <Text style={styles.resultText}>{count} Träffar</Text>
            )}
        </View>
        </>
    )
}

export default TranslateInputBox
