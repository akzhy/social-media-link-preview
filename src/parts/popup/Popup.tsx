import React, { useEffect, useState } from 'react';
import { TwitterCardSmall } from './components/twittercardsmall';
import styled, { createGlobalStyle } from 'styled-components';
import { TwitterCardLarge } from './components/twittercardlarge';
import { FbCardSmall } from './components/fbcardsmall';
import { FbCardMedium } from './components/fbcardmedium';
import { FbCardLarge } from './components/fbcardlarge';
import { Button, StatusLabel } from './components/ui';

interface MetaData {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    author?: string;
    site?: string;
}

type Data = Record<'og' | 'twitter', MetaData>;

type Status = 'loading' | 'error' | 'ready';

const Container = styled.div`
    width: 500px;
    margin: 0;
    color: #292f33;
    font-size: 14px;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    line-height: 1.3em;

    section::nth-child(odd) {
        background-color: #f0f0f0;
    }

    section:nth-child(even) {
        background-color: #eee;
    }
`;

const Section = styled.section`
    width: 100%;
    margin: 0;
    padding: 3em 1em;

    & > h2 {
        margin-left: 0.4em;
    }
`;

const Item = styled.div`
    margin-top: 22px;

    & > p {
        font-size: 1.3em;
    }
`;

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body::-webkit-scrollbar {
        width: 0.6em;
    }
    
    body::-webkit-scrollbar-track {
        background-color: #d4d4d4;
    }
    
    body::-webkit-scrollbar-thumb {
        background-color: #616161;
    }
`;

const Popup = () => {
    const [state, setState] = useState<Data>({
        og: {},
        twitter: {},
    });

    const [status, setStatus] = useState<Status>('loading');

    useEffect(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (!tabs[0] || !tabs[0].id) {
                return;
            }

            const siteUrl = new URL(tabs[0].url as string).hostname;

            chrome.tabs.sendMessage(
                tabs[0].id,
                { action: 'get-meta-values' },
                (response) => {
                    const lastError = chrome.runtime.lastError;

                    if (lastError) {
                        setStatus('error');
                        return;
                    }

                    const resultData: Data = {
                        og: {
                            title: 'Untitled',
                            site: siteUrl,
                            image: './broken.png',
                            description: '',
                        },
                        twitter: {
                            title: 'Untitled',
                            site: siteUrl,
                            image: './broken.png',
                            description: '',
                        },
                    };

                    if (response.data) {
                        setStatus('ready');
                        const ogResponseData = response.data.og;
                        console.log(response.data);
                        resultData.og.title = response.data.common.title;

                        for (let ogType in ogResponseData) {
                            switch (ogType) {
                                case 'og:title':
                                    resultData.og.title =
                                        ogResponseData[ogType];
                                    break;
                                case 'og:description':
                                    resultData.og.description =
                                        ogResponseData[ogType];
                                    break;
                                case 'og:image':
                                    resultData.og.image =
                                        ogResponseData[ogType];
                                    break;
                                default:
                                    break;
                            }
                        }

                        resultData.twitter = resultData.og;

                        const twitterResponseData = response.data.twitter;

                        for (let twType in twitterResponseData) {
                            switch (twType) {
                                case 'twitter:title':
                                    resultData.twitter.title =
                                        twitterResponseData[twType];
                                    break;
                                case 'twitter:description':
                                    resultData.twitter.description =
                                        twitterResponseData[twType];
                                    break;
                                case 'twitter:image':
                                    resultData.twitter.image =
                                        twitterResponseData[twType];
                                    break;
                                default:
                                    break;
                            }
                        }

                        setState(resultData);
                    } else {
                        setStatus('error');
                    }
                }
            );
        });
    }, []);

    const onReload = () => {
        chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
                if (tabs[0].id) {
                    chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
                }
            }
        );
    };

    return (
        <Container>
            <GlobalStyle />
            {(() => {
                if (status === 'loading') {
                    return (
                        <StatusLabel>
                            <p>Fetching data...</p>;
                        </StatusLabel>
                    );
                } else if (status === 'error') {
                    return (
                        <StatusLabel>
                            An error occured while fetching data. Try reloading
                            the page.
                            <Button onClick={onReload}>Reload</Button>
                        </StatusLabel>
                    );
                } else {
                    return (
                        <React.Fragment>
                            <Section>
                                <h2>Twitter</h2>
                                <Item>
                                    <TwitterCardSmall {...state.twitter} />
                                </Item>
                                <Item>
                                    <TwitterCardLarge {...state.twitter} />
                                </Item>
                            </Section>
                            <Section>
                                <h2>Facebook</h2>
                                <Item>
                                    <FbCardSmall {...state.og} />
                                </Item>
                                <Item>
                                    <FbCardMedium {...state.og} />
                                </Item>
                                <Item>
                                    <FbCardLarge {...state.og} />
                                </Item>
                            </Section>
                        </React.Fragment>
                    );
                }
            })()}
        </Container>
    );
};

export default Popup;
