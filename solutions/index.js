import fs from 'node:fs'
import net from 'node:net'

// # EJERCICIO 1
export const ping = (ip, callback) => {
  const startTime = process.hrtime()

  const client = net.connect({ port: 80, host: ip }, () => {
    const endTime = process.hrtime(startTime)
    const time = endTime[0] * 1000 + endTime[1] / 1e6
    client.end()
    callback(null, { time, ip })
  })

  client.on('error', (err) => {
    client.end()
    callback(err, null)
  })
}

ping('midu.dev', (err, info) => {
  if (err) console.error(err)
  console.log(info)
})

// # EJERCICIO 2
export function obtenerDatosPromise () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: 'datos importantes' })
    }, 2000)
  })
}

// # EJERCICIO 3
/* La función procesarArchivo lee un archivo llamado input.txt, transforma el contenido en mayúsculas y luego guarda el resultado en output.txt después de una pausa de 1 segundo. Si ocurre un error al leer o escribir el archivo, se registra en la consola. */
export function procesarArchivo (callback) {
  fs.readFile('input.txt', 'utf8', (error, contenido) => {
    if (error) {
      console.error('Error leyendo archivo:', error.message)
      if (callback) callback(error)
      return
    }

    setTimeout(() => {
      const textoProcesado = contenido.toUpperCase()

      fs.writeFile('output.txt', textoProcesado, (error) => {
        if (error) {
          console.error('Error guardando archivo:', error.message)
          if (callback) callback(error)
          return
        }

        console.log('Archivo procesado y guardado con éxito')
        if (callback) callback(null, 'Archivo procesado y guardado con éxito')
      })
    }, 1000)
  })
}

export function procesarArchivoPromise () {
  return new Promise((resolve, reject) => {
    fs.readFile('input.txt', 'utf8', (error, contenido) => {
      if (error) {
        console.error('Error leyendo archivo:', error.message)
        reject(error)
        return
      }

      setTimeout(() => {
        const textoProcesado = contenido.toUpperCase()

        fs.writeFile('output.txt', textoProcesado, (error) => {
          if (error) {
            console.error('Error guardando archivo:', error.message)
            reject(error)
            return
          }

          console.log('Archivo procesado y guardado con éxito')
          resolve('Archivo procesado y guardado con éxito')
        })
      }, 1000)
    })
  })
}

// # EJERCICIO 4
export function leerArchivos () {
  const archivo1 = fs.readSync('archivo1.txt', 'utf8')
  const archivo2 = fs.readSync('archivo2.txt', 'utf8')
  const archivo3 = fs.readSync('archivo3.txt', 'utf8')

  return `${archivo1} ${archivo2} ${archivo3}`
}

// # EJERCICIO 5
export async function delay () {
  // ...
}
