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
    const handleChange = (e) => {
        props.update(e);
        console.log(props.linkLength)
        console.log(e.target.value)
    }
    return (
        <Slider type='range' min='0' defaultValue={props.linkLength/2} max={props.linkLength} orient="vertical" onChange={(e)=>handleChange(e)}/>
    );
}

export default Range;