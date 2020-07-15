# Web Scraping con Puppetee

## Descripción

Mini proyecto de web scraping. Se realiza el scraping de la pagina [NextViaje](https://nextviaje.now.sh/) que contiene un listado de casas en alquiler. Los objetivos del proyecto serán:

* Extraer datos relevantes por medio de Web Scraping.
* Guardar estos datos en una base de datos MongoDB.
* Crear un API que permita filtrar las casas en base a sus atributos.

## Instalación y ejecución

Instalamos las dependencias necesarias i ejecutamos el script *dev*:

```console
npm install
npm run dev
```

Al ejecutar este último comando la consola mostrará lo siguiente indicando que todo ha salido bien:

```console
Empezando scaping...
Casas guardadas exitosamente.
```

El script guardará todos los datos scrapeados en una colección de Mongo DB llamada *nextviaje*. Ahora ejecutamos un servidor que leerá estos datos desde la db y los dispondrá en una API REST:

```console
npm run server
```

Si todo sale bien, en la consola se mostrará el siguiente mensaje:

```console
npm run dev
```

Y podremos comenzar a probar los siguientes filtros: numeroDeEstrellas, servicios, comodidad, numeroDeComodidad, precioMinimo, precioMaximo. Ejemplos:
* /api/casas?numeroDeEstrellas=4
* /api/casas?servicios=plancha,cocina,wifi
* /api/casas?comodidad=habitaciones&numeroDeComodidad=1&
* /api/casas?precioMinimo=500&precioMaximo=700
* /api/casas?precioMinimo=500
* /api/casas?precioMaximo=700