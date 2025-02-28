const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// Create a new task
const createTask = async (req, res) => {
    const { title, description, status, due_date } = req.body;
    try {
        const task = await prisma.tasks.create({
            data: {
                title,
                description,
                status,
                due_date,
            }
        });
        res.status(200).json({
            status: "ok",
            message: `Task with title ${task.title} created successfully`,
            taskId: task.id,  // ส่งกลับ id ของ task ที่ถูกสร้าง
        });
    } catch (err) {
        console.error("Error creating task:", err);
        res.status(500).json({
            status: "error",
            message: "Error creating task",
            error: err.message,
        });
    }
};


// Get all tasks
const getTasks = async (req, res) => {
    try {
        const tasks = await prisma.tasks.findMany();
        res.status(200).json(tasks);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "error",
            message: "Error fetching tasks",
            error: err.message,
        });
    }
};

// Get a task by task_id
const getTask = async (req, res) => {
    const id = req.params.id;  // รับ ID จาก URL params
    try {
        const task = await prisma.tasks.findUnique({
            where: { id: Number(id) },  // ใช้ id เป็นการค้นหางาน
        });
        if (!task) {
            res.status(404).json({ message: "Task not found" });  // ถ้าไม่เจองาน
        } else {
            res.status(200).json(task);  // ส่งข้อมูลงานกลับไป
        }
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
            error: err.message,
        });
    }
};

// Update a task by task_id
const updateTask = async (req, res) => {
    const { title, description, status, due_date } = req.body;
    const { id } = req.params;
    const data = {};

    if (title) data.title = title;
    if (description) data.description = description;
    if (status) data.status = status;
    if (due_date) data.due_date = due_date;

    if (Object.keys(data).length === 0) {
        return res.status(400).json({
            message: "No data provided",
            status: "error"
        });
    }

    try {
        const task = await prisma.tasks.update({
            data: data,
            where: { id: Number(id) },  // ใช้ id แทน task_id
        });

        res.status(200).json({
            status: "OK",
            message: `Task with id ${task.id} is updated successfully`,
            task: task,
        });
    } catch (err) {
        if (err.code === "P2002") {
            res.status(400).json({
                status: "error",
                message: "Task already exists",  // หากมีงานที่มีข้อมูลซ้ำ
            });
        } else if (err.code === "P2025") {
            res.status(404).json({
                status: "error",
                message: `Task with id = ${id} not found`,  // หากไม่พบงาน
            });
        } else {
            console.error("Update task error:", err);
            res.status(500).json({
                status: "error",
                message: "Error while updating the task",
            });
        }
    }
};

// Delete a task by task_id
const deleteTask = async (req, res) => {
    const id = req.params.id;  // รับ ID ของงานจาก URL params
    try {
        // ตรวจสอบว่ามี task หรือไม่
        const existingTask = await prisma.tasks.findUnique({
            where: { id: Number(id) },  // ค้นหางานที่มี id
        });

        // ถ้าไม่เจอ task
        if (!existingTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        // ถ้ามี task
        await prisma.tasks.delete({
            where: { id: Number(id) },  // ลางานที่มี id
        });

        res.status(200).json({
            status: "OK",
            message: `Task with id ${id} is deleted successfully`,
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Error while deleting the task",
            error: err,
        });
    }
};

module.exports = {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask,
};
