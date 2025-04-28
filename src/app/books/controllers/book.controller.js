import Book from "../models/book.schema.js";
import User from "../../users/models/user.schema.js";
import Library from "../../libraries/models/library.schema.js";

import { asyncHandler } from "async-handler-express";

import translate from "../../../common/services/translation.service.js";


const getBooks = asyncHandler(async (req, res) => {
  const lang = req.headers["accept-language"] || "en";
  const books = await Book.find()
    .populate("author", "name email")
    .populate("library", "name location")
    .populate("borrower", "name email");

  res.json({
    success: true,
    count: books.length,
    data: books,
    message: translate("booksRetrieved", lang),
  });
});

const getBook = asyncHandler(async (req, res) => {
  const lang = req.headers["accept-language"] || "en";
  const book = await Book.findById(req.params.id)
    .populate("author", "name email")
    .populate("library", "name location contact")
    .populate("borrower", "name email");

  if (!book) {
    res.status(404);
    throw new Error("bookNotFound");
  }

  res.json({
    success: true,
    data: book,
    message: translate("bookRetrieved", lang),
  });
});

const createBook = asyncHandler(async (req, res) => {
  const lang = req.headers["accept-language"] || "en";
  const { title, description, author, library } = req.body;

  // Check if author exists and is actually an author
  const authorUser = await User.findById(author);
  if (!authorUser || authorUser.role !== "author") {
    res.status(400);
    throw new Error("invalidAuthor");
  }

  // Check if library exists
  const libraryExists = await Library.findById(library);
  if (!libraryExists) {
    res.status(400);
    throw new Error("libraryNotFound");
  }

  let imageUrl = "";
  if (req.file) {
    imageUrl = await uploadImage(req.file);
  }

  const book = await Book.create({
    title,
    description,
    author,
    library,
    imageUrl,
  });

  res.status(201).json({
    success: true,
    data: book,
    message: translate("bookAdded", lang),
  });
});

const updateBook = asyncHandler(async (req, res) => {
  const lang = req.headers["accept-language"] || "en";
  let book = await Book.findById(req.params.id);

  if (!book) {
    res.status(404);
    throw new Error("bookNotFound");
  }

  let imageUrl = book.imageUrl;
  if (req.file) {
    // Delete old image if exists
    if (book.imageUrl) {
      await deleteImage(book.imageUrl);
    }
    imageUrl = await uploadImage(req.file);
  }

  book = await Book.findByIdAndUpdate(
    req.params.id,
    { ...req.body, imageUrl },
    { new: true, runValidators: true }
  );

  res.json({
    success: true,
    data: book,
    message: translate("bookUpdated", lang),
  });
});

const deleteBook = asyncHandler(async (req, res) => {
  const lang = req.headers["accept-language"] || "en";
  const book = await Book.findById(req.params.id);

  if (!book) {
    res.status(404);
    throw new Error("bookNotFound");
  }

  // Delete image from Firebase if exists
  if (book.imageUrl) {
    await deleteImage(book.imageUrl);
  }

  await book.remove();

  res.json({
    success: true,
    data: {},
    message: translate("bookDeleted", lang),
  });
});

export { getBooks, getBook, createBook, updateBook, deleteBook };
