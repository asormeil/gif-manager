# GIF Manager

GIF Manager is a Redux-based application for managing GIFs. It allows users to save, remove, and search for GIFs. This README provides an overview of the project, installation instructions, usage guidelines, and information about the project's structure.

## Features

- Save GIFs: Users can save GIFs to their collection.
- Remove GIFs: Users can remove GIFs from their collection.
- Search GIFs: Users can search for GIFs using a search query.
- Pagination: The search results are paginated, with a configurable number of GIFs per page.

## Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/asormeil/gif-manager.git

2. Navigate to the project directory:

```shell
cd gif-manager
```
3. Install the dependencies:

```shell
npm install
```

4. Start the development server:

```shell
npm run dev
```

This will launch the application on http://localhost:5173.

## Usage
- Saving a GIF: To save a GIF, click on the "Save" button associated with the GIF. The GIF will be added to your collection of saved GIFs.
- Removing a GIF: To remove a GIF from your collection, click on the "Remove" button associated with the GIF. The GIF will be removed from your collection.
- Searching for GIFs: Enter a search query in the search bar and press Enter or click the "Search" button. The search results will be displayed with pagination controls at the bottom.

The project structure is organized as follows:
```shell
├── public/              # Public assets and HTML template
├── src/                 # Source code
│   ├── components/      # React components
│   ├── actions/         # Redux actions
│   ├── reducers/        # Redux reducers
│   ├── store/           # Redux store configuration
│   └── index.js         # Entry point
└── package.json         # Project dependencies and scripts
```


- The public/ directory contains public assets such as the HTML template and favicon.
- The src/ directory contains the source code for the application.
- The components/ directory contains React components responsible for rendering the UI.
- The actions/ directory contains Redux action creators for dispatching actions.
- The reducers/ directory contains Redux reducers for managing the application state.
- The store/ directory contains the Redux store configuration.
- The index.js file is the entry point of the application.
- The package.json file lists the project dependencies and provides scripts for building and running the application.



## Contributing

Contributions are welcome! If you would like to contribute to this project, please follow these steps:

Fork the repository.
Create a new branch for your feature or bug fix.
Make your changes and commit them with descriptive commit messages.
Push your changes to your forked repository.
Submit a pull request detailing your changes.


