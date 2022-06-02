# Getting Started with Creature Builder

This is a tool to help people craft NMS creatures by allowing you to select the parts that can be used together.


## Automated Build

[![Build Status](https://dev.azure.com/khaoznet/NMS%20Assistant/_apis/build/status/NMSCD.Creature-Builder?branchName=main)](https://dev.azure.com/khaoznet/NMS%20Assistant/_build/latest?definitionId=82&branchName=main)


## Get started

You need [NodeJS](https://nodejs.org/en/download/)

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

##### Automated CI / CD

- Trigger build and release in Azure DevOps


##### Manual process:

- `PUBLIC_URL="." npm run build` (This is specific to BASH terminal)
- `npm run electron:dist`
