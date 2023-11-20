const { Router, json } = require('express');
const router = Router();
const querys = require('../controllers/querys');



router.get('/tasks',async (req, res) =>{
    const query = await querys.getAllTasks();
    const tasksWithStringDates = query.map(task => {
        return {
            ...task,
            due_date: task.due_date ? new Date(task.due_date).toISOString() : null
            // O en su defecto puedes usar `toJSON()` en lugar de `toISOString()`
            // due_date: task.due_date ? new Date(task.due_date).toJSON() : null
        };
    });
    
    console.log(`esto tiene la consulta ${JSON.stringify(query)}`)
    return res.status(200).json(tasksWithStringDates);
});

router.get('/tasksId', async (req , res) =>{
    const { id } = req.body;
    console.log(`el id ${id}`);
    
    const query = await querys.getTasksById(id);
   /* if (query.length === 0) {
        return res.status(400).json({message : 'no existe esa tarea con ese id'})
    }*/
    return res.status(200).json(query);
});

router.post('/tasks',async (req, res) =>{
    //console.log(`el body es ${req.body.description}  la fechac es ${req.body.due_date}`)
   // console.log(`El body completo es: ${JSON.stringify(req.body)}  la descricion es = ${req.body.description}`);
    const { title, description, due_date} = req.body;
    const parseDueDate = new Date(due_date);
    const query = await querys.createTask(title, description, parseDueDate);
    return res.status(200).json(query)
});
router.put('/tasks', async (req , res) =>{
    const {id, title, description, due_date} = req.body;
    const query = await querys.updateTask(id, title, description, due_date);
    if (query === null) {
        return res.status(400),json({message: ' tarea no actualizada'});
    }
    return res.status(200).json({message: 'tarea actulizada exitosamente'});
});


router.delete('/tasks', async (req, res ) => {
    const { task_id } = req.body;
    console.log(`el id es ${task_id}`);
    querys.deleteTask(task_id)
   /* if (query === null) {
        return res.status(400).json({message : 'no esta esa tarea'});
    }*/
    return res.status(200).json({message: ' eliminado correctamente'});
});

module.exports = router;


 