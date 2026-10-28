# \# Zelda Armory — M3: Reactor Core

# 

# Aplicación web desarrollada con React y Vite que permite consultar el equipamiento de \*The Legend of Zelda: Breath of the Wild\* utilizando la API de Hyrule Compendium.

# 

# Este proyecto es una adaptación de Zelda Armory, desarrollado anteriormente en la Misión 2 con JavaScript Vanilla, a una arquitectura basada en componentes de React.

# 

# La aplicación permite visualizar armas, consultar sus estadísticas y descripciones, y filtrar el equipamiento por nombre, tipo y localización.

# 

# \## Funcionamiento

# 

# La aplicación obtiene el equipamiento desde la API de Hyrule Compendium y lo muestra mediante tarjetas individuales.

# 

# Cada tarjeta presenta el nombre, la imagen y las estadísticas disponibles del arma. Además, incluye un desplegable HTML que permite consultar su descripción y sus localizaciones.

# 

# El usuario puede buscar equipamiento por nombre y aplicar filtros de tipo y zona simultáneamente.

# 

# La interfaz se actualiza automáticamente cuando cambian los filtros, sin necesidad de volver a solicitar los datos a la API.

# 

# \## Arquitectura

# 

# El proyecto está organizado en diferentes archivos y componentes:

# 

# \- \*\*App.jsx:\*\* componente principal encargado de gestionar los estados, cargar los datos y coordinar los filtros.

# \- \*\*Filtros.jsx:\*\* componente que contiene los controles de búsqueda y selección.

# \- \*\*ListaArmas.jsx:\*\* componente encargado de recorrer el equipamiento y generar las tarjetas.

# \- \*\*ArmaCard.jsx:\*\* componente reutilizable que muestra la información de cada arma.

# \- \*\*api.js:\*\* módulo encargado de obtener los datos de la API.

# \- \*\*logic.js:\*\* módulo que contiene las funciones de clasificación y filtrado del equipamiento.

# \- \*\*App.css e index.css:\*\* archivos que definen el diseño visual y los estilos generales.

# 

# Se utiliza `useState` para almacenar el equipamiento, controlar la carga y los errores, y gestionar los filtros seleccionados.

# 

# Se utiliza `useEffect` para realizar la carga inicial de datos.

# 

# Las armas filtradas se calculan directamente a partir de los estados existentes, evitando almacenar información duplicada.

# 

# \## Uso de IA

# 

# Durante el desarrollo de esta práctica he utilizado \*\*ChatGPT como herramienta de apoyo para el aprendizaje, la implementación y la depuración de React\*\*.

# 

# Su utilización ha estado centrada principalmente en comprender el funcionamiento de los componentes, las propiedades (`props`), los estados (`useState`) y los efectos (`useEffect`), así como las diferencias entre la programación con JavaScript Vanilla y React.

# 

# También he utilizado la IA para obtener ejemplos de implementación de componentes, resolver errores relacionados con la comunicación entre componentes y adaptar el diseño visual de la aplicación mediante CSS.

# 

# En concreto, ChatGPT ha participado en la propuesta inicial de la estructura de componentes, la implementación de las tarjetas de equipamiento, la creación de los controles de filtrado y la corrección de problemas visuales de la cuadrícula.

# 

# Asimismo, he utilizado ChatGPT como apoyo para la redacción y organización de este README.

# 

# \### Prompts relevantes

# 

# Dos consultas realizadas durante el desarrollo fueron:

# 

# \*\*1.\*\* "useEffect se ejecuta nada más cargar el componente App, entonces ¿por qué llamamos a la función después de escribirla en lugar de hacerlo directamente?"

# 

# Esta consulta me permitió comprender por qué se utiliza una función asíncrona dentro de `useEffect`, en lugar de declarar directamente una función asíncrona como callback del efecto.

# 

# \*\*2.\*\* "Pero ¿se actualiza todo App? O sea, ¿se vuelve a llamar la API y todo useEffect?"

# 

# Esta pregunta me ayudó a comprender la diferencia entre el renderizado de un componente y la ejecución de sus efectos, así como el funcionamiento del array de dependencias.

# 

# \### Verificación de las respuestas

# 

# Las soluciones propuestas por ChatGPT se han incorporado progresivamente, probando su funcionamiento directamente en el navegador y revisando los errores que aparecían durante el desarrollo.

# 

# Por ejemplo, durante la implementación de los filtros se detectó un error provocado por intentar utilizar `.map()` sobre una propiedad que todavía no se había pasado al componente. Para solucionarlo, revisé la comunicación mediante `props` entre `App.jsx` y `Filtros.jsx`.

# 

# También se realizaron modificaciones en el CSS para corregir problemas de desbordamiento y solapamiento de las tarjetas.

# 

# Las explicaciones de la IA se utilizaron para comprender el funcionamiento del código, realizando preguntas adicionales cuando alguna parte no quedaba clara.

# 

# \### Trabajo manual

# 

# La elección de mantener la temática de Zelda Armory y adaptar el proyecto anterior a React fue una decisión propia.

# 

# También he reutilizado las funciones de clasificación y filtrado desarrolladas en la Misión 2, integrándolas en la nueva arquitectura.

# 

# He participado directamente en la organización de los componentes, la conexión entre estados y propiedades, la revisión de los resultados y las pruebas realizadas en el navegador.

# 

# La IA se ha utilizado como herramienta de consulta, generación de propuestas y resolución de problemas, no como sustituto de la revisión y comprensión del código implementado.

# 

# \## Autopsia

# 

# \### 1. Gestión de los filtros mediante estados en App.jsx

# 

# Una de las decisiones de diseño ha sido almacenar los estados de búsqueda, tipo y localización en el componente principal `App.jsx`, en lugar de mantenerlos individualmente dentro de `Filtros.jsx`.

# 

# Esta decisión permite que el componente `Filtros` reciba los valores y las funciones actualizadoras mediante `props`, mientras que `App` utiliza esos valores para determinar qué armas deben mostrarse.

# 

# La alternativa habría sido almacenar los estados dentro del propio componente `Filtros`, pero eso habría requerido comunicar los cambios al componente principal mediante funciones adicionales.

# 

# He elegido centralizar los estados en `App` porque facilita la coordinación entre los filtros y la lista de equipamiento.

# 

# El inconveniente es que el componente principal necesita pasar varias propiedades a `Filtros`, lo que aumenta la cantidad de código y podría complicar su mantenimiento si se añadieran muchos más controles.

# 

# \### 2. Reutilización de las funciones de logic.js

# 

# Otra decisión ha sido mantener las funciones de clasificación y filtrado de la Misión 2 en un módulo independiente.

# 

# Estas funciones permiten clasificar el equipamiento a partir de su nombre y filtrar las armas según los criterios seleccionados.

# 

# La alternativa habría sido trasladar toda esta lógica directamente al componente `App.jsx`.

# 

# Sin embargo, he decidido mantenerla separada porque las funciones no dependen de React y pueden reutilizarse sin modificaciones importantes.

# 

# Esto permite que `App.jsx` se concentre en gestionar los estados y mostrar los componentes, mientras que `logic.js` se encarga del procesamiento de los datos.

# 

# Como inconveniente, la clasificación basada en palabras clave puede producir resultados incorrectos cuando el nombre de un objeto no contiene ninguno de los términos previstos.

# 

# \### 3. Uso de details en lugar de useState para los desplegables

# 

# Inicialmente se planteó controlar la visualización de los detalles de cada arma mediante `useState`, modificando un booleano al pulsar un botón.

# 

# Posteriormente decidí utilizar los elementos HTML `<details>` y `<summary>`, que permiten implementar un desplegable sin necesidad de gestionar su apertura mediante un estado de React.

# 

# Esta solución simplifica el componente `ArmaCard.jsx`, reduce la cantidad de código y aprovecha una funcionalidad nativa del navegador.

# 

# La alternativa con `useState` habría permitido controlar el desplegable desde React y desarrollar comportamientos más personalizados.

# 

# He elegido utilizar `<details>` porque, para las necesidades actuales de la aplicación, resulta suficiente y evita introducir estados innecesarios.

# 

# El principal inconveniente es que ofrece menos control directo desde React sobre el estado de apertura, aunque este control no es necesario para el funcionamiento actual del proyecto.

