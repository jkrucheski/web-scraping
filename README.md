# Web Scraping with Puppetee

## Description 

Mini scraping web project of the [NextViaje](https://nextviaje.now.sh/) page, that contains a list of houses for rent. The objectives of the project will be: 

* Extract relevant data through Web Scraping.
* Save this data in a MongoDB database.
* Create an API that allows you to filter the houses based on their attributes. 

## Installation and execution

We install the necessary dependencies and execute the *dev* script: 

```console
npm install
npm run dev
```

When executing this command, the console will show the following message indicating that everything has gone well:

```console
Empezando scaping...
Casas guardadas exitosamente.
```

The script will save all scraped data to a Mongo DB collection called *nextviaje*. Now we run a server that will read this data from the DB and serve it in a REST API: 

```console
npm run server
```

If everything goes well, the following message will be displayed on the console:

```console
Escuchando en puerto: 3010
```

And we can start testing the following filters: numberOfStars, services, comfort, numberOfComfort, minimum price, maximum price. Examples:

* /api/casas?numeroDeEstrellas=4
* /api/casas?servicios=plancha,cocina,wifi
* /api/casas?comodidad=habitaciones&numeroDeComodidad=1&
* /api/casas?precioMinimo=500&precioMaximo=700
* /api/casas?precioMinimo=500
* /api/casas?precioMaximo=700
