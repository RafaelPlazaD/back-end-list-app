const { Title } = require('chart.js');
const pool = require('../config/dbConfig');

const getAllTasks = async () => {
     
     const connetion = await pool.getConnection();
     const [result] = await connetion.execute('SELECT * FROM tasks');
     const arreglo = await connetion.execute('SELECT * FROM tasks')
     
     console.log(`devolucion de la consulta ${JSON.stringify(arreglo)}`);
     return arreglo;
       
};

const getTasksById = async (id) => {
    const connetion = await pool.getConnection();
    console.log(`el ide en query ${typeof id}`)
    //const idParse = parseInt(id);
    //console.log(`el ide en query ${typeof idParse}`)
    const query = await connetion.execute('SELECT * FROM tasks WHERE task_id = ?',
    [id]);
    console.log(`consulta squl ${JSON.stringify(query)} el ide es este = ${query[0].task_id}`)
    return query;
};

const createTask = async (title, description, due_date) =>{    
    const connetion = await pool.getConnection();
     connetion.execute('INSERT INTO tasks (title, description , due_date) VALUES (?,?,?)',
        [title,description,due_date]);
        const item = await getAllTasks();
    return item;
 
};

const updateTask = async (id, title, description, due_date) => {
    const item = await getTasksById(id);
    if (item.length === o) {
        return null;
    }
    const connetion = await pool.getConnection();
    const query = await connetion.execute('UPDATE tasks SET title = ? , description = ? , due_date = ? WHERE task_id = ?',
    [title, description , due_date]);
    return query;
};


const deleteTask = async (id) => {
   const connetion = await pool.getConnection();
  connetion.execute('DELETE FROM tasks WHERE task_id = ?', [id]);
    
};

module.exports = {
    getAllTasks,
    getTasksById,
    createTask, 
    updateTask,
    deleteTask,
};

    /* try {     
const connetion = await pool.getConnection();
         const connetion = await pool.getConnection();
         await connetion.query('INSERT INTO tasks (title, descri
         connetion.release();
         res.json({message: 'tarea creada exitosamente '});
     } catch (error) {
         res.status(500).json({error: 'error al crear la tarea'}
     }*/
   // const {title , description , dueDate } = req.body;
   

   /* try {
        const connetion = await pool.getConnection();
        await connetion.query('INSERT INTO tasks (title, description, due_date) VALUES (?, ?, ?)', [title, description, dueDate]);
        connetion.release();
        res.json({message: 'tarea creada exitosamente '});
    } catch (error) {
        res.status(500).json({error: 'error al crear la tarea'})
    }*/