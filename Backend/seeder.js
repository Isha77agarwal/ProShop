import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors'
import users from './Data/users.js'
import products from './Data/products.js'
import User from './models/userModel.js'
import Products from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async() => {
    try{
        const createdUsers =await User.insertMany(users)
        const adminUser = createdUsers[0]._id
        const sampleProduct = products.map(product => {
            return {...product, user: adminUser}
        })

        await Products.insertMany(sampleProduct)

        console.log("Data Imported".green.inverse)
        process.exit()
    }catch(error) {
        console.log(error)
        process.exit(1)
    }
}

const destroyData = async() => {
    try{
        await User.deleteMany()
        await Products.deleteMany()
        await Order.deleteMany()

        console.log("Data Destroyed".green.inverse)
        process.exit()
    }catch(error) {
        console.log(error)
        process.exit(1)
    }
}

if(process.argv[2] == '-d') {
    destroyData()
} else {
    importData()
}