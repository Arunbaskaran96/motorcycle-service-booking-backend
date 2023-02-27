const mongoose=require("mongoose")


mongoose.connect("mongodb+srv://admin:Capstone@cluster0.6asroom.mongodb.net/?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true },
(err) => {
    if (err) {
      console.log("error", err);
    } else {
      console.log("CONNECTED");
    }
  }
  )