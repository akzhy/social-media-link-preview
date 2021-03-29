import React from 'react';
import styled from 'styled-components';
import { Card } from './ui';

const ImageContainer = styled.div`
    position: relative;
    height: 0;
    padding-bottom: 30%;
    width: 30%;
    flex-shrink: 0;
    flex-grow: 0;

    img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const Content = styled.div`
    padding: 0.75em;
    display: flex;
    justify-content: center;
    flex-direction: column;

    h2 {
        font-size: 1.1em;
        margin: 0;
        margin-bottom: 0.5em;
    }

    p {
        margin: 0;
        font-size: 1.1em;
        margin-bottom: 0.5em;
    }

    .sitename {
        color: #8899a6;
    }
`;

export function FbCardSmall({
    title,
    site,
    image,
}: {
    title?: string;
    image?: string;
    site?: string;
}) {
    return (
        <Card>
            <ImageContainer>
                <img src={image} alt={title} />
            </ImageContainer>
            <Content>
                <p className="sitename">{site?.toLocaleUpperCase()}</p>
                <h2>{title}</h2>
            </Content>
        </Card>
    );
}
