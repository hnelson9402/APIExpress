import express from 'express'
import port from '../src/config/port.js'
import authRoutes from '../src/routes/auth.routes.js'
import usuarioRoutes from '../src/routes/usuario.routes.js'
import { error } from '../src/config/validatorHNPT.js'

const app = express()

app.use(express.json())

//setting
app.set('port', port)

app.get('/', (req, res) => {
  res.send('Bienvenido a la API')
})

//Routes
app.use('/auth' ,authRoutes);
app.use('/usuario' ,usuarioRoutes);

//Route 404
app.use((req, res, next) => {
  res.status(404).json(error('error', 'Parece que estas perdido, por favor mira la documentación :)'));
})

app.listen(app.get('port'))