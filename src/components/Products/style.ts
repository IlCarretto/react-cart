import styled from "styled-components";

// Card style
export const Card = styled.div`
background-color: white;
border: 1px solid black;
border-radius: 10px;
margin: 1rem 0;
position: relative;
`
export const Img = styled.img`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
max-width: 100%;
max-height: 100%;
`
export const CardText = styled.div`
border-top: 1px solid darkgrey;
`
export const Select = styled.select`
appearance: none;
padding: .5rem 1rem;
border-radius: 5px;
`

export const Button = styled.button`
background-color: #5f729d;
color: white;
padding: .5rem 1rem;
border: none;
border-radius: 5px;
`

export const Label = styled.div`
position: absolute;
top: -10px;
left: -15px;
z-index: 2;
width: 35px;
height: 35px;
border-radius: 50%;
display: flex;
justify-content: center;
align-items: center;
font-size: .8rem;
color: white;
`

export const LastLabel = styled(Label)`
background-color: #b95151;
border: 1px solid blue;
`

export const NormalLabel = styled(Label)`
background-color: #5f729d;
border: 1px solid black;
`