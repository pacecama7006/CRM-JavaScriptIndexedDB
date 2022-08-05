
// Aplico la variable global DB para tener una instancia de la BD
let DB; //Tuve que agregarla aquí y quitarla de nvoCliente y editarCliente para que funcionara bien
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