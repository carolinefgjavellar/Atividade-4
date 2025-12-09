import express from 'express'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173' }))

app.post('/area', (req, res) => {
  const { forma, medidas } = req.body || {}
  console.log('Dados recebidos:', req.body)

  if (!forma) {
    return res.status(400).json({ message: 'Forma não informada.' })
  }
  if (!medidas || typeof medidas !== 'object') {
    return res.status(400).json({ message: 'Medidas não informadas.' })
  }

  let area
  switch (forma) {
    case 'circulo': {
      const { raio } = medidas
      if (!isNumber(raio)) return res.status(400).json({ message: 'Raio obrigatório.' })
      area = Math.PI * Math.pow(Number(raio), 2)
      break
    }
    case 'retangulo': {
      const { largura, altura } = medidas
      if (!isNumber(largura) || !isNumber(altura)) {
        return res.status(400).json({ message: 'Largura e altura obrigatórias.' })
      }
      area = Number(largura) * Number(altura)
      break
    }
    case 'triangulo': {
      const { base, altura } = medidas
      if (!isNumber(base) || !isNumber(altura)) {
        return res.status(400).json({ message: 'Base e altura obrigatórias.' })
      }
      area = (Number(base) * Number(altura)) / 2
      break
    }
    default:
      return res.status(400).json({ message: 'Forma inválida.' })
  }

  return res.json({ forma, area: round(area) })
})

function isNumber(v) {
  return v !== undefined && v !== null && !isNaN(Number(v))
}

function round(n) {
  return Math.round(n * 1000) / 1000
}

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`GeoTech backend ouvindo em http://localhost:${PORT}`)
})
