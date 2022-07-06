const Book = require("../models/Book");
const sharp = require('sharp');

class BookService {
    async create(req, res) {
        const {title, author, description, publish_date} = req.body;
        const {picture} = req.files
        console.log(picture)

        const foundBook = await Book.findOne({title});

        if (foundBook) {
            throw new Error(`Book with title ${title} already exists`);
        }

        const imgResized = await sharp(picture.data).resize(329, 502).png().toBuffer();

        const createdBook = await Book.create({title, author, description, publish_date, picture: imgResized});
        return createdBook;
    }

    async getAll() {
        const books = await Book.find();
        return books;
    }

    async getOne(bookId) {
        if(!bookId) {
            throw new Error("Book ID isn\'t defined");
        }

        const book = await Book.findById(bookId)

        if(!book) {
            throw new Error("Book not found")
        }

        return book
    }

}

module.exports = new BookService();