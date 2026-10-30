## Verificación

Para verificar el correcto funcionamiento de Zelda Armory React, he realizado diferentes pruebas directamente en el navegador:

- Carga del equipamiento desde la API de Hyrule Compendium.
- Filtrado de armas por zona, tipo y nombre.
- Combinación simultánea de varios filtros.
- Actualización del contador de resultados y del resumen de equipamiento por tipo.
- Búsquedas sin resultados.
- Funcionamiento de los componentes de React y actualización de la interfaz al modificar los estados.
- Marcado y desmarcado de armas favoritas mediante el botón de corazón.
- Filtrado del equipamiento para mostrar únicamente las armas favoritas.
- Persistencia de los favoritos mediante `localStorage`, incluso después de recargar la página.
- Funcionamiento de la caché de `localStorage` para evitar peticiones repetidas a la API durante una hora.
- Gestión de errores de conexión y visualización de los mensajes correspondientes.

Las funcionalidades anteriores se han revisado durante el desarrollo de la aplicación. Zelda Armory React permite consultar y filtrar el equipamiento, gestionar una colección de favoritos y actualizar la interfaz de forma dinámica mediante los estados de React.

## Uso de IA

Durante el desarrollo he utilizado ChatGPT como herramienta de apoyo para resolver dudas sobre React, HTML, CSS y JavaScript, especialmente para comprender conceptos como `useState`, `useEffect`, las propiedades de los componentes (`props`), los hooks personalizados y la actualización de la interfaz mediante cambios de estado.

También he utilizado la IA para detectar errores, estudiar alternativas para organizar los componentes, adaptar la lógica de filtrado de la aplicación anterior a React e implementar un sistema de favoritos persistente mediante un hook personalizado `useLocalStorage`. Asimismo, he utilizado ChatGPT como apoyo para la redacción y organización del README y para mejorar los estilos CSS.

Las soluciones propuestas se han ido incorporando progresivamente, revisando su funcionamiento y comprendiendo el código antes de integrarlo en el proyecto.

La elección de la temática, la estructura general de la aplicación, la organización de sus funcionalidades, el diseño visual inspirado en la tableta Sheikah y la integración final de los diferentes componentes se han realizado con mi participación directa, utilizando la IA como herramienta de aprendizaje, implementación y revisión.

Para verificar las soluciones sugeridas, he probado las diferentes funcionalidades en el navegador, comprobando la carga de datos, los filtros, los contadores, la actualización de los componentes y la persistencia de los favoritos al recargar la página.

Dos prompts relevantes utilizados durante el desarrollo fueron:

"¿Por qué debo colocar el botón de favoritos en App.jsx y no en ListaArmas.jsx?"

"¿Cómo puedo guardar los favoritos en localStorage utilizando un hook personalizado?"

Las respuestas se utilizaron para comprender la distribución de responsabilidades entre componentes de React y la comunicación mediante props. También me permitieron aprender a crear un hook personalizado que combina useState y useEffect para almacenar los favoritos en localStorage y conservarlos después de recargar la página.

Estos conocimientos se aplicaron a la implementación del sistema de favoritos, separando la lógica de filtrado de la representación de las tarjetas y evitando almacenar estados innecesarios..

## Autopsia

### 1. Utilización de un elemento HTML para mostrar los detalles de las armas

Una decisión que he tomado durante el desarrollo ha sido utilizar el elemento HTML <details> para mostrar y ocultar la información adicional de cada arma, como su descripción y las localizaciones en las que puede encontrarse.

Esta solución permite que el usuario consulte la información de cada objeto sin necesidad de crear un estado adicional en React. El propio navegador se encarga de gestionar la apertura y el cierre de los detalles.

La alternativa sería utilizar useState para almacenar si los detalles de cada tarjeta están abiertos o cerrados, modificando su visualización mediante renderizado condicional.

He elegido utilizar <details> porque permite conseguir el mismo resultado con menos código y evita introducir estados innecesarios en la aplicación.

El principal inconveniente de esta decisión es que ofrece menos control sobre el comportamiento y las animaciones de los detalles que una implementación personalizada mediante React.

### 2. Clasificación automática del equipamiento según su nombre

Una decisión discutible ha sido mantener el sistema de clasificación de armas de la aplicación anterior, utilizando palabras clave presentes en el nombre de cada objeto para determinar su categoría.

Para ello, se utiliza una función que identifica términos como shield, bow, spear o sword, asignando a cada arma un tipo determinado que posteriormente puede utilizarse en los filtros y en el resumen estadístico.

La alternativa sería crear una clasificación manual para cada objeto o utilizar directamente una propiedad de clasificación proporcionada por la API, si estuviera disponible y fuera suficientemente específica.

He elegido mantener este sistema porque permite clasificar automáticamente el equipamiento recibido sin necesidad de modificar individualmente cada objeto. Además, al mantener esta lógica en logic.js, puede reutilizarse independientemente de los componentes de React.

El principal inconveniente de esta decisión es que algunos objetos pueden clasificarse incorrectamente cuando sus nombres no contienen las palabras previstas o cuando una palabra no representa adecuadamente el tipo de equipamiento.

