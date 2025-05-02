import STATUS_CODE from "../../../constants/statusCode.js";
import Book from "../../books/models/book.schema.js";
import User from "../../users/models/user.schema.js";
import Library from "../models/library.schema.js";
import { uploadImage, deleteImage } from "../../../config/firebaseConfig.js";

class LibraryService {
  async getAllLibraries() {
    const libraries = await Library.find().populate("admin", "name email");
    return libraries;
  }

  async getLibraryById(id) {
    const library = await Library.findById(id).populate("admin", "name email");
    if (!library)
      throw new CustomError("Library not found", STATUS_CODE.NOT_FOUND);

    const books = await Book.find({ library: id })
      .populate("author", "name email")
      .populate("borrower", "name email");

    return { ...library.toObject(), books };
  }

  async createLibrary({ name, location, contact, admin }) {
    const adminUser = await User.findById(admin);
    if (!adminUser)
      throw new CustomError("User not found", STATUS_CODE.BAD_REQUEST);

    const library = await Library.create({ name, location, contact, admin });
    return library;
  }

  async updateLibrary(id, updateData) {
    const library = await Library.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!library)
      throw new CustomError("Library not found", STATUS_CODE.NOT_FOUND);
    return library;
  }

  async deleteLibrary(id) {
    const library = await Library.findById(id);
    if (!library)
      throw new CustomError("Library not found", STATUS_CODE.NOT_FOUND);

    const booksCount = await Book.countDocuments({ library: id });
    if (booksCount > 0)
      throw new CustomError("Library still has books", STATUS_CODE.BAD_REQUEST);

    await library.remove();
    return true;
  }

  async getInventory(id) {
    const library = await Library.findById(id);
    if (!library)
      throw new CustomError("Library not found", STATUS_CODE.NOT_FOUND);

    const books = await Book.find({ library: id, borrower: null }).populate(
      "author",
      "name email"
    );
    return books;
  }

  async addBookToInventory(libraryId, { title, description, author }) {
    const library = await Library.findById(libraryId);
    if (!library)
      throw new CustomError("Library not found", STATUS_CODE.NOT_FOUND);

    const authorUser = await User.findById(author);
    if (!authorUser || authorUser.role !== "author") {
      throw new CustomError("Invalid author", STATUS_CODE.BAD_REQUEST);
    }

    const book = await Book.create({
      title,
      description,
      author,
      library: libraryId,
    });
    return book;
  }

  async removeBookFromInventory(libraryId, bookId) {
    const library = await Library.findById(libraryId);
    if (!library)
      throw new CustomError("Library not found", STATUS_CODE.NOT_FOUND);

    const book = await Book.findOne({ _id: bookId, library: libraryId });
    if (!book)
      throw new CustomError("Book not found in library", STATUS_CODE.NOT_FOUND);

    if (book.borrower)
      throw new CustomError(
        "Book is currently borrowed",
        STATUS_CODE.BAD_REQUEST
      );

    if (book.imageUrl) await deleteImage(book.imageUrl);

    await book.remove();
    return true;
  }
}

const libraryService = new LibraryService();
export default libraryService;
