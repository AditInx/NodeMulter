import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const studentSchema = new Schema({
    name:{type:String},
    age:{type: Number},
    email:{type:String, unique: true},
    phone:{type:String},
    address:{type:String},
    photo:{type:String}  // Store base64 encoded data
})

const Student =  mongoose.model('Student',studentSchema);

export default Student;