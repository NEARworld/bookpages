const BookService = require("../service/bookService");

class BookController {
    async createBook (req, res) {
        try {
            const createdBook = await BookService.create(req, res)
            return res.json(createdBook)
        } catch (e) {
            return res.status(500).json({ error: true, message: e.message });
        }
    }

    async getAllBooks (req, res) {
        try {
            const books = await BookService.getAll()
            return res.json(books)
        } catch (e) {
            return res.status(500).json({error: true, message: e.message});
        }
    }

    async getOneBook (req, res) {
        try {
            const book = await BookService.getOne(req.params.id)
            return res.json(book)
        } catch (e) {
            return res.status(500).json({error: true, message: e.message});
        }
    }

}

module.exports = new BookController();