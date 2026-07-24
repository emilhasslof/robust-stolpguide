import React from 'react'
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import Svg, { Defs, Pattern, Path, Rect } from 'react-native-svg'
import { colors } from './styles'

// Card geometry, derived from screen width so the FlatList can lay out items
// deterministically (see FACEPLATE_HEIGHT / getItemLayout in App.js).
const SCREEN_W = Dimensions.get('window').width
const CARD_MARGIN = 16
const CARD_BORDER = 3 // brand-blue frame around the whole card + separator
const CARD_WIDTH = SCREEN_W - CARD_MARGIN * 2
const IMAGE_SIZE = CARD_WIDTH - CARD_BORDER * 2 // inside the card border (square image area)
const TITLE_HEIGHT = 56
const GRID_CELL = 24 // matches the website's 24px grid
const TILE_INSET = 16 // white tile inset over the grid (website inset-4)
const IMG_INSET = 24 // product padding within the area (website p-6)

export const FACEPLATE_HEIGHT = CARD_BORDER + TITLE_HEIGHT + CARD_BORDER + IMAGE_SIZE + CARD_BORDER + CARD_MARGIN

// A subtle graph-paper grid behind the white tile — cut off by the tile so only a
// thin frame of grid shows around each product, making the differently-shaped /
// differently-backed product images read as uniform.
const GridBackground = () => (
    <Svg width={IMAGE_SIZE} height={IMAGE_SIZE} style={StyleSheet.absoluteFill}>
        <Defs>
            <Pattern id="faceplate-grid" width={GRID_CELL} height={GRID_CELL} patternUnits="userSpaceOnUse">
                <Path d={`M${GRID_CELL} 0 H0 V${GRID_CELL}`} stroke="#D4D4D4" strokeWidth={1} fill="none" />
            </Pattern>
        </Defs>
        <Rect width={IMAGE_SIZE} height={IMAGE_SIZE} fill="url(#faceplate-grid)" />
    </Svg>
)

const Faceplate = React.memo(({ modell, blueprintUrl }) => (
    <View style={styles.card}>
        <View style={styles.titleRow}>
            <Text style={styles.title} numberOfLines={1}>{modell}</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.imageArea}>
            <GridBackground />
            <View style={styles.tile} />
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
        borderWidth: CARD_BORDER,
        borderColor: colors.brand,
        marginBottom: CARD_MARGIN,
    },
    titleRow: {
        height: TITLE_HEIGHT,
        justifyContent: 'center',
        paddingHorizontal: 18,
    },
    title: {
        fontSize: 20,
        fontWeight: '800',
        color: colors.ink,
        letterSpacing: 0.5,
    },
    separator: {
        height: CARD_BORDER,
        backgroundColor: colors.brand,
    },
    imageArea: {
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
        backgroundColor: colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tile: {
        position: 'absolute',
        top: TILE_INSET, left: TILE_INSET, right: TILE_INSET, bottom: TILE_INSET,
        backgroundColor: colors.surface,
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
