const Prices = require("../models/prices");

const findAll = async () => {
  try{
      const prices = await Prices.find();
      return {
          success: true,
          data: prices
      }
  }catch(e){
      return {
          success: false,
          Error: e.message
      }
  }
}

const create = async (newPrice) => {
    try{
        const createdPrice = await Prices.create(newPrice);
        return {
            success: true,
            data: createdPrice
        }
    }catch (e){
        return{
            success: false,
            Error: e.message
        }
    }
}

const update = async (_price) => {
    try{
        const price = await Prices.findById(_price.id);
        price.price = _price.price
        price.source = _price.source
        await price.save()
        return{
            success: true,
            data: price
        }
    }catch(e){
        return{
            success: false,
            Error: e.message
        }
    }
}

const remove = async (id) => {
  try{
    await Prices.deleteOne({_id: id})
    return{
        success: true,
        Data: "Deleted"
    }
  }catch(e){
    return {
          success: false,
          Error: e.message
      }
  }
}

const removeAll = async (id) => {
    try{
        await Prices.deleteMany({ product: id });
        return{
            success: true,
            Data: "Deleted"
        }
    }catch(e){
      return {
            success: false,
            Error: e.message
        }
    }
}

const findById = async (id) => {
    try {
        return await Prices.findById(id)
    } catch (err) {
        return {
        error: err.message
        }
    }
}

const findByPid = async (id) => {
    try {
        return await Prices.find({ product: id }).exec();
    } catch (err) {
        return {
        error: err.message
        }
    }
}


module.exports = {
  update,
  remove,
  removeAll,
  findAll,
  create,
  findById,
  findByPid,
}