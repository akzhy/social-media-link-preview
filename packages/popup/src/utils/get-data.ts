import type { Data } from "./types";

export const getData = () => {
  return new Promise<Data>((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs[0] || !tabs[0].id) {
        return;
      }

      const siteUrl = new URL(tabs[0].url as string).hostname;

      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "get-meta-values" },
        (response) => {
          const lastError = chrome.runtime.lastError;
          // An error will be shown in the content script has not been injected
          if (lastError) {
            console.log(lastError);
            reject("error");
            return;
          }

          // Set default values
          const resultData: Data = {
            og: {
              title: "Untitled",
              site: siteUrl,
              image: "./broken.png",
              description: "",
            },
            twitter: {
              title: "Untitled",
              site: siteUrl,
              image: "./broken.png",
              description: "",
            },
          };

          if (response.data) {
            const ogResponseData = response.data.og;
            resultData.og.title = response.data.common.title;

            for (let ogType in ogResponseData) {
              switch (ogType) {
                case "og:title":
                  resultData.og.title = ogResponseData[ogType];
                  break;
                case "og:description":
                  resultData.og.description = ogResponseData[ogType];
                  break;
                case "og:image":
                  resultData.og.image = ogResponseData[ogType];
                  break;
                default:
                  break;
              }
            }

            // Twitter will fallback to open graph if twitter specific cards are not found
            resultData.twitter = resultData.og;

            const twitterResponseData = response.data.twitter;

            for (let twType in twitterResponseData) {
              switch (twType) {
                case "twitter:title":
                  resultData.twitter.title = twitterResponseData[twType];
                  break;
                case "twitter:description":
                  resultData.twitter.description = twitterResponseData[twType];
                  break;
                case "twitter:image":
                  resultData.twitter.image = twitterResponseData[twType];
                  break;
                default:
                  break;
              }
            }

            resolve(resultData);
          } else {
            reject("error");
          }
        }
      );
    });
  });
};
