
# Demo Plug framework

Este repositorio sirve como demostración del funcionamiento de [Plugcore framework](https://github.com/plugcore/plugcore).
En el podemos ver ejemplos de todas las secciones como por ejemplo configuración, controladores, servicios, etc.


## Requisitos de la instalación

- Nodejs 10.16 o superior con npm (se instala por defecto cuando instalas Nodejs). [Guía de instalación](https://nodejs.org)
- Git. [Guía de instalación](https://git-scm.com/downloads)

## Instalación

- Para poder probar este proyecto en local lo más sencillo es clonarse el proyecto:

```
git clone https://github.com/plugcore/demo.git
```

- Ir a la carpeta e instalar

```
cd plug-demo
npm i
```

Cabe destacar que se está instalando todo localmente en este proyecto y no se va a hacer ninguna instalación de módulos globales NPM ya que se hace uso extenso en los npm scripts de [npx](https://www.npmjs.com/package/npx) para ejecutar todos los métodos desde el `node_modules` del proyecto. De esta manera no se tiene que preocupar de versiones globales de módulos como `tsc`.

## Scripts

Ahora que ya lo tenemos instalado ya lo podemos poner en marcha, hacer tests, etc.
Para ejecutar estos comandos nos tenemos que posicionar en la carpeta del proyecto (plug-demo) por linea de comandos y escribir:

- `npm start`: Inicia el servidor como si fuera en producción
- `npm run dev`: Inicia el proyecto en modo desarrollo, es decir que cada vez que guardemos se reinicia el servidor
- `npm test`: Ejecuta los tests
- `npm run test:dev`: Ejecuta los tests en modo desarrollo, de tal manera que cada vez que se guarde un archivo se vuelvan a ejecutar los tests

## Estructura de carpetas

- `src`: Contiene todo el código ejecutable del proyecto, como controladores, servicios, etc.
  - `configuration`: Aquí nos crearemos nuestra interfaz que contendrá todos los atributos extras que necesitemos
  - `vehicle`: Esta es una carpeta de tipo entidad, es decir que aquí habrá todos los *.ts que tengan que ver con vehículos.
    - `vehicle.model.ts`: Aquí tenemos las clases o interfaces que tengan que ver con el modelo de base de datos
    - `vehicle.service.ts`: Este es un servicio controlado por el inyector de dependencias que tiene la conexión con la base de datos y se encarga de gestionar todas las operaciones de la Collection de Vehículos. Normalmente usará siempre las clases/interfaces definidas en `vehicle.model.ts``
    - `vehicle.api.ts`: Aquí tendremos todos los modelos que se refieran a la API, es decir que indiquen que Requests y que Responses vamos a tener, que parámetros etc. Todas las clases que definamos aquí nos servirán para 3 cosas:
      1. __Para validar todas las request__. Es decir que si indicamos que el objeto de entrada debe tener cierta propiedad de tipo string y que sea obligatoria, el sistema lo hará automáticamente por nosotros.
      2. __Para generar la documentación__. Todos los métodos en los que indiquemos que objetos hay de entrada y de salida aparecerán cuando queramos ver la documentación de la API. Esto además servirá para crear clientes automáticamente en un futuro.
      3. __Tipificar el controlador__. Esto ya es algo más propio de Typescript, pero todo lo que haya aquí nos servirá para ayudarnos en los controladores y tener más controlados los tipos de entrada/salida.
    - `vehicle.controller.ts:` Es una clase de tipo controlador que define el prefijo de url, por ejemplo "/vehicle", y sobre el cual vamos a agregar todos los métodos HTTP que queramos. Ahora está puesto un ejemplo de RESTFUL con operaciones CRUD.
    - `vehivle.events.ts`: Ejemplo de servicio que se encarga de recibir eventos.
- `test`: Contiene los tests del proyecto, no se ejecutarán como el resto del proyecto, sólo cuando hagas `npm run test`
- `configuration`: Contiene todos los archivos json de configuración de todos los entornos. En este caso se ha dejado el archivo `configuration.dev.json` con una configuración de base de datos, pero normalmente estos archivos no estarán gestionados por git y se pondrán manualmente en cada entorno.
- 
## URLs

Para empezar un buen ejemplo hacer un `POST` a `http://localhost:3000/vehicle` con un objeto del estilo:
```
{
    "model": "Tesla S1",
    "year": 2019
}
```

Podremos ver todos nuestros vehículos creados haciendo una petición a [http://localhost:3000/vehicle](http://localhost:3000/vehicle).

Para la documentación podemos acceder a [http://localhost:3000/api/documentation](http://localhost:3000/api/documentation)


## Conclusión de la demo

Hay ejemplos y comentarios por todas las clases del código, y se ha intentando seguir buenas prácticas a la hora de crear los nombres y la estructura, así que puedes usar este proyecto como plantilla para crear nuevas implementaciones y aprender más sobre plug framework haciendo pruebas.

Muchas gracias por probar, si encuentras cualquier problema por favor deja un ticket en: [https://github.com/plugcore/plugcore/issues](https://github.com/plugcore/plugcore/issues)
