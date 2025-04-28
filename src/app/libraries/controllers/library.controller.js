
import translate from "../../../common/services/translation.service.js";

import User from "../../users/models/user.schema.js";
import Book from "../../books/models/book.schema.js";
import Library from "../models/library.schema.js";

import { asyncHandler } from "async-handler-express";

const getLibraries = asyncHandler(async (req, res) => {
  const lang = req.headers["accept-language"] || "en";
  const libraries = await Library.find().populate("admin", "name email");

  res.json({
    success: true,
    count: libraries.length,
    data: libraries,
    message: translate("librariesRetrieved", lang),
  });
});

const getLibrary = asyncHandler(async (req, res) => {
  const lang = req.headers["accept-language"] || "en";
  const library = await Library.findById(req.params.id).populate(
    "admin",
    "name email"
  );

  if (!library) {
    res.status(404);
    throw new Error("libraryNotFound");
  }

  // Get all books in this library with borrower details
  const books = await Book.find({ library: library._id })
    .populate("author", "name email")
    .populate("borrower", "name email");

  res.json({
    success: true,
    data: {
      ...library.toObject(),
      books,
    },
    message: translate("libraryRetrieved", lang),
  });
});

const createLibrary = asyncHandler(async (req, res) => {
  const lang = req.headers["accept-language"] || "en";
  const { name, location, contact, admin } = req.body;

  // Check if admin exists
  const adminUser = await User.findById(admin);
  if (!adminUser) {
    res.status(400);
    throw new Error("userNotFound");
  }

  const library = await Library.create({
    name,
    location,
    contact,
    admin,
  });

  res.status(201).json({
    success: true,
    data: library,
    message: translate("libraryAdded", lang),
  });
});

const updateLibrary = asyncHandler(async (req, res) => {
  const lang = req.headers["accept-language"] || "en";
  const library = await Library.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!library) {
    res.status(404);
    throw new Error("libraryNotFound");
  }

  res.json({
    success: true,
    data: library,
    message: translate("libraryUpdated", lang),
  });
});

const deleteLibrary = asyncHandler(async (req, res) => {
  const lang = req.headers["accept-language"] || "en";
  const library = await Library.findById(req.params.id);

  if (!library) {
    res.status(404);
    throw new Error("libraryNotFound");
  }

  // Check if there are books in this library
  const booksCount = await Book.countDocuments({ library: library._id });
  if (booksCount > 0) {
    res.status(400);
    throw new Error("libraryHasBooks");
  }

  await library.remove();

  res.json({
    success: true,
    data: {},
    message: translate("libraryDeleted", lang),
  });
});

const getLibraryInventory = asyncHandler(async (req, res) => {
  const lang = req.headers["accept-language"] || "en";
  const library = await Library.findById(req.params.id);

  if (!library) {
    res.status(404);
    throw new Error("libraryNotFound");
  }

  const books = await Book.find({
    library: library._id,
    borrower: null,
  }).populate("author", "name email");

  res.json({
    success: true,
    count: books.length,
    data: books,
    message: translate("inventoryRetrieved", lang),
  });
});

const addBookToInventory = asyncHandler(async (req, res) => {
  const lang = req.headers["accept-language"] || "en";
  const library = await Library.findById(req.params.id);

  if (!library) {
    res.status(404);
    throw new Error("libraryNotFound");
  }

  const { title, description, author } = req.body;

  // Check if author exists and is actually an author
  const authorUser = await User.findById(author);
  if (!authorUser || authorUser.role !== "author") {
    res.status(400);
    throw new Error("invalidAuthor");
  }

  const book = await Book.create({
    title,
    description,
    author,
    library: library._id,
  });

  res.status(201).json({
    success: true,
    data: book,
    message: translate("bookAddedToInventory", lang),
  });
});

const removeBookFromInventory = asyncHandler(async (req, res) => {
  const lang = req.headers["accept-language"] || "en";
  const library = await Library.findById(req.params.id);

  if (!library) {
    res.status(404);
    throw new Error("libraryNotFound");
  }

  const book = await Book.findOne({
    _id: req.params.bookId,
    library: library._id,
  });

  if (!book) {
    res.status(404);
    throw new Error("bookNotFoundInLibrary");
  }

  // Check if book is currently borrowed
  if (book.borrower) {
    res.status(400);
    throw new Error("bookIsBorrowed");
  }

  // Delete image from Firebase if exists
  if (book.imageUrl) {
    await deleteImage(book.imageUrl);
  }

  await book.remove();

  res.json({
    success: true,
    data: {},
    message: translate("bookRemovedFromInventory", lang),
  });
});

export {
  getLibraries,
  getLibrary,
  createLibrary,
  updateLibrary,
  deleteLibrary,
  getLibraryInventory,
  addBookToInventory,
  removeBookFromInventory,
};
