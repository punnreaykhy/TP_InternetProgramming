
const Products = require("../models/products")
var mongoose = require('mongoose');

const findById = async (id) => {
    const products = await Products.aggregate([
        {
            "$match": {
                _id: mongoose.Types.ObjectId(id),
            }
        },
        {
            $lookup: {
                from: "prices",
                localField: "_id",
                foreignField: "product",
                as: "prices"
            }
        }
    ])

    if (!products?.length)
        return null

    return products[0]
}

const findAll = async (category = '', item = '') => {
    let matchCond = {};
    if (category) matchCond['category'] = mongoose.Types.ObjectId(category)
    if (item) matchCond['item'] = mongoose.Types.ObjectId(item)

    const products = await Products.aggregate([
        {
            "$match": matchCond
        },
        {
            $lookup: {
                from: "prices",
                localField: "_id",
                foreignField: "product",
                as: "prices"
            },

        },
        {
            $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "category"
            },
        },
        {

            $lookup: {
                from: "items",
                localField: "item",
                foreignField: "_id",
                as: "item"
            }
        },
        { "$unwind": "$category" },
        { "$unwind": "$item" },
    ])

    if (!products?.length)
        return []

    return products
}

const create = async (newProduct) => {
    const createdProduct = await Products.create(newProduct);
    return createdProduct;
}

const update = async (id, newProduct) => {
    try {
        const product = await Products.findById(id)
        product.title = newProduct.title;
        product.category = newProduct.category
        product.item = newProduct.item
        product.imageUrl = newProduct.imageUrl
        product.desc = newProduct.desc
        await product.save()
        return {
            success: true,
            data: product
        };
    } catch (err) {
        return {
            success: false,
            error: err.message
        }
    }

}

const remove = async (id) => {
    try {
        await Products.deleteOne({ _id: id })
        return {
            success: true,
            data: "product deleted"
        }
    } catch (err) {
        return {
            success: false,
            err: err.message
        }
    }
}

module.exports = {
    findById,
    update,
    remove,
    findAll,
    create
}