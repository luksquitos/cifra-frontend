import React from 'react'
import Svg, { G, Mask, Path, SvgProps } from 'react-native-svg'

interface ImageIconProps extends SvgProps {
  width?: number
  height?: number
  fill?: string
}

export function ImageIcon({
  width = 32,
  height = 32,
  fill = '#B4DBFF',
  ...props
}: ImageIconProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      {...props}
    >
      <Mask
        id="a"
        style={{
          maskType: 'alpha',
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={2}
        width={32}
        height={28}
      >
        <Path
          d="M11.463 11.621c0 1.841-1.433 3.334-3.2 3.334-1.768 0-3.2-1.493-3.2-3.334 0-1.84 1.432-3.333 3.2-3.333 1.767 0 3.2 1.493 3.2 3.333z"
          fill={fill}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 6c0-1.84 1.433-3.333 3.2-3.333h25.6C30.567 2.667 32 4.159 32 6v20c0 1.84-1.433 3.333-3.2 3.333H3.2c-1.768 0-3.2-1.493-3.2-3.334V6zm3.2-.833h25.6c.441 0 .8.373.8.833v10.387l-6.953-7.054-11.827 12-3.484-3.535L2.4 22.805V6c0-.46.358-.833.8-.833z"
          fill={fill}
        />
      </Mask>
      <G mask="url(#a)">
        <Path fill="#475567" d="M0 0H32V32H0z" />
      </G>
    </Svg>
  )
}
