import Library from "../../libraries/models/library.schema.js";
import User from "../../users/models/user.schema.js";
import Book from "../models/book.schema.js";

import { uploadImage, deleteImage } from "../../../config/firebaseConfig.js";

class BookService {
  async getAllBooks() {
    return await Book.find()
      .populate("author", "name email")
      .populate("library", "name location")
      .populate("borrower", "name email");
  }

  async getBookById(id) {
    return await Book.findById(id)
      .populate("author", "name email")
      .populate("library", "name location contact")
      .populate("borrower", "name email");
  }

  async createBook(data, file) {
    const { title, description, author, library } = data;

    if (!title || !description || !author || !library) {
      throw new Error("Missing required book fields");
    }

    const authorUser = await User.findById(author);
    if (!authorUser || authorUser.role !== "author") {
      throw new Error("Invalid author");
    }

    const libraryExists = await Library.findById(library);
    if (!libraryExists) {
      throw new Error("Library not found");
    }

    let imageUrl = "";
    if (file) {
      imageUrl = await uploadImage(file); //todo
    }

    const book = await Book.create({
      title,
      description,
      author,
      library,
      coverImageUrl: imageUrl,
    });

    return book;
  }

  async updateBook(id, data, file) {
    const book = await Book.findById(id);
    if (!book) {
      throw new Error("Book not found");
    }

    let imageUrl = book.coverImageUrl;
    if (file) {
      if (imageUrl) {
        await deleteImage(imageUrl);
      }
      imageUrl = await uploadImage(file);
    }

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { ...data, coverImageUrl: imageUrl },
      { new: true, runValidators: true }
    );

    return updatedBook;
  }

  async deleteBook(id) {
    const book = await Book.findById(id);
    if (!book) {
      throw new Error("Book not found");
    }

    if (book.coverImageUrl) {
      await deleteImage(book.coverImageUrl);
    }

    await book.deleteOne();
    return { message: "Book deleted successfully" };
  }
}

const bookService = new BookService();
export default bookService;
