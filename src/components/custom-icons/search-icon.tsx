import React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

interface IconProps extends SvgProps {
  size?: number
  color?: string
}

export function SearchIcon({
  size = 21,
  color = '#0A1D2E',
  ...props
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 21 21" fill="none" {...props}>
      <Path
        d="M19.6875 18.8984C20.0781 19.2891 20.0781 19.875 19.6875 20.2266C19.5312 20.4219 19.2969 20.5 19.0625 20.5C18.7891 20.5 18.5547 20.4219 18.3594 20.2266L13.125 14.9922C11.7188 16.125 9.96094 16.75 8.08594 16.75C3.63281 16.75 0 13.1172 0 8.625C0 4.17188 3.59375 0.5 8.08594 0.5C12.5391 0.5 16.2109 4.17188 16.2109 8.625C16.2109 10.5391 15.5859 12.2969 14.4531 13.6641L19.6875 18.8984ZM1.875 8.625C1.875 12.1016 4.64844 14.875 8.125 14.875C11.5625 14.875 14.375 12.1016 14.375 8.625C14.375 5.1875 11.5625 2.375 8.125 2.375C4.64844 2.375 1.875 5.1875 1.875 8.625Z"
        fill={color}
      />
    </Svg>
  )
}
