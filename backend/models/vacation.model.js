const mongoose =require('mongoose')

const  VacationSchema = new mongoose.Schema(
    {
      target: {
        type:String,
        required: true,
      },
      price: {
        type:Number,
        required:true
      },
      date: {
        type: Date,
        required:true
      },
   
    },
    {
      timestamps: true,
    }
  );
  
  module.exports = mongoose.model("vacations", VacationSchema);