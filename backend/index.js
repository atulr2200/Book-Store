import express from "express";
import mysql from "mysql";
import cors from "cors";

const app=express()

const db=mysql.createConnection({
    host: 'localhost',
    port: 3366,
    user:"root",
    password:"",
    database:"demo"
});

app.use(express.json())
app.use(cors())

app.get("/",(req, res)=>{
    res.json("hello Atul")
})
app.get("/books",(req, res)=>{
    const q="SELECT * FROM books"
    db.query(q,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data)
    })
})

app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`, `desc`, `cover`, `price`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price
    ];

    db.query(q, [values], (err, data) => {
        if (err) {
            console.error("Error during book insertion:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json("Book has been stored");
    });
});

app.delete("/books/:id",(req, res)=>{
        const bookId=req.params.id;
        const q="DELETE FROM books WHERE id=?";
        
        db.query(q, [bookId], (err, data) => {
            if (err) {
                console.error("Error during book insertion:", err);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            return res.json("Book has been created successful");
        });
})

app.put("/books/:id",(req, res)=>{
    const bookId=req.params.id;
    const q="UPDATE books SET `title`=?,`desc`=?,`cover`=?,`price`=? WHERE id=?";
    
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price
    ];

    db.query(q, [...values,bookId], (err, data) => {
        if (err) {
            console.error("Error during book insertion:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json("Book has been updated successful");
    });
})

app.listen(8800,()=>{
    console.log("connected atul");
})