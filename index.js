import express from 'express';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { toMarkdown } from 'mdast-util-to-markdown';
import { readFileSync } from 'fs';
import htmlToPdfmake from "html-to-pdfmake"
import { JSDOM } from 'jsdom';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

const app = express()
const port = 3000

app.get('/getJsonTreeFromMD', (req, res) => {
    const markdownContent = readFileSync("./example.md");
    const markdownTree = fromMarkdown(markdownContent);
    res.json(markdownTree)
});

app.get('/getMDFromJsonTree', (req, res) => {
    const markdownContent = readFileSync("./example.md");
    const markdownTree = fromMarkdown(markdownContent);
    const markdownDisplay = toMarkdown(markdownTree);
    res.setHeader('Content-type', "application/octet-stream");
    res.setHeader('Content-disposition', 'attachment; filename=example.md');
    res.send(markdownDisplay);
});

/**
 * 1. Convert markdown into HTML
 * 2. Convert HTML into Pdfmake JSON structure
 */
app.get('/getJsonForPdfmake', (req, res) => {
  const window = new JSDOM().window;
  remark()
    .use(remarkHtml)
    .process(`# h1 Heading 8-)
      ## h2 Heading`)
    .then((outputHTML) => {
      var jsonData = htmlToPdfmake(String(outputHTML), window);
      res.json(jsonData)
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})