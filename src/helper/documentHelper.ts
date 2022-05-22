export const setChakraToDarkMode = () => {
    const htmlElems = document.getElementsByTagName('html');
    if (htmlElems != null) {
        for (let htmlIndex = 0; htmlIndex < htmlElems.length; htmlIndex++) {
            const htmlElem = htmlElems[htmlIndex];
            htmlElem.setAttribute("data-theme", "dark");
            htmlElem.setAttribute("style", "color-scheme: dark;");
        }
    }


    const bodyElems = document.getElementsByTagName('body');
    if (bodyElems != null) {
        for (let bodyIndex = 0; bodyIndex < bodyElems.length; bodyIndex++) {
            const bodyElem = bodyElems[bodyIndex];
            bodyElem.setAttribute("class", "chakra-ui-dark");
        }
    }
}