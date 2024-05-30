// here starts

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

// Connecting with mongoDb
//idhr krne h chagnes yaad rkhna.
mongoose.connect("mongodb://localhost:27017/ecommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//  Product schema defined here
const productSchema = new mongoose.Schema({
  productName: String,
  price: Number,
  rating: Number,
  company: String,
});

//model set here
const Product = mongoose.model("Product", productSchema);

app.use(express.json());

// Routes and paths.
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
});

app.get("/products/:productId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: "Product not found" });
  }
});

app.post("/products", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: "Error creating product" });
  }
});

app.put("/products/:productId", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: "Error updating product" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
