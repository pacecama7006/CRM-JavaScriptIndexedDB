// función ifi. Las variables y funciones se quedan de modo local
(function(){
    // Variable para almacenar el valor de la BD
    let DB;
    // Agrego listeners
    document.addEventListener('DOMContentLoaded', ()=>{
        crearDB();
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
            objectStore.createIndex('correo', 'correo', {unique: true});
            objectStore.createIndex('telefono', 'telefono', {unique: false});
            objectStore.createIndex('empresa', 'empresa', {unique: false});
            objectStore.createIndex('id', 'id', {unique: true});

            console.log('DB lista y creada');
        }
        // Fin onupgradeneeded


    }
})();