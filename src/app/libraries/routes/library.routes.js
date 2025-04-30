import { Router } from "express";
import libraryController from "../controllers/library.controller.js";

const libraryRouter = Router();

// /api/libraries

libraryRouter.get("/", libraryController.getLibraries);

libraryRouter.get("/:id", libraryController.getLibrary);

libraryRouter.post("/", libraryController.createLibrary);

libraryRouter.put("/:id", libraryController.updateLibrary);

libraryRouter.delete("/:id", libraryController.deleteLibrary);

// Library Inventory routes
libraryRouter.get(":id/inventory", libraryController.getLibraryInventory);

libraryRouter.post(":id/inventory", libraryController.addBookToInventory);

libraryRouter.delete(
  ":id/inventory/:bookId",
  libraryController.removeBookFromInventory
);

export default libraryRouter;
