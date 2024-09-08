const  express =require("express")
const router = express.Router()
const toyController=require("../Controllers/toyController")
const autorition=require("../middelwares/autorition")

router.get('/getAllToys', toyController.getAllToys)
router.get('/getToyById/:id', toyController.getToyById)
router.post('/addToy',autorition.createToken, toyController.addToy)
router.delete('/deleteToy/:id',autorition.createToken, toyController.deleteToy)
router.put('/updateToy/:id',autorition.createToken, toyController.updateToy)
router.get('/getToysByPrice', toyController.getToysByPrice)
router.get('/getToysByName', toyController.getToysByName)

module.exports=router