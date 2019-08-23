import React, {Component} from 'react';
import styled from 'styled-components';
import circle from '../assets/circle.png'

const Slider = styled.input`
-webkit-appearance: none;
border-radius: 5px;   
background: #d3d3d3;
outline: none;
opacity: 0.7;
-webkit-transition: .2s;
transition: opacity .2s;
position:relative;
height:100%;
width:100%;
-webkit-appearance: slider-vertical;
`;

const Title = styled.span`
color:white;
position:absolute;
display:block;
right:2em;
opacity:0;
transition:opacity 1s;
top:0;
`;

const Label = styled.span.attrs(props => ({
    position:props.position,
}))`
color:red;
position:absolute;
display:block;
right:2em;
opacity:0;
transition:opacity 1s;
bottom:${props => props.position};
`;

const Container =styled.div`
position:fixed;
top:25%;
right:1em;
width: 1em;
height:50%;
margin:1.5em;
z-index:500;
&:hover{
    span{
        opacity:1;
    }
}
`;

class Range extends Component {
    
    constructor(props){
        super(props);
        this.state={position:(window.innerHeight/4),value:(this.props.linkLength/2),visible:0}

    }
    handleChange = (e) => {
        this.props.update(e);
        let val = e.target.value;
        let pos = val / this.props.linkLength;
        let bot = (pos * (window.innerHeight/2))-10 + "px";
        this.setState({position: bot,
                        value:val})
        console.log(this.props.linkLength)
        console.log(e.target.value)
    }

    render(){
    return (
        <Container >
        <Title># of results</Title>
        <Label  position={this.state.position}>{this.state.value}</Label>
        <Slider type='range' min='0'  defaultValue={this.props.linkLength/2} max={this.props.linkLength} orient="vertical" onChange={(e)=>this.handleChange(e)}/>
        </Container>
    );}
}

export default Range;