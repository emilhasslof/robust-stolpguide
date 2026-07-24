import React from 'react'
import { Modal, View, Text, TextInput, Pressable, FlatList } from 'react-native'
import styles, { colors } from './styles'

// Bottom-sheet picker overlay. The search field sits at the top of the sheet so the
// keyboard opens below the option list instead of covering it. Square, high-contrast,
// matching the Robust design language.
function OptionPicker({ visible, label, options, query, numeric, onChangeQuery, onSelect, onClose }) {
    const q = String(query || '').toLowerCase()
    const filtered = (options || []).filter((o) => String(o).toLowerCase().includes(q))

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
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
        </Modal>
    )
}

export default OptionPicker
