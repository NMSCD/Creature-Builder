<div align="center">

  ![header](./.github/img/GithubHeader.png)
  
  This is a tool to help people craft NMS creatures by allowing you to select the parts that can be used together.

  [![Supported by the No Man's Sky Community Developers & Designers](https://raw.githubusercontent.com/NMSCD/About/master/badge/purple-ftb.svg)][nmscd] <br />
  ![madeWithLove](./.github/img/built-with-love.svg)

  <br /> 
  
  ![React](https://img.shields.io/badge/React%20JS-2C4F7C?style=for-the-badge&logo=react&logoColor=white)
  ![Webpack](https://img.shields.io/badge/Webpack-007ACC?style=for-the-badge&logo=webpack&logoColor=white)
  ![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
  <br/>![Github Actions](https://img.shields.io/badge/Github%20Actions-2088FF?style=for-the-badge&logo=github%20actions&logoColor=white)

</div>

<br />

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

<br />

## Deployment

This site makes use of Github Actions to build the project and Github Pages to host it 💪


<!-- Links used in the page -->

[nmscd]: https://github.com/NMSCD?ref=nmscdCommunitySearch


