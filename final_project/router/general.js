const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
    //Write your code here
    let username = req.body.username;
    let password = req.body.password;

    if (username && password) {
        if (!isValid(username)) {
            users.push({ "username": username, "password": password });
            return res.status(200).json({ message: "Customer registered successfully" })
        } else {
            return res.status(404).json({ message: "Customer already exists" })
        }
    }

    return res.status(404).json({ message: "Unable to register customer" });
});

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
    //Write your code here
    await new Promise((resolve, reject) => {
        resolve(res.send(JSON.stringify(books, null, 4)));
    });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    //Write your code here
    const get_books = new Promise((resolve, reject) => {
        const isbn = req.params.isbn;
        resolve(res.send(books[isbn]));
    })
    get_books.then(() => console.log("Promise for task 11 resolved"));
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    //Write your code here
    const get_books = new Promise((resolve, reject) => {
        const author = req.params.author;
        let book = []
        for (key in books) {
            if (books[key].author === author) {
                book.push(books[key])
            }
        }
        resolve(res.send(book));
    })
    get_books.then(() => console.log("Promise for task 12 resolved"));
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    //Write your code here
    const get_books = new Promise((resolve, reject) => {
        const title = req.params.title;
        let book = []
        for (key in books) {
            if (books[key].title === title) {
                book.push(books[key])
            }
        }
        resolve(res.send(book));
    })
    get_books.then(() => console.log("Promise for task 13 resolved"));
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    //Write your code here
    const get_books = new Promise((resolve, reject) => {
        const isbn = req.params.isbn;
        resolve(res.send(books[isbn].reviews))
    })
});

module.exports.general = public_users;
