import React from 'react'
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import { colors, radius, shadow } from './styles'

// Card geometry, derived from screen width so the FlatList can lay out items
// deterministically (see FACEPLATE_HEIGHT / getItemLayout in App.js).
const SCREEN_W = Dimensions.get('window').width
const CARD_MARGIN = 20 // side margin, matches the input grid
const CARD_GAP = 16 // vertical gap between cards
const CARD_WIDTH = SCREEN_W - CARD_MARGIN * 2
const TITLE_HEIGHT = 84
const PANEL_INSET = 6 // hairline-framed image panel sits just inside the card
const PANEL_SIZE = CARD_WIDTH - PANEL_INSET * 2 // square image area
const IMG_INSET = 28 // product padding within the panel

export const FACEPLATE_HEIGHT = TITLE_HEIGHT + PANEL_SIZE + PANEL_INSET + CARD_GAP

const Faceplate = React.memo(({ modell, blueprintUrl }) => (
    <View style={styles.card}>
        <View style={styles.titleRow}>
            <Text style={styles.title} numberOfLines={1}>{modell}</Text>
        </View>
        <View style={styles.panel}>
            {blueprintUrl ? (
                <Image source={{ uri: blueprintUrl }} style={styles.image} resizeMode="contain" />
            ) : (
                <Text style={styles.noImage}>Ingen bild</Text>
            )}
        </View>
    </View>
))

const styles = StyleSheet.create({
    card: {
        width: CARD_WIDTH,
        alignSelf: 'center',
        backgroundColor: colors.surface,
        borderRadius: radius.card,
        marginBottom: CARD_GAP,
        ...shadow,
    },
    titleRow: {
        height: TITLE_HEIGHT,
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    title: {
        fontSize: 30,
        fontWeight: '800',
        color: colors.ink,
    },
    panel: {
        width: PANEL_SIZE,
        height: PANEL_SIZE,
        marginHorizontal: PANEL_INSET,
        marginBottom: PANEL_INSET,
        borderRadius: radius.card - PANEL_INSET,
        borderWidth: 1,
        borderColor: colors.line,
        backgroundColor: colors.surface,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        position: 'absolute',
        top: IMG_INSET, left: IMG_INSET, right: IMG_INSET, bottom: IMG_INSET,
    },
    noImage: {
        color: colors.inkSoft,
        fontSize: 14,
    },
})

export default Faceplate
