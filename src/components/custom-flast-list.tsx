import { remapProps } from "nativewind";

function ThirdPartyComponent({ style, contentContainerStyle, ...props }) {
  return (
    <FlatList
      style={style}
      contentContainerStyle={contentContainerStyle}
      {...props}
    />
  )
}

// Call this once at the entry point of your app
remapProps(ThirdPartyComponent, {
  className: 'style',
  contentContainerClassName: 'contentContainerStyle',
})

