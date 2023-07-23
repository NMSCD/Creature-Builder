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

export const toggleHtmlNodeClass = (selector: string, className: string, desiredValue?: boolean): void => {
    const htmlTag = document.querySelector(selector);
    if (htmlTag == null) return;

    if (desiredValue != null) {
        const hasClass = htmlTag.classList.contains(className);
        if (desiredValue === false && hasClass != false) {
            htmlTag.classList.remove(className);
        }
        if (desiredValue === true && hasClass != true) {
            htmlTag.classList.add(className);
        }
    }
    else {
        htmlTag.classList.toggle(className);
    }
};
