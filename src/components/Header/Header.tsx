import React from 'react'
import styled from 'styled-components'

const Box = styled.div`
height: 100px;
display: flex;
align-items: center;
justify-content: center;
`

const Header = () => {
  return (
    <Box>
      <h1>STORE LOGO</h1>
    </Box>
  )
}

export default Header