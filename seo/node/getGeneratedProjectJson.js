const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

async function generateFullJson() {
    let fullJson = {};

    const siteDataContentsPromise = readFile('./seo/data/site.json', 'utf8');
    const cspPromise = readFile('./seo/data/csp.json', 'utf8');

    const siteDataContents = await siteDataContentsPromise;
    const cspContents = await cspPromise;

    const siteData = JSON.parse(siteDataContents);
    const cspContent = JSON.parse(cspContents);
    const headerList = cspContent.options.map(opt => 
        opt.name + 
        ((opt.values != null && opt.values.length > 0) ? ' ' : '') + 
        opt.values.join(' ')
    );
    const header = headerList.join('; ') + ';';

    fullJson = { 
        ...siteData,
        headers: [
            ...cspContent.headers.map(csp => ({ "name": csp, "value": header })),
            ...siteData.headers,
        ],
    };

    fs.writeFile('./seo/data/project.json', JSON.stringify(fullJson), ['utf8'], () => { });
}

generateFullJson();
