// const path = require('path');                    // Módulo que contiene utilidades para trabajar con rutas de ficheros.
// const fs = require('fs');                        // Métodos para manejar ficheros y directorios
const { guardarCasas } = require("./guardarEnDb");
const puppeteer = require("puppeteer");

(async () => {
  console.log("Empezando scaping...");
  const browser = await puppeteer.launch({
    // Abre una instancia de chromium pero sin interfaz
    //headless: false,                      // Mostrame qué estas haciendo, de lo contrario lo hace todo sin mostrar nada.
    //slowMo: 500,                          // correr el script mas lentamente para que podamos ver que está haciendo
  });
  const page = await browser.newPage();
  const casas = []; // Array para almacenar cada uno de los objetos de las casas
  await page.goto("https://nextviaje.now.sh/");

  const urls = await page.evaluate(() =>
    // El código dentro de evaluete se ejecuta como si estuviéramos en la consola de Scraping
    Array.from(
      document.querySelectorAll(".FilaCasas__cartas a"),
      (nodo) => nodo.href
    )
  ); // Esto es com la función map() armo un array unicamente con los elementos href

  // Hasta acá tengo la lista de urls de cada carta

  for (const url of urls) {
    await page.goto(url);
    const detalleDeLaCasa = await page.evaluate(() => {
      // Podría haber usado el array.from
      const imagenes = [
        ...document.querySelectorAll(".CasaVista__fotos img"), //Con el operador tres puntos convierto la lista de nodos (NODEJS)en un array de JS
      ].map((img) => img.src);
      const titulo = document.querySelector(".CasaVista__titulo").innerText;
      const direccion = document.querySelector(".CasaVista__titulo + div")
        .innerText;
      const precio = Number(
        document
          .querySelector(".CasaVista__precio")
          .innerText.replace(/[^0-9]/g, "")
      );
      // Ahora uso un .reduce() porque el objetivo es obtener un objeto con propiedades igual al nombre de la comodidad y valor igual a la cantidad
      const comodidades = [
        ...document.querySelectorAll(".CasaVista__cuartos span"),
      ].reduce((acc, comodidad) => {
        const [cantidad, nombre] = comodidad.innerText.split(" ");
        acc[nombre] = Number(cantidad);

        return acc;
      }, {}); // {} es el acc (acumuladora, en este caso, un objeto en blanco que vamos a ir llenando)
      const servicios = [
        ...document.querySelectorAll(".CasaVista__extra"),
      ].map((nodo) => nodo.innerText.toLowerCase());
      const numeroDeEstrellas = document.querySelector(
        ".Opiniones__numero-de-estrellas"
      ).innerText;
      const numeroDeOpiniones = Number(
        document
          .querySelector(".Opiniones__numero-de-opiniones")
          .innerText.replace(/[^0-9]/g, "")
      );
      return {
        titulo,
        direccion,
        precio,
        imagenes,
        comodidades,
        servicios,
        numeroDeEstrellas,
        numeroDeOpiniones,
        url: window.location.href, // Para obtener el URL
      };
    });
    casas.push(detalleDeLaCasa);
  }
  //const data = JSON.stringify(casas) // Solo podemos guardar lista de caracteres
  ///fs.writeFileSync(path.join(__dirname,"casas.json"), data)
  await guardarCasas(casas);
  console.log("Casas guardadas exitosamente.");
  await browser.close();
  process.exit(); // Función de Node que termina la ejecución del programa.
  //console.log(detalleDeLaCasa)
})(); // Declaro una función asíncrona y la llamo inmediatamente
