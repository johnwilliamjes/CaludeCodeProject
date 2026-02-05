# React Calculator App

A modern, fully functional calculator built with React.

## Features

- Basic arithmetic operations (+, -, *, /)
- Decimal point support
- Clear function (AC)
- Sign change (±)
- Percentage calculation (%)
- Responsive design
- Modern UI with smooth animations

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The app will open in your browser at `http://localhost:3000`

## Build

To create a production build:
```bash
npm run build
```

The build files will be in the `dist` folder.

## Project Structure

```
app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Button.js
│   │   ├── ButtonPanel.js
│   │   └── Display.js
│   ├── App.js
│   ├── index.js
│   └── styles.css
├── package.json
└── webpack.config.js
```

## Usage

- Click number buttons to enter numbers
- Click operator buttons (+, -, *, /) to perform operations
- Click = to calculate the result
- Click AC to clear all
- Click ± to change sign
- Click % to convert to percentage
- Click . to add decimal point
