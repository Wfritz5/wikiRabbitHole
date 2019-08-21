import React from 'react';
import styled from 'styled-components';

const Map = (props) => {
    const List = styled.ul`
    position:fixed;
    display:relative;
    z-index:1000;
    margin-left:1em;
    `;
    const Hole = styled.li`
    position:relative;
    width:26px;
    height:26px;
    &:hover{
        circle{
            stroke:red;
        }
    }
    `;

    const store = props.store;
    let margin = 0;
    const setState = (e) =>{
        console.log(e.target);
        let state = e.target.dataset.state;
        props.update(state);
    }
    return (
        <List>
        {store.map((item,i) => (
            <Hole key={i}>
                <svg key={i} height="100" width="100" data-state={i} onClick={(e)=>setState(e)}>
                    <circle key={i} cx={53-2*(i)} cy={53-2*(i)} r={50-2*(i)} stroke="white" strokeWidth="3" fill="none" />
                </svg>
            </Hole>
            ))
        }
        </List>
    );
}

export default Map;