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
const PANEL_SIZE = CARD_WIDTH // square image area, full card width
const PANEL_RADIUS = 20 // top corners of the image panel
const PANEL_BORDER = 1
const IMG_INSET = 28 // product padding within the panel

export const FACEPLATE_HEIGHT = TITLE_HEIGHT + PANEL_SIZE + CARD_GAP

const Faceplate = React.memo(({ modell, blueprintUrl }) => (
    // Outer view carries the shadow, inner view clips to the rounded card. (iOS drops
    // the shadow on a view that clips, so the two can't be one view.)
    <View style={styles.cardShadow}>
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
    </View>
))

const styles = StyleSheet.create({
    cardShadow: {
        width: CARD_WIDTH,
        alignSelf: 'center',
        borderRadius: radius.card,
        backgroundColor: colors.surface,
        marginBottom: CARD_GAP,
        ...shadow,
    },
    card: {
        borderRadius: radius.card,
        backgroundColor: colors.surface,
        overflow: 'hidden',
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
    // Full-width framed panel. Only its top edge and top-corner arcs should show: the
    // side and bottom borders are pushed one point outside the card and clipped away,
    // so the arcs run straight into the card's edges.
    panel: {
        width: PANEL_SIZE + PANEL_BORDER * 2,
        height: PANEL_SIZE + PANEL_BORDER,
        marginLeft: -PANEL_BORDER,
        marginBottom: -PANEL_BORDER,
        borderTopLeftRadius: PANEL_RADIUS + PANEL_BORDER,
        borderTopRightRadius: PANEL_RADIUS + PANEL_BORDER,
        borderBottomLeftRadius: radius.card,
        borderBottomRightRadius: radius.card,
        borderWidth: PANEL_BORDER,
        borderColor: colors.line,
        backgroundColor: colors.surface,
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
