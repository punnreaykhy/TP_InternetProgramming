const express = require('express');
const app = express();

app.set('view engine', 'ejs');

// Define the routes
app.get('/', (req, res) => {
    
  const books = [
    { id: 1, title: 'Book 1', author: 'Author 1', summary: 'Summary 1' },
    { id: 2, title: 'Book 2', author: 'Author 2', summary: 'Summary 2' },
    { id: 3, title: 'Book 3', author: 'Author 3', summary: 'Summary 3' },
  ];
  res.render('index', { books });
});

app.get('/detail/:id', (req, res) => {
  const id = req.params.id;
  const book = {
    id,
    title: `Book ${id}`,
    author: `Author ${id}`,
    summary: `Summary ${id}`,
  };
  res.render('detail', { book });
});

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
