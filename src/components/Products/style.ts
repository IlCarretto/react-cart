import styled from "styled-components";

// Card style
export const Card = styled.div`
background-color: white;
width: 200px;
height: 100%;
min-height: 300px;
border: 1px solid black;
border-radius: 10px;
margin-bottom: 2rem;
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