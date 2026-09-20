import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { colors } from './styles'

// Thin down-chevron used on the filter fields.
function Chevron({ size = 20, color = colors.brand }) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
            <Path
                d="M6 9l6 6 6-6"
                stroke={color}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
        </Svg>
    )
}

export default Chevron
