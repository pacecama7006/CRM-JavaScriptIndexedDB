(function(){

    // Variable para almacenar el valor de la BD
    let DB;
    // Variables del formulario
    const nombreInput = document.querySelector('#nombre');
    const emailInput = document.querySelector('#email');
    const telefonoInput = document.querySelector('#telefono');
    const empresaInput = document.querySelector('#empresa');

    document.addEventListener('DOMContentLoaded', ()=>{
        // Conectamos a la BD
        conectarDB();

        // Verificar los parámetros que existen en la url
        const parametrosURL = new URLSearchParams(window.location.search);
        // Obtengo el id del cliente
        const idCliente = parametrosURL.get('id');
        // console.log(idCliente);

        // Si tengo un id de cliente
        if (idCliente) {
            // En este punto, primero estoy obteniendo el id del cliente, y después
            // se está creando la conexión y búsqueda en la bd, para evitar un error
            // retardamos 100 milisegundos el obtenerCliente
            setTimeout(() => {
                // obtengo los datos del cliente
                obtenerCliente(idCliente);
                
            }, 100);
        }
    });
    // Fin eventListener

    // Función para obtener los datos del cliente
    function obtenerCliente(id) {
        // console.log(idCliente);
        // Creo la instancia de transaction para obtener datos (por eso readonly)
        const transaction = DB.transaction(['crm'], 'readonly' );
        // Creo instancia de objectStore
        const objectStore = transaction.objectStore('crm');
        // console.log(objectStore);
        // Creo un cursor para recorrer el objectStore
        const cliente = objectStore.openCursor();
        // Si hay un error al obtener datos
        cliente.onerror = function (){
            console.log('Hubo un error al leer los datos');
        };
        // Si se tiene éxito al obtener datos
        cliente.onsuccess = function (e){
            // obtengo los datos del cursor
            const cursor = e.target.result;
            // Si tengo datos en el cursor
            if (cursor) {
                // console.log(cursor.value);
                // Comparo el id del cliente para obtener sus datos
                if (cursor.value.id === Number(id)) {
                    // console.log(cursor.value);
                    // Lleno el formulario
                    llenarFormulario(cursor.value);
                }
                // Recorro el siguiente registro
                cursor.continue();
            }
        };

        
    }   
    // Fin obtenerCliente

    // Función que sirve para conectar a la BD
    function conectarDB() {
        // Variable que almacena la apertura de la conexión
        const abrirConexion = window.indexedDB.open('crm', 1);

        // Si hay error
        abrirConexion.onerror = function(){
            console.log('Hubo un error en la Bd');
        };

        // Si todo sale bien
        abrirConexion.onsuccess = function(){
            // Almaceno el resultado de la BD
            DB = abrirConexion.result;
        };
        // Fin de onsucces
    };
    // Fin conectarDB
    // Función que permite llenar el fomulario
    function llenarFormulario(cliente) {
        // Hacemos destructuring al objeto cliente
        const {nombre, email, telefono, empresa} = cliente;
        nombreInput.value = nombre;
        emailInput.value = email;
        telefonoInput.value = telefono;
        empresaInput.value = empresa;
    };
    // fin llenarFormulario

})();