const sequelize = require("./database/connect_db");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const Book = require("../models/books");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

sequelize.sync().then(res => console.log("dkl")).catch(err => console.log(err)); //This method converts the Javascript objects to SQL Tables.

// GET All Books
app.get("/",async (req,res,next) => {
    const books = await Book.findAll(); //Returns all the books from the Table
    res.send(books);
});

//GET a book by specific ID
app.get("/:id",async (req,res,next) => {
    const bookId = parseInt(req.params.id);
    console.log(bookId);
    const book = await Book.findAll({
        where:{
            id:bookId
        }
    });

    if(Object.keys(book).length === 0)
        res.status(500).send({msg:"No book exists by this particular ID!!"});
    else
        res.send(book);
});

// Add a new Book to the directory of Books
app.post("/",async (req,res,next) => {
    console.log("Hey into post");
    console.log(req.body);
    console.log("type of price : " + typeof(req.body.price));
    const {name,author,price} = req.body;
    if(price != parseInt(price)){
        res.status(500).send({msg:"Please enter a valid price!!"});
    }else{
        const insertedBook = await Book.create({name:name,author:author,price:price});
        res.status(200).send({msg:"Sucessfully inserted a book into the database!!"});
    }
});

//Update opertaion to update a book.
app.put("/update/:id",async (req,res,next) => {
    const bookId = parseInt(req.params.id);
    const {name,author,price} = req.body;
    const book = await Book.findAll({
        where:{
            id:bookId
        }
    });
    console.log(book);
    if(Object.keys(book).length === 0)
        res.status(404).send({msg:"No book exists by this particular ID!!"});
    else{
        if(price != parseInt(price)){
            res.status(500).send({msg:"Please enter a valid price!!"});
        }else{
            const updatedBook = await Book.update({name:name,author:author,price:price},{
                where:{
                    id:bookId
                }
            }); 
            res.status(200).send({msg:"Successfully updated the database!!"});
        }
    }
});

//Delete a specific record from the table
app.delete("/delete/:id",async (req,res,next) => {
    const bookId = parseInt(req.params.id);
    const deletedBook = await Book.destroy({
        where:{
            id:bookId
        }
    });
    // res.send("Book deleted successfully!!");
});

//delete all the records
app.delete("/delete",async (req,res,next) => {
    const deletedBooks = await Book.destroy({
        truncate:true
    });
    // res.send("All Books deleted successfully!!");
});

app.listen(3000,() => {
    console.log("Server listening on Port 3000!!");
});