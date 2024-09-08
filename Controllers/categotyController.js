
// const categoryModel = require("../Models/categoryModel")
// const toyModel = require("../Models/toyModel");

// async function getAllCategories(req, res) {
//     try {
//         const listCategory = await categoryModel.find().populate({
//             path: 'toys',
//             select: 'name'
//         });
            
//         res.status(200).json(listCategory);
//     } catch (e) {
//         res.status(400).json({ message: e.message });
//     }
// }
const categoryModel = require("../Models/categoryModel");

async function getAllCategories(req, res) {
    try {
        const listCategory = await categoryModel.find().populate({
            path: 'toys', // שם השדה צריך להיות נכון כפי שמוגדר בסכמה של הקטגוריות
            select: 'name' // ניתן לשנות את השדות הרצויים
        });
        
        res.status(200).json(listCategory);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}

async function createCategory(req, res) {
    try {
        let newCategory = req.body
        let category = await categoryModel.create(newCategory)
        res.json(category).status(200)
    }
    catch (e) {
        res.status(400).json({ message: e.message });
    }
}

module.exports = {getAllCategories,createCategory}


