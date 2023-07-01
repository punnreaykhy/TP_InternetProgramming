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
        const price = Prices.findById(_price._id);
        price.price = _price.price
        price.source = _price.source
        price.save()
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

module.exports = {
  update,
  remove,
  findAll,
  create,
}