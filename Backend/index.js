import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import BookModel from './Models/BookModel.js';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const username = 'mendusantoshi216';
const password = 'Santu@12345';
const clusterName = 'bookapp';
const dbName = 'bookdatabase';



const url = `mongodb+srv://${encodeURIComponent(username)}:${encodeURIComponent(password)}@${clusterName}.huyf0l4.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Bookapp`;


mongoose.connect(url)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server connected and listening on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); 
  });

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Bookstore API');
});

// get all books
app.get('/books', async (req, res) => {
  try {
    const books = await BookModel.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//get data from id
app.get('/books/:id', async (req, res) => {
  try {
    const book = await BookModel.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//insert nee book data 
app.post('/books', async (req, res) => {
  try {
    const newBook = new BookModel(req.body);
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//update the record
app.put('/books/:id', async (req, res) => {
  try {
    const updatedBook = await BookModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//delete the record
app.delete('/books/:id', async (req, res) => {
  try {
    const deletedBook = await BookModel.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

