const Items = require("../models/items")

const findById = async (id) => {
  try {
    const item = await Items.findById(id)
    return {
      success: true,
      data: item
    };
  } catch (err) {
    return {
      success: false,
      error: err.message
    }
  }
}

const findAll = async ()=>{
  try {
    const items = await Items.find()
    return {
      success: true,
      data: items
    };
  } catch (err) {
    return {
      success: false,
      error: err.message
    }
  }
}

const create = async (newItem) => {
  try {
    const item = await Items.create(newItem)
    return {
      success: true,
      data: item
    };
  } catch (err) {
    return {
      success: false,
      error: err.message
    }
  }
}

const update = async (item_id, newItem) => {
  try{
    const item = await Items.findById(item_id)
    item.name = newItem.name
    item.category = newItem.category
    item.desc = newItem.desc
    await item.save()
    return {
      success: true,
      data: item
    };
  } catch (err) {
    return {
      success: false,
      error: err.message
    }
  }

}

const remove = async (item_id) => {
  try{
    await Items.deleteOne({ _id:item_id})
    return {
      success : true,
      data : "item deleted"
    }
  }catch(err){
    return {
      success : false,
      err : err.message
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