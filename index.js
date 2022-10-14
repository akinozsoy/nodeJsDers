// var http= require("http");
// var fs= require("fs");

// var server = http.createServer((req,res ) =>{
//     if(req.url == "/"){
//         fs.readFile("index.html",(err,html) =>{
//             res.write(html);
//             res.end();

//         });

//     }else if(req.url == "/products"){
//         fs.readFile("urunler.html",(err,html) =>{
//             res.write(html);
//             res.end();
//         });
//     }else{
//         fs.readFile("404.html" ,(err,html) =>{
//             res.write(html);
//             res.end();
//         });

//     }
// });

// server.listen(3000, () =>{
//   https://www.youtube.com/watch?v=0hZNdTogNo0  console.log("node.js server at port 3000");
// });

const db = require("./data/db");
const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.static("node_modules"));

const data = [
  {
    id: 1,
    name: "iphone 14",
    price: 30000,
    isActive: true,
    isHome: true,
    imageUrl: "1.jpg",
  },
  {
    id: 2,
    name: "iphone 15",
    price: 40000,
    isActive: false,
    isHome: false,
    imageUrl: "2.jpg",
  },
  {
    id: 3,
    name: "iphone 16",
    price: 50000,
    isActive: true,
    isHome: true,
    imageUrl: "3.png",
  },
  {
    id: 4,
    name: "iphone 17 Plus",
    price: 60000,
    isActive: false,
    isHome: false,
    imageUrl: "4.jpg",
  },
];

app.use("/products/:id", function (req, res) {
  const urun = data.find((u) => u.id == req.params.id);
  res.render("product-details", urun);
});
app.use("/products", function (req, res) {
  db
    .execute("selec * from products")
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log)(err);
  res.render("products", {
    urunler: data,
  });
});
app.use("/", function (req, res) {
  res.render("index", {
    urunler: data,
  });
});

app.listen(3000, () => {
  console.log("Listening on 3000 port ");
});
