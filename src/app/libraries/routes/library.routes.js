import { Router } from "express";
import {
  getLibraries,
  getLibrary,
  createLibrary,
  updateLibrary,
  deleteLibrary,
  getLibraryInventory,
  addBookToInventory,
  removeBookFromInventory,
} from "../controllers/library.controller.js";

const libraryRouter = Router();

libraryRouter.get("/", getLibraries);
libraryRouter.post("/", authorizeRoles("admin"), createLibrary);

libraryRouter.get("/:id", getLibrary);
libraryRouter.put("/:id", authorizeRoles("admin"), updateLibrary);
libraryRouter.delete("/:id", authorizeRoles("admin"), deleteLibrary);

// Inventory
libraryRouter.get("/:id/inventory", getLibraryInventory);
libraryRouter.post(
  "/:id/inventory",
  authorizeRoles("admin"),
  addBookToInventory
);

libraryRouter.delete(
  "/:id/inventory/:bookId",
  authorizeRoles("admin"),
  removeBookFromInventory
);

export default libraryRouter;
