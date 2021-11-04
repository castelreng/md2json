import express from 'express';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { toMarkdown } from 'mdast-util-to-markdown';
import { readFileSync } from 'fs';
import htmlToPdfmake from "html-to-pdfmake"
import { JSDOM } from 'jsdom';

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

app.get('/getJsonForPdfmake', (req, res) => {
  const window = new JSDOM().window;
  var jsonData = htmlToPdfmake(`
    <div>
      <h1>My title</h1>
      <p>
        This is a sentence with a <strong>bold word</strong>, <em>one in italic</em>,
        and <u>one with underline</u>. And finally <a href="https://www.somewhere.com">a link</a>.
      </p>
    </div>
  `, window);

  res.json(jsonData)
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})