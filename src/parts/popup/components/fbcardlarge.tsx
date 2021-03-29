import React from 'react';
import styled from 'styled-components';
import { Card } from './ui';

const CardColumn = styled(Card)`
    flex-direction: column;
`;

const ImageContainer = styled.div`
    position: relative;
    height: 0;
    padding-bottom: 60%;
    width: 100%;
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
        color: #8899a6;
    }

    .sitename {
        color: #8899a6;
    }
`;

export function FbCardLarge({
    title,
    site,
    image,
    description,
}: {
    title?: string;
    image?: string;
    site?: string;
    description?: string;
}) {
    const trimmedDescription = (() => {
        if (!description) return '';
        if (description?.length > 100) {
            return `${description.substr(0, 97)}...`;
        }
        return description;
    })();

    return (
        <CardColumn>
            <ImageContainer>
                <img src={image} alt={title} />
            </ImageContainer>
            <Content>
                <p className="sitename">{site?.toLocaleUpperCase()}</p>
                <h2>{title}</h2>
                <p>{trimmedDescription}</p>
            </Content>
        </CardColumn>
    );
}
