import express from 'express';
const router = express.Router();
import Student from '../models/student.js';

router.post('/create', async (req, res) => {
    try {
        const { name, age, email, phone, address } = req.body;
        const newStudent = new Student({ name, age, email, phone, address });

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
