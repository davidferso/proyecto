const ControladorIdeas = require('../controllers/idea.controller')
const {authenticate} = require('../config/jwt.config')

module.exports = (app) =>{
    app.get('/api/obtenerideas',  ControladorIdeas.obtenerIdeas ) 
    app.get('/api/obtenerunaidea/:id',  ControladorIdeas.obtenerUnaIdea)
    app.post('/api/crearidea',  ControladorIdeas.crearIdea) 
    app.put('/api/editaridea/:id',  ControladorIdeas.editarIdea)
    app.delete('/api/borraridea/:id',  ControladorIdeas.eliminarIdea)
}