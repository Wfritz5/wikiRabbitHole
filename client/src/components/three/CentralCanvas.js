import React from "react";
import styled from "styled-components";
const Centered = styled.canvas`
display:absolute;
bottom:50vw;
left:50vw;
`;
class CentralCanvas extends React.Component {
    constructor(props){this.titleText = props.title;}

    setText(){
    }

    render (){
        return(
        <Centered id='central'> </Centered>)
    };
}

export default CentralCanvas;
