const path = require('path');
const HandlebarsPlugin = require("handlebars-webpack-plugin");
const moveFile = require('@npmcli/move-file');

const bundleFileName = 'bundle';
const dirName = 'public';
const distPath = path.resolve(__dirname, dirName);

const jsDirName = 'public/assets/js';
const jsDistPath = path.resolve(__dirname, jsDirName);

const packageVersion = require('./package.json').version || '1.0.0';

const moveNonHtmlHandlebarGeneratedFile = (filename, handlebarFilename, newName) => {
    const newFileName = (newName != null) ? `${distPath}/${newName}` : `${distPath}/${filename}`;
    if (handlebarFilename.includes(`${filename}.html`)) {
        moveFile(`${distPath}/${filename}.html`, newFileName)
            .then(() => console.log(`The ${filename} file has been renamed`))
            .catch(() => console.error(`The ${filename} file was NOT renamed`));
    }
}

module.exports = (env, argv) => {
    return {
        mode: argv.mode === "production" ? "production" : "development",
        entry: [
            './seo/lib/custom.js',
        ],
        output: {
            filename: bundleFileName + '.js',
            path: jsDistPath,
            library: 'CreatureBuilder',
            // libraryTarget: 'window'
        },
        plugins: [
            new HandlebarsPlugin({
                // path to hbs entry file(s). Also supports nested directories if write path.join(process.cwd(), "app", "src", "**", "*.hbs"),
                entry: path.join(process.cwd(), "seo", "handlebar", "*.hbs"),
                // output path and filename(s). This should lie within the webpacks output-folder
                // if ommited, the input filepath stripped of its extension will be used
                output: path.join(distPath, "[name].html"),
                // you can also add a [path] variable, which will emit the files with their relative path, like
                // output: path.join(process.cwd(), "build", [path], "[name].html"),

                // // data passed to main hbs template: `main-template(data)`
                // data: require("./webpack/data/project.json"),
                // or add it as filepath to rebuild data on change using webpack-dev-server
                data: path.join(__dirname, "seo/data/project.json"),

                // globbed path to partials, where folder/filename is unique
                partials: [
                    path.join(process.cwd(), "seo", "handlebar", "*", "*.hbs")
                ],

                // register custom helpers. May be either a function or a glob-pattern
                helpers: {
                    nameOfHbsHelper: Function.prototype,
                    sectionclass: require("./seo/handlebar/helpers/sectionclass.helper"),
                    urlref: require("./seo/handlebar/helpers/urlref.helper"),
                    loud: require("./seo/handlebar/helpers/loud.helper"),
                    date: require("./seo/handlebar/helpers/date.helper"),
                    handleshortcode: require("./seo/handlebar/helpers/shortcode.helper"),
                    workitemclass: require("./seo/handlebar/helpers/workitemclass.helper"),
                    version: require("./seo/handlebar/helpers/version.helper")(packageVersion)
                },

                // hooks
                // getTargetFilepath: function (filepath, outputTemplate) {},
                // getPartialId: function (filePath) {}
                onBeforeSetup: function (Handlebars) { },
                onBeforeAddPartials: function (Handlebars, partialsMap) { },
                onBeforeCompile: function (Handlebars, templateContent) { },
                onBeforeRender: function (Handlebars, data, filename) { },
                onBeforeSave: function (Handlebars, resultHtml, filename) { },
                onDone: function (Handlebars, filename) {
                    moveNonHtmlHandlebarGeneratedFile('web.config', filename);
                    moveNonHtmlHandlebarGeneratedFile('htaccess', filename, '.htaccess');
                    moveNonHtmlHandlebarGeneratedFile('sitemap.xml', filename);
                    moveNonHtmlHandlebarGeneratedFile('opensearch.xml', filename);
                    moveNonHtmlHandlebarGeneratedFile('humans.txt', filename);
                }
            }),
        ],
    };
};