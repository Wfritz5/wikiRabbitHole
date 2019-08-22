import React from 'react';
import styled from 'styled-components';
import circle from '../assets/circle.png'

const Slider = styled.input`
position:fixed;
right:1em;
width: 1em;
height:50%;
margin:auto;
z-index:500;
-webkit-appearance: slider-vertical;

`;
const Range = (props) => {

    return (
        <Slider type='range' min='1' max='20' orient="vertical" onChange={(e)=>props.update(e)}/>
    );
}

export default Range;