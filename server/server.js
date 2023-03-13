const cors = require('cors')
const express = require('express')
const app = express()
const PORT = 8000
require('dotenv').config()
const cookieParser = require('cookie-parser')
const socket = require('socket.io')

const Idea = require('./models/idea.model')

require('./config/mongoose.config')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
const Rutas = require('./routes/idea.routes')
Rutas(app)
const rutasUsuarios = require('./routes/user.routes')
rutasUsuarios(app)
const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})
const io = socket(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})


io.on('connection', (socket) => {
    console.log(" usuario conectado", socket.id)

    // modificar la parte de socket para adecuar a bright ideas

    // socket.on("borrarSerie", (payload) => {
    //     console.log("payload", payload)
    //     Serie.deleteOne({ _id: payload })
    //         .then((res) => {
    //             io.emit('serieBorrada', payload)
    //         }).catch((err) => {
    //             console.log(err, "error al borrar serie")
    //         })
    // })


    socket.on('disconectar', (socket) => {
        console.log(`el usuario con id ${socket.id} acaba de desconectarse`)
    })
})