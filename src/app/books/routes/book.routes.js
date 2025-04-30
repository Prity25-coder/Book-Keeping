import { Router } from "express";
import bookController from "../controllers/book.controller.js";

const bookRouter = Router();

// /api/books

bookRouter.get("/", bookController.getBooks);

bookRouter.get("/:id", bookController.getBook);

bookRouter.post("/", bookController.createBook);

bookRouter.put("/:id", bookController.updateBook);

bookRouter.delete("/:id", bookController.deleteBook);

export default bookRouter;
