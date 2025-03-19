import express from 'express';
const router = express.Router();
import Student from '../models/student.js';
import multer from 'multer';

//Set up multer to store files in upload folder
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, 'uploads/');
    },
    filename: (req,file,cb)=>{
        const suffix = Date.now();
        cb(null,suffix + '-' + file.originalname);
    }
})

const upload = multer({storage});

router.post('/create', upload.single('photo'), async (req, res) => {
    try {
        const { name, age, email, phone, address } = req.body;
        const photopath = req.file ? req.file.path : null; // Get the file path if uploaded
        const newStudent = new Student({ name, age, email, phone, address,photo: photopath });

        await newStudent.save();

        return res.status(201).json({ 
            message: 'Student created successfully', 
            student: newStudent 
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
