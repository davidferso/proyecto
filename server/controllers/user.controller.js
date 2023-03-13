const Usuario = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET_KEY

module.exports = {
    registraUsuario: async (req, res) => {
        try {
            const nuevoUsuario = await Usuario.create(req.body)
            const userToken = jwt.sign({ _id: nuevoUsuario._id }, SECRET)
            res
                .status(201)
                .cookie('userToken', userToken, {
                    httpOnly: true,
                    expires: new Date(Date.now() + 90000),
                })
                .json({ successMessage: 'Usuario registrado ', user: nuevoUsuario})
        } catch (error) {
            res.status(401).json({ error: error.message })
        }
    },
    loginUsuario: async (req, res) => {
        try {
            const usuario = await Usuario.findOne({ email: req.body.email })
            if (!usuario) {
                return res.status(400).json({ error: 'Email/Password incorrecto' })
            }
            const passwordValida = await bcrypt.compare(
                req.body.password,
                usuario.password
            )
            if (!passwordValida) {
                return res.status(400).json({ error: 'Email/Password incorrecto' })
            }
            const userToken = jwt.sign({ _id: usuario._id }, SECRET)
            res
                .status(200)
                .cookie('userToken', userToken, {
                    httpOnly: true,
                    expires: new Date(Date.now() + 90000),
                    sameSite: 'none',
                    secure: true,
                })
                .json({ successMessage: 'Usuario conectado', name: usuario.name, alias: usuario.alias, 
            email: usuario.email })
        } catch (error) {
            console.log(error)
            res.status(400).json({ error: error.message })
        }
    },
    logOutUser: (req, res) => {
        res.clearCookie('userToken')
        res.json({ success: 'Usuario desconectado' })
    },
}
