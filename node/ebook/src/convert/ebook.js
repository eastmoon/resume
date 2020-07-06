const fs = require("fs");
const path = require("path");
const shell = require("shelljs");
const convert = require('ebook-convert');

// ----------- Declare variable -----------

// Declare path and remove old data
const htmlPath = path.join(process.cwd(), 'build', 'tmp-ebook-html');
const pdfPath = path.join(process.cwd(), 'build', 'pdf');

// see more options at https://manual.calibre-ebook.com/generated/en/ebook-convert.html
var options = {
    input: path.join(htmlPath, 'index.html'),
    output: path.join(pdfPath, `personal-resume-overview.pdf`),
    authors: '"Jacky Chen"',
    customSize: "12.8x18.05",
    disableFontRescaling: true,
    pdfPageMarginTop: '0',
    pdfPageMarginBottom: '0',
    pdfPageMarginRight: '0',
    pdfPageMarginLeft: '0',
    pageBreaksBefore: '"//h:h1 | //div[contains(@style, "page-break-after")]"',
    chapter: '//h:h1',
}

// ----------- Execute Script -----------

//create ebook by options
convert(options, function (err) {
    if (err) console.log(err);
});
