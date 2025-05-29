import asyncHandler from "express-async-handler";
import libraryService from "../services/library.service.js";
import STATUS_CODE from "../../../constants/statusCode.js";

class LibraryController {
  getLibraries = asyncHandler(async (req, res) => {
    const libraries = await libraryService.getAllLibraries();
    res.json({
      success: true,
      count: libraries.length,
      data: libraries,
    });
  });

  getLibrary = asyncHandler(async (req, res) => {
    const data = await libraryService.getLibraryById(req.params.id);
    res.json({ success: true, data });
  });

  createLibrary = asyncHandler(async (req, res) => {
    const { name, location, contact, admin } = req.body;
    const library = await libraryService.createLibrary({
      name,
      location,
      contact,
      admin,
    });
    res.status(STATUS_CODE.CREATED).json({ success: true, data: library });
  });

  updateLibrary = asyncHandler(async (req, res) => {
    const updatedLibrary = await libraryService.updateLibrary(
      req.params.id,
      req.body
    );
    res.json({ success: true, data: updatedLibrary });
  });

  deleteLibrary = asyncHandler(async (req, res) => {
    await libraryService.deleteLibrary(req.params.id);
    res.json({ success: true, data: {} });
  });

  getLibraryInventory = asyncHandler(async (req, res) => {
    const books = await libraryService.getInventory(req.params.id);
    res.json({ success: true, count: books.length, data: books });
  });

  addBookToInventory = asyncHandler(async (req, res) => {
    const { title, description, author } = req.body;
    const book = await libraryService.addBookToInventory(req.params.id, {
      title,
      description,
      author,
    });
    res.status(STATUS_CODE.CREATED).json({ success: true, data: book });
  });

  removeBookFromInventory = asyncHandler(async (req, res) => {
    await libraryService.removeBookFromInventory(
      req.params.id,
      req.params.bookId
    );
    res.json({ success: true, data: {} });
  });
}

const libraryController = new LibraryController();
export default libraryController;
