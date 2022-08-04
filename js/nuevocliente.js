// Función ify para tener las variables y funciones locales
(function(){
    // Variable para almacenar los datos de la bd
    let DB;
    // Variables del formulario
    const formulario = document.querySelector('#formulario');

    // Agrego listener al documento
    document.addEventListener('DOMContentLoaded', ()=>{

        // Conectamos a la BD
        conectarDB();
        // Escucha para cuando se oprima el botón submit
        formulario.addEventListener('submit', validarCliente);
    });

    // Función que nos permite conectarnos a la BD
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
    }
    // Fin conectarDB

    // Función que permite validar un cliente
    function validarCliente(e) {
        // Prevengo el comportamiento por defecto
        e.preventDefault();

        // console.log('Validando');

        // Como los inputs sólo se utilizan en esta función los dejo locales en esta función
        // variables para los inputs y los leo de una vez
        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        // Valido los campos
        if (nombre === '' || email === '' || telefono === '' || empresa === '') {
            console.log('Error');
            // Mando a imprimir la advertencia al usuario
            imprimirAlerta('Todos los campos son obligatorios', 'error');

            return;
        }

        // Crear un objeto con la información del formulario con objectLiteral
        // Como
        const cliente = {
            // nombre: nombre, Como la llave y el valor son iguales, me puedo deshacer de uno
            nombre,
            email,
            telefono,
            empresa,
            id: Date.now(),
        };

        // console.log(cliente);
        crearNuevoCliente(cliente);
    }
    // Fin validar cliente

    // Función que me imprime la alerta
    function imprimirAlerta(mensaje, tipo) {
        // creamos la alerta
        const divMensaje = document.createElement('div');

        const alerta = document.querySelector('.alerta');

        // Si no está la alerta
        if (!alerta) {
            // Agrego clases
            divMensaje.classList.add('px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center', 'border', 'alerta');

            // Valido si el mensaje es de tipo error
            if (tipo === 'error') {
                divMensaje.classList.add('bg-red-100', 'border-red-400', 'text-red-700');
            } else {
                divMensaje.classList.add('bg-green-100', 'border-green-400', 'text-green-700');
            }

            // Agrego el texto del mensaje
            divMensaje.textContent = mensaje;

            // Agrego el div al dom
            formulario.appendChild(divMensaje);

            // Después de 3 segundo quito el mensaje
            setTimeout(() => {
                divMensaje.remove();
            }, 3000);
            }
        
    }
    // Fin imprimirAlerta

    // Función que permite crear un nuevo cliente
    function crearNuevoCliente(cliente) {
        // Creo la transacción
        const transaction = DB.transaction(['crm'], 'readwrite');
        // Creo el objectStore
        const objectStore = transaction.objectStore('crm');
        // Agrego el cliente al objectStore para que lo pase a la bd
        objectStore.add(cliente);
        // Si hay un error
        transaction.onerror = function(){
            // console.log('Hubo un error en la transacción');
            imprimirAlerta('Hubo un error al agregar el cliente. Email ya existe', 'error');
        };
        // Si todo sale bien
        transaction.oncomplete = function(){
            // console.log('Cliente agregado');
            // Mando mensaje al usuario
            imprimirAlerta('El cliente se agregó correctamente');
            // Redirigo al usuario a index.html
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        };

    }
    // Fin crearNuevoCliente

})();
