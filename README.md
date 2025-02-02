# Social Media Link Preview

Social Media Link Preview is a browser extension that shows a sample preview of how a webpage appears when its link is shared on social media platforms such as Facebook and Twitter.

The extension fetches Open Graph and Twitter meta tags to replicate the behavior.

![Sample Screenshot](./screenshot.png)

## Download

Check the [releases page](https://chrome.google.com/webstore/detail/social-media-link-preview/dlmoajpiphhokgbbfaiiekhlgpjnjfei/) to download the latest version.

## Development

### Installation

Clone the repository and install dependencies:

```sh
yarn
yarn dev
```

This project follows a monorepo approach:

- `packages/popup` contains the Svelte files for the popup UI.
- `packages/scripts` contains the content script and background script.

### Building for Production

To generate the production build, run:

```sh
yarn build
```

## Adding the Extension to a Chromium-Based Browser

To load the extension manually in Chrome, Edge, or Brave:

1. Open your browser and navigate to `chrome://extensions/`.
2. Enable **Developer Mode** (toggle in the top-right corner).
3. Click **Load Unpacked**.
4. Select:
   - The **root directory** for development.
   - The **build directory** for the production version (generated using `yarn build`).

## Contributing

All contributions are welcome! 🎉

To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit (`git commit -m "Add feature"`).
4. Push to your branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

Happy coding! 🚀
