const express=require("express")
const app=express()
const bodyparser=require("body-parser")
const cors=require("cors")

app.use(bodyparser.json())
app.use(cors())
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));


const UserController=require("./Controllers/Auth/SigninController")
const LoginController=require("./Controllers/Auth/LoginController")
const BookingController=require("./Controllers/BookingController")
const ServiceTypeController=require("./Controllers/ServiceTypeController")
const EmployerController=require("./Controllers/EmployerController")
const ReviewController=require("./Controllers/ReviewController")


app.use("/",UserController)
app.use("/",LoginController)
app.use("/",BookingController)
app.use("/",ServiceTypeController)
app.use("/",EmployerController)
app.use("/",ReviewController)





module.exports=app