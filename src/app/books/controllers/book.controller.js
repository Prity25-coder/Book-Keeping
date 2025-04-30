import STATUS_CODE from "../../../constants/statusCode.js";
import asyncHandler from "express-async-handler";
import bookService from "../services/book.service.js";


class BookController {
  getBooks = asyncHandler(async (req, res) => {
    const books = await bookService.getAllBooks();

    res.json({
      success: true,
      count: books.length,
      data: books,
    });
  });

  getBook = asyncHandler(async (req, res) => {
    const book = await bookService.getBookById(req.params.id);

    if (!book) {
      res.status(STATUS_CODE.NOT_ALLOWED);
      throw new Error("Book not found");
    }

    res.json({
      success: true,
      data: book,
    });
  });

  createBook = asyncHandler(async (req, res) => {
    const book = await bookService.createBook(req.body, req.file);

    res.status(STATUS_CODE.CREATED).json({
      success: true,
      data: book,
      message: "Book created successfully",
    });
  });

  updateBook = asyncHandler(async (req, res) => {
    const updatedBook = await bookService.updateBook(
      req.params.id,
      req.body,
      req.file
    );

    res.json({
      success: true,
      data: updatedBook,
    });
  });

  deleteBook = asyncHandler(async (req, res) => {
    await bookService.deleteBook(req.params.id);

    res.json({
      success: true,
      message: "Book deleted successfully",
    });
  });
}

const bookController = new BookController();
export default bookController;
