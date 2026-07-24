import { StyleSheet } from 'react-native'

// Design tokens mirrored from the new Robust website (src/styles.css):
// square corners, bold near-black borders, white fills, brand blue, high contrast.
export const colors = {
    bg: '#F5F5F5',
    surface: '#FFFFFF',
    ink: '#0F172B',        // primary text
    inkBorder: '#171717',  // bold borders (matches website controls)
    inkSoft: '#62748E',    // labels / secondary text
    brand: '#013E8B',      // brand blue
    brandDeep: '#01285C',
    line: '#E2E8F0',       // subtle separators
    accent: '#ED9A43',
}

const styles = StyleSheet.create({
    // ---- Brand header ----
    brandBand: {
        backgroundColor: colors.brand,
        paddingTop: 64,
        paddingBottom: 26,
        paddingHorizontal: 22,
    },
    logo: {
        width: '58%',
        height: 46,
    },
    body: {
        backgroundColor: colors.bg,
        paddingTop: 22,
    },

    // ---- Segmented toggle (Sök / Översätt) ----
    toggle: {
        flexDirection: 'row',
        marginHorizontal: 22,
        marginBottom: 24,
        borderWidth: 2,
        borderColor: colors.inkBorder,
        backgroundColor: colors.surface,
    },
    segment: {
        flex: 1,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
    },
    segmentActive: {
        backgroundColor: colors.brand,
    },
    segmentDivider: {
        borderLeftWidth: 2,
        borderLeftColor: colors.inkBorder,
    },
    segmentText: {
        fontSize: 16,
        fontWeight: '800',
        letterSpacing: 2,
        textTransform: 'uppercase',
        color: colors.ink,
    },
    segmentTextActive: {
        color: colors.surface,
    },

    // ---- Input grid ----
    searchBox: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 22,
    },
    fieldWrap: {
        width: '48%',
        marginBottom: 18,
    },
    fieldWrapFull: {
        width: '100%',
        marginBottom: 18,
    },
    fieldLabel: {
        fontSize: 13,
        fontWeight: '800',
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        color: colors.inkSoft,
        marginBottom: 8,
    },
    field: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 58,
        backgroundColor: colors.surface,
        borderWidth: 2,
        borderColor: colors.inkBorder,
        paddingHorizontal: 16,
    },
    fieldFocused: {
        borderColor: colors.brand,
    },
    fieldInput: {
        flex: 1,
        fontSize: 18,
        fontWeight: '700',
        color: colors.ink,
        paddingVertical: 0,
        paddingRight: 22,
    },

    // ---- Result count ----
    resultBar: {
        paddingHorizontal: 22,
        paddingTop: 4,
        paddingBottom: 18,
    },
    resultText: {
        fontSize: 14,
        fontWeight: '800',
        letterSpacing: 2,
        textTransform: 'uppercase',
        color: colors.inkSoft,
    },

    // ---- Dropdown / options list ----
    optionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.ink,
        paddingHorizontal: 22,
        paddingVertical: 16,
    },
    optionHeaderText: {
        color: colors.surface,
        fontSize: 13,
        fontWeight: '800',
        letterSpacing: 1.5,
        textTransform: 'uppercase',
    },
    optionHeaderClose: {
        color: colors.surface,
        fontSize: 22,
        fontWeight: '700',
        paddingHorizontal: 8,
    },
    optionRow: {
        paddingVertical: 20,
        paddingHorizontal: 22,
        backgroundColor: colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: colors.line,
    },
    optionRowPressed: {
        backgroundColor: '#E7EEF7',
    },
    optionText: {
        fontSize: 19,
        fontWeight: '700',
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
        fontSize: 18,
        fontWeight: '700',
        color: colors.ink,
    },
    fieldPlaceholderText: {
        flex: 1,
        fontSize: 18,
        fontWeight: '700',
        color: colors.inkSoft,
    },
    chevron: {
        fontSize: 15,
        color: colors.inkSoft,
        marginLeft: 6,
    },
    fieldClear: {
        marginLeft: 6,
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fieldClearText: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.inkSoft,
    },

    // ---- Picker modal (overlay) ----
    modalBackdrop: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(2, 6, 24, 0.45)',
    },
    modalSheet: {
        height: '85%',
        backgroundColor: colors.surface,
        borderTopWidth: 3,
        borderColor: colors.inkBorder,
    },
    modalSearchWrap: {
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderBottomWidth: 2,
        borderBottomColor: colors.line,
    },
    modalSearchInput: {
        height: 52,
        borderWidth: 2,
        borderColor: colors.inkBorder,
        paddingHorizontal: 16,
        fontSize: 18,
        fontWeight: '700',
        color: colors.ink,
        backgroundColor: colors.surface,
    },

    // ---- Kept: used by BottomBar / Divider ----
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 10,
        backgroundColor: colors.brand,
    },
    divider: {
        width: '100%',
        height: 2,
        backgroundColor: '#8FAECF',
    },
})

export default styles
