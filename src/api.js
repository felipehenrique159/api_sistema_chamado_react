const express = require('express')
const cors = require('cors')
const axios = require('axios')
const serverLess = require('serverless-http')

const app = express()
app.use(cors())

app.listen(3002)

const router = express.Router()

router.get('/buscaDadosReceita/:cnpj',async(req,res)=>{
    try {
      const dados = await axios.get('http://www.receitaws.com.br/v1/cnpj/'+req.params.cnpj)
        return res.send(dados.data)
    } catch (error) {
        return res.send(error)
    }
})

router.get('/',(req,res)=>{
   res.send('api is working')
})

app.use('/.netlify/functions/api',router)

module.exports.handler = serverLess(app)