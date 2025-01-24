const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/product.route');
const cartRoutes = require('./routes/cart.router');
const adminRoutes = require('./routes/admin.router')
const cors = require('cors');

const app = express();


// Middleware
app.use(express.json());
app.use(cors());


  const connectDB = async () => {
    try {
        const mongoURI = 'mongodb+srv://pruthviraj:pruthvi@cluster0.un7y4du.mongodb.net/produtcartpro'
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1); // Exit process on failure
    }
};

// Connect to MongoDB
connectDB();

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/admin',adminRoutes)

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})

