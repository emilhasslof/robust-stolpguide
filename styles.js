import { StyleSheet, Platform } from 'react-native'

// Design tokens for the light Robust app design: soft blue-grey ground, white
// rounded cards with a whisper of shadow, dark navy ink, brand blue accents.
export const colors = {
    bg: '#EEF2F8',         // light blue-grey page ground
    surface: '#FFFFFF',
    track: '#E3E9F2',      // segmented toggle track / picker search field
    ink: '#0F1F3D',        // primary text (dark navy)
    inkSoft: '#4B5B75',    // secondary text / inactive segment
    brand: '#0A4EA5',      // brand blue
    brandDeep: '#083D82',
    line: '#E4EAF2',       // hairline separators
    accent: '#ED9A43',
}

export const radius = {
    pill: 999,
    card: 24,
    field: 18,
    sheet: 28,
}

// Soft elevation shared by cards and fields
export const shadow = Platform.select({
    ios: {
        shadowColor: '#0F1F3D',
        shadowOpacity: 0.06,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
    },
    android: { elevation: 2 },
    default: {},
})

const styles = StyleSheet.create({
    // ---- Brand header ----
    brandBand: {
        backgroundColor: colors.bg,
        paddingTop: 64,
        paddingBottom: 18,
        paddingHorizontal: 20,
    },
    logo: {
        width: '52%',
        height: 46,
        alignSelf: 'flex-start',
    },
    body: {
        backgroundColor: colors.bg,
        paddingTop: 6,
    },

    // ---- Segmented toggle (Sök / Översätt) ----
    toggle: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginBottom: 20,
        height: 56,
        borderRadius: radius.pill,
        backgroundColor: colors.track,
    },
    segment: {
        flex: 1,
        borderRadius: radius.pill,
        alignItems: 'center',
        justifyContent: 'center',
    },
    segmentActive: {
        backgroundColor: colors.brand,
    },
    segmentText: {
        fontSize: 16,
        fontWeight: '800',
        letterSpacing: 3,
        textTransform: 'uppercase',
        color: colors.inkSoft,
    },
    segmentTextActive: {
        color: colors.surface,
    },

    // ---- Input grid ----
    searchBox: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    fieldWrap: {
        width: '48%',
        marginBottom: 16,
    },
    fieldWrapFull: {
        width: '100%',
        marginBottom: 16,
    },
    fieldLabel: {
        fontSize: 12,
        fontWeight: '800',
        letterSpacing: 2.5,
        textTransform: 'uppercase',
        color: colors.ink,
        marginBottom: 6,
    },
    // The whole card is the tap-target: label on top, value + chevron below.
    field: {
        backgroundColor: colors.surface,
        borderRadius: radius.field,
        paddingHorizontal: 18,
        paddingTop: 16,
        paddingBottom: 14,
        ...shadow,
    },
    fieldRow: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 32,
    },
    fieldInput: {
        flex: 1,
        fontSize: 22,
        fontWeight: '600',
        color: colors.ink,
        paddingVertical: 0,
        paddingRight: 22,
    },

    // ---- Result count ----
    resultBar: {
        paddingHorizontal: 20,
        paddingTop: 6,
        paddingBottom: 16,
    },
    resultText: {
        fontSize: 20,
        fontWeight: '800',
        letterSpacing: 3,
        textTransform: 'uppercase',
        color: colors.ink,
    },
    resultEmphasis: {
        color: colors.brand,
    },

    // ---- Dropdown / options list ----
    optionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.surface,
        paddingLeft: 24,
        paddingRight: 16,
        paddingTop: 22,
        paddingBottom: 6,
    },
    optionHeaderText: {
        color: colors.ink,
        fontSize: 13,
        fontWeight: '800',
        letterSpacing: 2.5,
        textTransform: 'uppercase',
    },
    optionHeaderCloseWrap: {
        width: 40,
        height: 40,
        borderRadius: radius.pill,
        backgroundColor: colors.track,
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionHeaderClose: {
        color: colors.ink,
        fontSize: 16,
        fontWeight: '700',
    },
    optionRow: {
        paddingVertical: 18,
        paddingHorizontal: 24,
        backgroundColor: colors.surface,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.line,
    },
    optionRowPressed: {
        backgroundColor: colors.bg,
    },
    optionText: {
        fontSize: 19,
        fontWeight: '600',
        color: colors.ink,
    },
    optionEmptyText: {
        fontSize: 16,
        color: colors.inkSoft,
        fontStyle: 'italic',
    },

    // ---- Field as a tap-target (opens the picker) ----
    fieldValueText: {
        flex: 1,
        fontSize: 22,
        fontWeight: '600',
        color: colors.ink,
    },
    fieldPlaceholderText: {
        flex: 1,
        fontSize: 22,
        fontWeight: '600',
        color: colors.ink,
    },
    chevron: {
        marginLeft: 8,
    },
    fieldClear: {
        marginLeft: 8,
        width: 26,
        height: 26,
        borderRadius: radius.pill,
        backgroundColor: colors.track,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fieldClearText: {
        fontSize: 13,
        fontWeight: '700',
        color: colors.ink,
    },

    // ---- Picker overlay ----
    overlay: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        justifyContent: 'flex-end',
        zIndex: 100,
        elevation: 100,
    },
    modalBackdrop: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(15, 31, 61, 0.45)',
    },
    modalSheet: {
        height: '85%',
        backgroundColor: colors.surface,
        borderTopLeftRadius: radius.sheet,
        borderTopRightRadius: radius.sheet,
        overflow: 'hidden',
    },
    modalSearchWrap: {
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 14,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.line,
    },
    modalSearchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 52,
        borderRadius: radius.pill,
        backgroundColor: colors.bg,
        paddingLeft: 20,
        paddingRight: 10,
    },
    modalSearchInput: {
        flex: 1,
        fontSize: 18,
        fontWeight: '600',
        color: colors.ink,
        paddingVertical: 0,
    },
    modalSearchClear: {
        width: 32,
        height: 32,
        borderRadius: radius.pill,
        backgroundColor: colors.track,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalSearchClearText: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.ink,
    },

    // ---- Kept: used by BottomBar / Divider ----
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 28,
        backgroundColor: colors.surface,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: colors.line,
    },
    divider: {
        width: '100%',
        height: StyleSheet.hairlineWidth,
        backgroundColor: colors.line,
    },
})

export default styles
