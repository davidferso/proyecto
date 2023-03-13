const Ideas = require('../models/idea.model')

const obtenerIdeas = (req, res)=>{
    Ideas.find(req.body)
    .then((resultado)=>{
        res.json(resultado)
    }).catch((error)=>{
        console.log(error)
    })
}

const obtenerUnaIdea = (req, res)=>{
    Ideas.findById(req.params.id)
    .then((resultado)=>{
        res.json(resultado)
    }).catch((error)=>{
        console.log(error)
    })
}

const crearIdea =  (req, res)=>{
    Ideas.create(req.body)
    .then((resultado)=>{
        console.log(req.body)
        res.json(resultado)
    }).catch((error)=>{
        console.log(error)
        // res.json(error)
        res.status(400).json(error)
    })
}

const editarIdea = (req, res)=>{
    Ideas.updateOne({_id: req.params.id}, req.body, {runValidators:true})
    .then((resultado)=>{
        console.log(req.body)
        res.json(resultado)
    }).catch((error)=>{
        console.log(error)
        res.status(400).json(error)
    })
}


const eliminarIdea = (req, res)=>{
    Series.deleteOne({_id: req.params.id})
    .then((resultado)=>{
        res.json(resultado)
    }).catch((error)=>{
        console.log(error)
    })
}

module.exports = {
    obtenerIdeas,
    obtenerUnaIdea,
    crearIdea,
    editarIdea,
    eliminarIdea
}