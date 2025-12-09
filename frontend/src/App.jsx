import React, { useState } from 'react'

export default function App() {
  const [forma, setForma] = useState('')
  const [medidas, setMedidas] = useState({})
  const [resultado, setResultado] = useState(null)
  const [erro, setErro] = useState('')

  const camposPorForma = {
    circulo: [{ key: 'raio', label: 'Raio' }],
    retangulo: [
      { key: 'largura', label: 'Largura' },
      { key: 'altura', label: 'Altura' }
    ],
    triangulo: [
      { key: 'base', label: 'Base' },
      { key: 'altura', label: 'Altura' }
    ]
  }

  function onFormaChange(e) {
    const value = e.target.value
    setForma(value)
    setMedidas({})
    setResultado(null)
    setErro('')
  }

  function onMedidaChange(key, value) {
    setMedidas(prev => ({ ...prev, [key]: value }))
  }

  async function calcularArea() {
    setErro('')
    setResultado(null)

    if (!forma) {
      setErro('Selecione uma forma geométrica.')
      return
    }

    const campos = camposPorForma[forma] || []
    for (const campo of campos) {
      const v = medidas[campo.key]
      if (v === undefined || v === '' || isNaN(Number(v))) {
        setErro('Preencha todos os campos com números válidos.')
        return
      }
    }

    try {
      const resp = await fetch('http://localhost:3000/area', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ forma, medidas: toNumbered(medidas) })
      })

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}))
        setErro(err.message || 'Erro ao calcular a área.')
        return
      }

      const json = await resp.json()
      setResultado(json)
    } catch (e) {
      setErro('Falha na comunicação com o servidor.')
    }
  }

  function toNumbered(obj) {
    const out = {}
    for (const k of Object.keys(obj)) out[k] = Number(obj[k])
    return out
  }

  const campos = forma ? camposPorForma[forma] : []

  return (
    <div style={{ maxWidth: 520, margin: '40px auto', fontFamily: 'system-ui' }}>
      <h1>GeoTech - Calculadora de Áreas</h1>

      <label>
        Forma:
        <select value={forma} onChange={onFormaChange} style={{ marginLeft: 8 }}>
          <option value="">Selecione...</option>
          <option value="circulo">Círculo</option>
          <option value="retangulo">Retângulo</option>
          <option value="triangulo">Triângulo</option>
        </select>
      </label>

      {campos.length > 0 && (
        <div style={{ marginTop: 16 }}>
          {campos.map(c => (
            <div key={c.key} style={{ marginBottom: 12 }}>
              <label>
                {c.label}:{' '}
                <input
                  type="number"
                  step="any"
                  value={medidas[c.key] ?? ''}
                  onChange={e => onMedidaChange(c.key, e.target.value)}
                  style={{ marginLeft: 8 }}
                />
              </label>
            </div>
          ))}
        </div>
      )}

      <button onClick={calcularArea} style={{ marginTop: 8 }}>Calcular Área</button>

      {erro && (
        <div style={{ marginTop: 16, color: 'crimson' }}>{erro}</div>
      )}

      {resultado && (
        <div style={{ marginTop: 16 }}>
          <strong>Resultado:</strong>
          <div>Forma: {resultado.forma}</div>
          <div>Área: {resultado.area}</div>
        </div>
      )}
    </div>
  )
}
