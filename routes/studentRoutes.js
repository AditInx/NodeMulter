import express from 'express';
import Student from '../models/student.js';
import multer from 'multer';

const router = express.Router();

//Set up multer to store files in upload folder
// const storage = multer.diskStorage({
//     destination: (req,file,cb)=>{
//         cb(null, 'uploads/');
//     },
//     filename: (req,file,cb)=>{
//         const suffix = Date.now();
//         cb(null,suffix + '-' + file.originalname);
//     }
// })

// Use memory storage (for small images)
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/create', upload.single('photo'), async (req, res) => {
    try {
        const { name, age, email, phone, address } = req.body;
        
        if (!req.file) {
            return res.status(400).json({ error: 'Photo upload failed' });
        }

        const photoBase64 = req.file.buffer.toString('base64');

        const newStudent = new Student({ name, age, email, phone, address, photo: photoBase64 });

        await newStudent.save();

        return res.status(201).json({ 
            message: 'Student created successfully', 
            student: newStudent 
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;