import React, { useEffect, useRef, useState } from 'react'
import { View, Text, TextInput, Pressable, FlatList, BackHandler, Animated, Dimensions, Keyboard, Platform } from 'react-native'
import styles, { colors } from './styles'

const SCREEN_H = Dimensions.get('window').height

// In-app overlay picker (deliberately NOT a Modal). RN's Modal creates a separate
// Android window where a TextInput won't reliably raise the soft keyboard; an in-tree
// overlay focuses like any normal input. The search field sits at the top of the sheet
// so the keyboard opens below the option list instead of covering it. The slide-up /
// backdrop-fade is animated manually since we no longer get Modal's animationType.
function OptionPicker({ visible, label, options, query, numeric, symbols, unit, onChangeQuery, onSelect, onClose }) {
    const inputRef = useRef(null)
    const [mounted, setMounted] = useState(visible)
    const slide = useRef(new Animated.Value(visible ? 0 : SCREEN_H)).current
    const fade = useRef(new Animated.Value(visible ? 1 : 0)).current
    const [kbHeight, setKbHeight] = useState(0)

    // Track keyboard height so the list can scroll its last entries above the keyboard
    useEffect(() => {
        const showEvt = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow'
        const hideEvt = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide'
        const showSub = Keyboard.addListener(showEvt, (e) => setKbHeight(e.endCoordinates ? e.endCoordinates.height : 0))
        const hideSub = Keyboard.addListener(hideEvt, () => setKbHeight(0))
        return () => {
            showSub.remove()
            hideSub.remove()
        }
    }, [])

    // Slide in when opening; slide out then unmount when closing
    useEffect(() => {
        if (visible) {
            setMounted(true)
            Animated.parallel([
                Animated.timing(slide, { toValue: 0, duration: 260, useNativeDriver: true }),
                Animated.timing(fade, { toValue: 1, duration: 260, useNativeDriver: true }),
            ]).start()
        } else {
            // Dismiss the keyboard as the close begins so it animates down together with
            // the sheet (Android otherwise keeps it up until unmount, which looks wonky).
            Keyboard.dismiss()
            Animated.parallel([
                Animated.timing(slide, { toValue: SCREEN_H, duration: 200, useNativeDriver: true }),
                Animated.timing(fade, { toValue: 0, duration: 200, useNativeDriver: true }),
            ]).start(({ finished }) => { if (finished) setMounted(false) })
        }
    }, [visible])

    useEffect(() => {
        if (!visible) return
        // Android hardware back closes the picker
        const sub = BackHandler.addEventListener('hardwareBackPress', () => {
            onClose()
            return true
        })
        // Ensure the search field is focused (belt-and-braces alongside autoFocus)
        const t = setTimeout(() => inputRef.current && inputRef.current.focus(), 50)
        return () => {
            sub.remove()
            clearTimeout(t)
        }
    }, [visible, onClose])

    if (!mounted) return null

    const q = String(query || '').toLowerCase()
    const filtered = (options || []).filter((o) => String(o).toLowerCase().includes(q))
    const firstItem = filtered.length > 0 ? filtered[0] : undefined
    const selectFirst = () => { if (firstItem !== undefined) onSelect(firstItem) }

    return (
        <View style={styles.overlay} pointerEvents={visible ? 'auto' : 'none'}>
            <Animated.View style={[styles.modalBackdrop, { opacity: fade }]}>
                <Pressable style={{ flex: 1 }} onPress={onClose} />
            </Animated.View>
            <Animated.View style={[styles.modalSheet, { transform: [{ translateY: slide }] }]}>
                <View style={styles.optionHeader}>
                    <Text style={styles.optionHeaderText}>Välj {label}</Text>
                    <Pressable onPress={onClose} hitSlop={12}>
                        <Text style={styles.optionHeaderClose}>✕</Text>
                    </Pressable>
                </View>
                <View style={styles.modalSearchWrap}>
                    <View style={styles.modalSearchRow}>
                        <TextInput
                            ref={inputRef}
                            style={styles.modalSearchInput}
                            value={query}
                            onChangeText={onChangeQuery}
                            autoFocus
                            keyboardType={
                                Platform.OS === 'ios'
                                    ? ((numeric || symbols) ? 'numbers-and-punctuation' : 'default')
                                    : (numeric ? 'numeric' : 'default')
                            }
                            returnKeyType="done"
                            onSubmitEditing={selectFirst}
                            blurOnSubmit={false}
                            placeholder="Sök…"
                            placeholderTextColor={colors.inkSoft}
                            autoCorrect={false}
                            spellCheck={false}
                        />
                        {query ? (
                            <Pressable
                                style={styles.modalSearchClear}
                                hitSlop={8}
                                onPress={() => {
                                    onChangeQuery('')
                                    inputRef.current && inputRef.current.focus()
                                }}
                            >
                                <Text style={styles.modalSearchClearText}>✕</Text>
                            </Pressable>
                        ) : null}
                    </View>
                </View>
                <FlatList
                    style={{ flex: 1 }}
                    data={filtered}
                    contentContainerStyle={{ paddingBottom: kbHeight + 24 }}
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="none"
                    keyExtractor={(item, index) => `${item}-${index}`}
                    renderItem={({ item }) => (
                        <Pressable
                            style={({ pressed }) => [styles.optionRow, pressed && styles.optionRowPressed]}
                            onPress={() => onSelect(item)}
                        >
                            <Text style={styles.optionText}>{unit ? `${item} ${unit}` : item}</Text>
                        </Pressable>
                    )}
                    ListEmptyComponent={(
                        <View style={styles.optionRow}>
                            <Text style={styles.optionEmptyText}>Inga träffar</Text>
                        </View>
                    )}
                />
            </Animated.View>
        </View>
    )
}

export default OptionPicker
