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

export function TwitterCardSmall({
    title,
    description,
    site,
    image,
}: {
    title?: string;
    description?: string;
    image?: string;
    site?: string;
}) {
    const trimmedDescription = (() => {
        if (!description) return '';
        if (description?.length > 130) {
            return `${description.substr(0, 127)}...`;
        }
        return description;
    })();

    return (
        <Card>
            <ImageContainer>
                <img src={image} alt={title} />
            </ImageContainer>
            <Content>
                <h2>{title}</h2>
                <p>{trimmedDescription}</p>
                <p className="sitename">{site}</p>
            </Content>
        </Card>
    );
}
