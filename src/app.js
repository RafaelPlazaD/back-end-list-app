const express = require('express');
const app = express();
const port = 4500;
const taskRoutes = require('./routes/taskRoutes');
const taskController = require('./controllers/taskController')
const pool = require('./config/dbConfig');

app.use(express.json());



app.get('/tasks',taskController.getAllTasks);
//app.post('/tasks',taskController.createTask);
app.post('/tasks', async (req , res) =>{
    console.log(`este es titulo ${req.body.title}`);
     const {title , description , dueDate } = req.body;
 
  try {
      const connetion = await pool.getConnection();
      await connetion.query('INSERT INTO tasks (title, description) VALUES (?, ?, ?)', ['desallunar', 'desallunar papas y huvos']);
      connetion.release();
      res.json({message: 'tarea creada exitosamente '});
  } catch (error) {
      res.status(500).json({error: 'error al crear la tarea'})
  }

});
app.put('/tasks/:id', taskController.updateTask);
app.delete('/tasks/:id', taskController.deleteTask);

app.listen(port , () => {
    console.log(`funcionando . ingresar http://localhost:${port}`);
});

