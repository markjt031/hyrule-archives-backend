const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  mongoose.connection
  .on("open", () => console.log("Your are connected to mongoose"))
  .on("close", () => console.log("Your are disconnected from mongoose"))
  .on("error", (error) => console.log(error));

  module.exports={
    Creature: require('./creature'),
    Monster: require('./monster'),
    Material: require('./material'),
    Equipment: require('./equipment'),
    Critter: require('./critter'),
    User: require('./user'),
    Shrine: require('./shrine'),
    Korok: require('./korok')
  }