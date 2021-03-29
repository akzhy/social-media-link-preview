import styled from 'styled-components';

export const Card = styled.div`
    border-radius: 0.85em;
    display: flex;
    overflow: hidden;
    width: 100%;
    border: 1px solid #e1e8ed;
    background: #fff;
`;

export const StatusLabel = styled.div`
    padding: 2em;
    background-color: #e1e8ed;
    border-radius: 0.85em;
    margin: 1em;
    text-align: center;
`;

export const Button = styled.button`
    background: rebeccapurple;
    padding: 0.8em 1.4em;
    margin: 0.5em 0;
    color: #fff;
    border: 0;
    border-radius: 8px;
    display: inline-block;
    cursor: pointer;
`;
