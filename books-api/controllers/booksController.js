const Book = require("../models/Book");


const getBooks = async (req, res) => {
  try {
    const filter = {};

    if (req.query.year) {
      filter.publishedYear = Number(req.query.year);
    }

    if (req.query.genre) {
      filter.genre = req.query.genre;
    }

    const books = await Book.find(filter);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const createBook = async (req, res) => {
  try {
    const { title, author, publishedYear, genre } = req.body;

    if (!title || !author) {
      return res.status(400).json({
        message: "Title and author are required"
      });
    }

    const book = await Book.create({title, author, publishedYear, genre});

    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id, req.body,{ new: true, runValidators: true }
    );

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      message: "Book deleted successfully",
      book
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getBooks, getBook,createBook,updateBook, deleteBook };