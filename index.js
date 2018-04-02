// 1. Serving html files from JS Azure Function App
// https://www.eliostruyf.com/returning-other-types-data-like-html-via-javascript-azure-functions/

// 2. Serving up multiple static files from Function App
// https://anthonychu.ca/post/azure-functions-static-file-server/

// 3. Extracting extension out of filename
// https://stackoverflow.com/questions/10865347/node-js-get-file-extension

/** A function app that serves up a static client web app that is hosted in Azure */

const fs = require('fs');
const path = require('path');
const mime = require('mime-types');

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function on processed a request.');

    // if we didn't explicitly provide a fileName or no fileName at all, return index.html
    var fileName = req.query.fileName !== undefined && req.query.fileName !== '' ? req.query.fileName : 'index.html';

    context.log('file that will be served : ' + fileName);

    var res = {
        body: "",
        headers: {
            "Content-Type": mime.lookup(fileName)
        }
    };

    var actualFilePath = 'www/' + fileName;

    var absoluteActualFilePath = path.resolve(__dirname, actualFilePath);

    context.log('serving up file from : ' + absoluteActualFilePath);

    fs.readFile(path.resolve(__dirname, actualFilePath), (err, htmlContent) => {
        res.body = htmlContent;
        context.res = res;
        context.done();
    });
};