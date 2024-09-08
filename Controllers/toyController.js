const toyModel = require("../Models/toyModel")
const categoryModel = require("../Models/categoryModel"); 

// מקבל את כל הצעצועים עם דילוג ומיון
async function getAllToys(req, res) {
    const { skipCount = 0, sortField = 'name', sortOrder = 'asc' } = req.query;
    try {
        let listToys = await toyModel.find()
            .skip(parseInt(skipCount)) // דילוג על מספר רשומות
            .sort({ [sortField]: sortOrder === 'asc' ? 1 : -1 }); // מיון לפי שדה וסדר
        res.status(200).json(listToys);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}

async function getToyById(req, res) {
    const { id } = req.params;
    try {
        let oneToy = await toyModel.findById(id);
        res.json(oneToy).status(200)
    }
    catch (e) {
        res.status(400).json({ message: e.message });
    }
}

async function addToy(req, res) {
    try {
        let newToy = req.body;
        let toy = await toyModel.create(newToy);

        // עדכון הקטגוריה עם מזהה הצעצוע החדש
        await categoryModel.findByIdAndUpdate(
            toy.categoryId,
            { $push: { toys: toy._id } },
            { new: true, useFindAndModify: false }
        );

        res.status(200).json(toy);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}
async function deleteToy(req, res) {
    const { id } = req.params;
    try {
        const deleted = await toyModel.findById(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Toy not found' });
        }
        await categoryModel.findByIdAndUpdate(deleted._id, { $pull: { toyModel: deleted._id } });
        await toyModel.deleteOne({ _id: id }); 
        res.status(200).send("toy deleted");
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}

async function updateToy(req, res) {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const updatedToy = await toyModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        if (!updatedToy) {
            return res.status(404).json({ message: 'Toy not found' });
        }
        res.json(updatedToy).status(200);
    }
    catch (e) {
        res.status(400).json({ message: e.message });
    }
}

async function getToysByPrice(req, res) {
    const { min, max } = req.query;
    try {
        let listToys = await toyModel.find({
            price: {$gte: min,$lte: max}})
        res.json(listToys).status(200)
    }
    catch (e) {
        res.status(400).json({ message: e.message });
    }
}

async function getToysByName(req, res) {
    const { name } = req.query;
    if (!name) {
        return res.status(400).json({ message: "Name query parameter is required" });
    }
    try {
        let listToys = await toyModel.find({
            name: {
                $regex: name,
                $options: 'i' // אין חשיבות לאות גדולה או קטנה
            }
        });
        res.status(200).json(listToys);
    } 
    catch (e) {
        res.status(400).json({ message: e.message });
    }
}


module.exports = { getAllToys, getToyById, addToy, deleteToy, updateToy ,getToysByPrice,getToysByName}