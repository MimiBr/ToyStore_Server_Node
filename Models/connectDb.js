const mongoose = require('mongoose')
// Replace the uri string with your connection string.
const uri ="mongodb+srv://mimibr:325336295@toy.fqbqd.mongodb.net/"

const connectDB = async () => {
    await mongoose.connect(uri);
};
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
})
database.once('connected', () => {
    console.log('Database Connected');
})
module.exports=connectDB;