import React, { useEffect, useRef } from 'react'
import { View, Text, TextInput, Pressable, FlatList, BackHandler } from 'react-native'
import styles, { colors } from './styles'

// In-app overlay picker (deliberately NOT a Modal). RN's Modal creates a separate
// Android window where a TextInput won't reliably raise the soft keyboard; an in-tree
// overlay focuses like any normal input. The search field sits at the top of the sheet
// so the keyboard opens below the option list instead of covering it.
function OptionPicker({ visible, label, options, query, numeric, onChangeQuery, onSelect, onClose }) {
    const inputRef = useRef(null)

    useEffect(() => {
        if (!visible) return
        // Android hardware back closes the picker
        const sub = BackHandler.addEventListener('hardwareBackPress', () => {
            onClose()
            return true
        })
        // Ensure the search field is focused (autoFocus covers most cases; this is a
        // belt-and-braces focus after the overlay mounts)
        const t = setTimeout(() => inputRef.current && inputRef.current.focus(), 50)
        return () => {
            sub.remove()
            clearTimeout(t)
        }
    }, [visible, onClose])

    if (!visible) return null

    const q = String(query || '').toLowerCase()
    const filtered = (options || []).filter((o) => String(o).toLowerCase().includes(q))

    return (
        <View style={styles.overlay}>
            <Pressable style={styles.modalBackdrop} onPress={onClose} />
            <View style={styles.modalSheet}>
                <View style={styles.optionHeader}>
                    <Text style={styles.optionHeaderText}>Välj {label}</Text>
                    <Pressable onPress={onClose} hitSlop={12}>
                        <Text style={styles.optionHeaderClose}>✕</Text>
                    </Pressable>
                </View>
                <View style={styles.modalSearchWrap}>
                    <TextInput
                        ref={inputRef}
                        style={styles.modalSearchInput}
                        value={query}
                        onChangeText={onChangeQuery}
                        autoFocus
                        keyboardType={numeric ? 'numeric' : 'default'}
                        placeholder="Sök…"
                        placeholderTextColor={colors.inkSoft}
                        autoCorrect={false}
                        spellCheck={false}
                    />
                </View>
                <FlatList
                    style={{ flex: 1 }}
                    data={filtered}
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="none"
                    keyExtractor={(item, index) => `${item}-${index}`}
                    renderItem={({ item }) => (
                        <Pressable
                            style={({ pressed }) => [styles.optionRow, pressed && styles.optionRowPressed]}
                            onPress={() => onSelect(item)}
                        >
                            <Text style={styles.optionText}>{item}</Text>
                        </Pressable>
                    )}
                    ListEmptyComponent={(
                        <View style={styles.optionRow}>
                            <Text style={styles.optionEmptyText}>Inga träffar</Text>
                        </View>
                    )}
                />
            </View>
        </View>
    )
}

export default OptionPicker
