const Categories = require("../models/categories")

const findById = async (id) => {
  try{
    const category = await Categories.findById(id)
    console.log(category);
    return {
      success : true,
      data : category
    }
  }catch(err){
    return {
      success : false,
      err : err.message
    }
  }
}

const findAll = async () => {
  try{
    const categories = await Categories.find()
    return {
      success : true,
      data : categories
    }
  }catch(err){
    return {
      success : false,
      err : err.message
    }
  }
}

const findCategorizedItems = async () => {
  return await Categories.aggregate([
    {
      $lookup: {
        from: "items",
        localField: "_id",
        foreignField: "category",
        as: "items"
      }
    },
    {
      $project: {
        _id: 1,
        name: 1,
        desc: 1,
        imageUrl: 1,
        items: {
          _id: 1,
          name: 1,
          category: 1,
          desc: 1,
        }
      }
    }
  ])
}

const create = async (newCategory) => {
  try{
    const category = await Categories.create(newCategory);
    return {
      success: true,
      data: category
    }
  }catch(err){
    return {
      success : false,
      err : err.message
    }
  }
}

const update = async (cat_id, newCategory) => {
  try{
    const category = await Categories.findById(cat_id)
    category.name = newCategory.name
    category.desc = newCategory.desc
    category.imageUrl = newCategory.imageUrl
    await category.save()
    return {
      success : true,
      data : category
    }
  }catch(err){
    return{
      success : false,
      err : err.message
    }
  }
}

const remove = async (cat_id) => {
  try{
    await Categories.deleteOne({ _id:cat_id})
    return {
      success : true,
      data : "category deleted"
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
  create,
  findCategorizedItems
}