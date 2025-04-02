import { css, styled } from 'styled-components/native'

export const StyledButton = styled.TouchableOpacity`
    ${({ theme }) => css`
        background-color: ${theme.COLORS.GRAY_100};
    `}
    
`
