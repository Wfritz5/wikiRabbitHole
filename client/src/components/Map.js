import React from 'react';
import styled from 'styled-components';

const Map = (props) => {
    const List = styled.ul`
    position:fixed;
    top:15%;
    display:relative;
    z-index:1000;
    margin-left:1em;
    `;
    const Hole = styled.li`
    position:relative;
    width:100px;
    height:25px;
    &:hover{
        circle{
            stroke:red;
        }
    }
    `;
    const SVG =styled.svg`
    display:block;
    margin:auto;
    `;

    const store = props.store;
    const setState = (e) =>{
        console.log(e.target);
        let state = e.target.dataset.state;
        props.update(state);
    }
    return (
        <List>
        {store.map((item,i) => (
            <Hole key={i}>
                <SVG key={i} height={2*(2/(2.0/(i+2)))+6} width={2*(2/(2.0/(i+2)))+6} data-state={i} onClick={(e)=>setState(e)}>
                    <circle key={i} cx={(2/(2.0/(i+2)))+3} cy={(2/(2.0/(i+2)))+3} r={2/(2.0/(i+2))} stroke="white" strokeWidth="3" fill="black" fillOpacity="0.3" />
                </SVG>
            </Hole>
            ))
        }
        </List>
    );
}

export default Map;