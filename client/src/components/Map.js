import React from 'react';
import styled from 'styled-components';

const List = styled.ul`
    position:fixed;
    top:15%;
    display:relative;
    z-index:500;
    margin-left:1em;
    `;
    const Hole = styled.li`
    position:relative;
    height:25px;
    &:hover{
        p{
            opacity:1;
        }
    }
    `;

    const Circle = styled.circle`
    &:hover{
        stroke:red
    }`;

    const SVG =styled.svg`
    display:inline-block;
    `;

    const Label = styled.p`
    opacity:0;
    transition: opacity 0.5s;
    display:inline-block;
    margin:auto 0 auto 5px;
    color:red;
    `;
const Map = (props) => {
    const store = props.store;
    const setState = (e) =>{
        let state = e.target.dataset.state;
        props.update(state);
    }
    return (
        <List>
        {store.map((item,i) => (
            <Hole key={i}>
                <SVG key={i} height={2*(2/(2.0/(i+2)))+6} width={2*(2/(2.0/(i+2)))+6}>
                    <Circle onClick={(e)=>setState(e)} data-state={i}  key={i} cx={(2/(2.0/(i+2)))+3} cy={(2/(2.0/(i+2)))+3} r={2/(2.0/(i+2))} stroke="white" strokeWidth="3" fill="black" fillOpacity="0.3" />
                </SVG>
                <Label>{item.title}</Label>
            </Hole>
            ))
        }
        </List>
    );
}

export default Map;