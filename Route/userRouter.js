const  express =require("express")
const router = express.Router()
const autorition=require("../middelwares/autorition")


router.post('/login',autorition.auth, userController.login)
router.post('/createUser',autorition.auth, userController.addUser)


module.exports=router