//IMPORT FROM PACKAGES
const express = require("express");
const mongoose = require("mongoose");

//IMPORT FROM OTHER FILES
const authRouter = require("./routes/auth");
const adminRouter = require("./routes/admin");
const productRoute = require("./routes/product");
const userRouter = require("./routes/user");


//INIT SECTION
const PORT = process.env.PORT || 3000;
const app = express();
const DB = "mongodb+srv://amazonclone:flutteramazonclone@cluster0.wz1xedk.mongodb.net/users";

//MIDDLEWARE
app.use(express.json());
app.use(authRouter);
app.use(adminRouter);
app.use(productRoute);
app.use(userRouter);

//CONNECTION
mongoose.connect(DB).then(() => {
    console.log('Connection Successful');
}).catch(e => {
    console.log(e);
});


//LISTENING APP PATH 
app.listen(PORT, "172.17.0.1", () => {
console.log('connected at port ${PORT}');
});

