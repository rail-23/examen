import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import proyectRoutes from './routes/proyect.routes'
import { crearRoles } from './libs/iniciarRoles'
import auhtRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import tareaRoutes from './routes/tarea.routes'; 



const app = express()
crearRoles();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors)


app.use('/proyectos',proyectRoutes)
app.use('/auth',auhtRoutes);
app.use('/user',userRoutes)
app.use('/tareas', tareaRoutes); 



export default app; 
///app.js