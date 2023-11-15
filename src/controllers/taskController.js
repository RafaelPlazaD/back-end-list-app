const pool = require('../config/dbConfig');

const getAllTasks = async (req, res) => {
    try {
        const connetion = await pool.getConnection();
        const result = await connetion.query('SELECT * FROM tasks');
        connetion.release();
        res.json(result);
    } catch (error) {
        res.status(500).json({error: 'error al obtener las tareas'});

    }
};

const createTask = async (req , res) =>{
   // const {title , description , dueDate } = req.body;
   

   /* try {
        const connetion = await pool.getConnection();
        await connetion.query('INSERT INTO tasks (title, description, due_date) VALUES (?, ?, ?)', [title, description, dueDate]);
        connetion.release();
        res.json({message: 'tarea creada exitosamente '});
    } catch (error) {
        res.status(500).json({error: 'error al crear la tarea'})
    }*/
};

const updateTask = async (req, res) => {
    const taskId = req.params.id;
    const {title , description , dueDate } = req.body;
    console.log(`actualizar esto biene ${title}`);

    try {
        const connetion = await pool.getConnection();
        await connetion.query('UPDATE tasks SET title=?, description=?, due_date=? WHERE task_id=?', [title, description, dueDate, taskId]);
        connetion.release();
        res.json({message: 'tarea actualizada con exito'});
    } catch (error) {
        res.status(500).json({error: 'error al actualizar la tarea'});
    }
};


const deleteTask = async (req, res) => {
    taskId = req.params.id;

    try {
        const connetion = await pool.getConnection();
        await connetion.query('DELETE FROM tasks WHERE task_id=?', [taskId]);
        connetion.release();
        res.json({message: 'tarea eliminada exitosamente'});

    } catch (error) {
        res.status(500).json({error: 'error al eliminar la tarea'});            
    }
};

module.exports = {
    getAllTasks,
    createTask, 
    updateTask,
    deleteTask,
};

