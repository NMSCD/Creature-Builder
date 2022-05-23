# Getting Started with Creature Builder

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Get started

YOu need [NodeJS](https://nodejs.org/en/download/)

In the project directory, run: `npm i`


### Running the project locally

`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


---

### How to package into windows installer

- Update the `constant/assistantApps.ts` file with latest build number and whatIsNew guid
- `PUBLIC_URL="." npm run build` (This is specific to BASH terminal)
- `npm run dist`