// función ifi. Las variables y funciones se quedan de modo local
(function(){
    // Variable para almacenar el valor de la BD
    let DB;
    // Agrego listeners
    document.addEventListener('DOMContentLoaded', ()=>{
        crearDB();

        // Función que sólo va a correr si existe la bd crm v1, de indexedDB
        if (window.indexedDB.open('crm', 1)) {
            obtenerClientes();
        }
    });

    // Crea la BD de indexedDB
    function crearDB() {
        const crearDB = window.indexedDB.open('crm', 1);

        // Si hay error
        crearDB.onerror = function(){
            console.log('Hubo un error');
        }

        // Si todo sale bien
        crearDB.onsuccess = function(){
            // Asigno el valor de la BD
            DB = crearDB.result;
            // console.log('BD creada con éxito');
        }

        // Función que corre una sola vez cuando se crea la BD
        crearDB.onupgradeneeded = function(e){
            // Variable que almacena el resultado de la función
            const db = e.target.result;

            // Creación del objectStore
            const objectStore = db.createObjectStore('crm', {
                keyPath: 'id',
                autoIncrement: true,
            });

            // Creación de columnas
            objectStore.createIndex('nombre', 'nombre', {unique: false});
            objectStore.createIndex('email', 'email',{unique: true});
            objectStore.createIndex('telefono', 'telefono', {unique: false});
            objectStore.createIndex('empresa', 'empresa', {unique: false});
            objectStore.createIndex('id', 'id', {unique: true});

            console.log('DB lista y creada');
        }
        // Fin onupgradeneeded


    };
    // Fin crearDB

    // Función que me permite mostrar en el DOM a los clientes
    function obtenerClientes() {
        // Abrimos conexión a la bd
        const abrirConexion = window.indexedDB.open('crm', 1);

        // Si hay error
        abrirConexion.onerror = function(){
            console.log('Hubo un error al abrir la conexión');
        };
        // Si todo sale bien
        abrirConexion.onsuccess = function(){
            // obtengo una instancia de la bd
            DB = abrirConexion.result;
            // Accedemos al objectStore
            const objectStore = DB.transaction('crm').objectStore('crm');

            // Recorremos el objectStore
            objectStore.openCursor().onsuccess = function(e){
                // obtengo la instancia del cursor
                const cursor = e.target.result;
                // Si existe algo en el cursor
                if (cursor) {
                    // console.log(cursor.value);
                    // Hago destructuring al cursor
                    const {nombre, email, telefono, empresa, id} = cursor.value;
                    // obtengo el tbody del index.html
                    const listadoClientes = document.querySelector('#listado-clientes');
                    listadoClientes.innerHTML+= ` 
                    <tr>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
                            <p class="text-sm leading-10 text-gray-700"> ${email} </p>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                            <p class="text-gray-700">${telefono}</p>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                            <p class="text-gray-600">${empresa}</p>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                            <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                            <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900">Eliminar</a>
                        </td>
                    </tr>
                `;

                    // Obtengo el siguiente registro
                    cursor.continue();
                } else {
                    console.log('No hay más registros');
                }
            }
            // Fin onSucces del openCursor
        };
        // Fin de abrirConexion.onsuccess
    };
    // Fin obtenerCliente
})();