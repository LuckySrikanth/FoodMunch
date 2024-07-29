const mongoose = require("mongoose");

exports.connectDb = async () => {
  await mongoose.connect(process.env.MOONGOOSE_DB).then(() => {
    console.log("Db Connected Successfull");
  });
};
