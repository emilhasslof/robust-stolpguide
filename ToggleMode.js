import React from 'react'
import { View, Text, Pressable } from 'react-native'
import styles from './styles'

// Pill-shaped segmented control on a light track. Active segment fills brand blue.
function ToggleMode({ setSearchMode, searchMode }) {
    return (
        <View style={styles.toggle}>
            <Pressable
                style={[styles.segment, searchMode && styles.segmentActive]}
                onPress={() => setSearchMode(true)}
            >
                <Text style={[styles.segmentText, searchMode && styles.segmentTextActive]}>Sök</Text>
            </Pressable>
            <Pressable
                style={[styles.segment, !searchMode && styles.segmentActive]}
                onPress={() => setSearchMode(false)}
            >
                <Text style={[styles.segmentText, !searchMode && styles.segmentTextActive]}>Översätt</Text>
            </Pressable>
        </View>
    )
}

export default ToggleMode
