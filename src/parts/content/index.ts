type ResponseObj = Record<
    'og' | 'twitter' | 'common',
    {
        [x: string]: string;
    }
>;

chrome.runtime.onMessage.addListener(function (request, _, sendResponse) {
    if (request.action === 'get-meta-values') {
        const metaElements = document.head.querySelectorAll('meta');
        const obj: ResponseObj = {
            og: {},
            twitter: {},
            common: {
                title: document.title,
            },
        };
        metaElements.forEach((node) => {
            const property = node.getAttribute('property');
            const name = node.getAttribute('name');
            if (property) {
                if (property.startsWith('og:')) {
                    obj.og[property] = node.getAttribute('content') as string;
                }
            } else if (name) {
                if (name.startsWith('twitter:')) {
                    obj.twitter[name] = node.getAttribute('content') as string;
                }
            }
        });
        sendResponse({ data: obj });
    }
});
