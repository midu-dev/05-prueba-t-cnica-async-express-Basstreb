import express from 'express'

export const app = express()
app.use(express.json())

const items = [{
  id: 1,
  content: 'Item 1'
}]

// Obtener todos los elementos
app.get('/items', (req, res) => {
  res.status(200).json(items)
})

// Obtener un elemento por ID
app.get('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id))
  if (!item) {
    return res.status(404).send('Item not found')
  }
  res.status(200).json(item)
})

// Crear un nuevo elemento
app.post('/items', (req, res) => {
  const newItem = {
    id: items.length + 1, // Incrementar el ID para el nuevo item
    content: req.body.content
  }
  items.push(newItem)
  res.status(200).json(newItem)
})

// Actualizar un elemento por ID
app.put('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id))
  if (!item) {
    return res.status(404).send('Item not found')
  }
  item.content = req.body.content
  res.status(200).json(item)
})

// Eliminar un elemento por ID
app.delete('/items/:id', (req, res) => {
  const index = items.findIndex(i => i.id === parseInt(req.params.id))
  if (index === -1) {
    return res.status(404).send('Item not found')
  }
  items.splice(index, 1)
  res.status(200).send('Item deleted')
})

export const server = app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
