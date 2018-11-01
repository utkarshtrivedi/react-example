import React from 'react';

export function Square(props) {
    const className = props.highLight ? 'square red' : 'square';
    return (
        <button className={className} onClick={props.onClick}>
            {props.value}
        </button>
    );
}
