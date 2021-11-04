import express from 'express';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { toMarkdown } from 'mdast-util-to-markdown';
import { readFileSync } from 'fs';

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})