//comentario

//varaibles
// antes su palabra era var ahora es let
// let nombre;
// console.log(nombre);
// nombre = "Clara";

//hola mundo desde la consola
//console.log("Hola Mundo! desde la consola")

//Hola mundo! desde un alert
//alert("Hola mundo! desde un alert");
//tipo de dato: string
//let texto = "soy un texto";
//tipo de dato: number
//let numero = 42;
//tipo de dato: boolean (ej.encendido/apagado true/false)
//let verdadero = true;
//Tipo de dato: undefined 
//let undefined;
//null
//let vacio = null;


 //definir constantes y variables
 const fecha = document.querySelector('#fecha');
 const lista = document.querySelector('#lista');
 const elemento = document.querySelector('#elemento');
 const input = document.querySelector('#input');
 const botonAgregar = document.querySelector('#botonAgregar');
 const check = 'bi bi-record-circle'
 const tachado = 'tachado'
 const uncheck = 'bi bi-x-circle'
 let LIST;
 let id;

 const FECHA = new Date();
 fecha.innerHTML = FECHA.toLocaleDateString('es-MX',{
    weekday: 'long',
    month: 'short',
    day: 'numeric',
 });

 //funciones

 function agregarTarea(tarea,id,hecho,eliminar) {
    if (eliminar) {
        return
    }
    const realizado = hecho ? check : uncheck;
    const LINE = hecho ? tachado : '';
    const elemento = `<li id="elemento">
    <i id="${id}" data="hecho" class="${realizado}"></i>
    <p class="tarea-lista text ${LINE}">${tarea}</p>
    <i id="${id}" data="eliminar" class="bi bi-x-circle"></i>
</li>`
lista.insertAdjacentHTML("beforeend",elemento);
 };

 function tareaRealizada(element){
 element.classList.toggle(check);
 element.classList.toggle(uncheck);
 element.parentNode.querySelector('.text').classList.toggle(tachado);
 LIST[element.id].realizado = LIST[element.id].realizado ? false : true;
 };
 function tareaEliminada(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].eliminar = true;
 };
 botonAgregar.addEventListener("click", () =>{
   const tarea = input.value;
   if (tarea){
      agregarTarea(tarea, id, false, false)
      LIST.push({
         nombre: tarea,
         id: id,
         hecho: false,
         eliminar: false,
      });
      localStorage.setItem("TODO", JSON.stringify(LIST));
      id++;
      input.value = "";
}
});
lista.addEventListener("click", function (event){
const element = event.target;
const elementData = element.attributes.data.value;
if (elementData == "hecho") {
   tareaRealizada(element);
} else if (elementData == "eliminar") 
{
   tareaEliminada(element);
};
localStorage.setItem("TODO", JSON.stringify(LIST));
});

let data = localStorage.getItem ("TODO");
if (data) {
   LIST = JSON.parse(data);
   id = LIST.length;
   cargarLista(LIST);
} else {
   LIST = [];
   id = 0;
};
function cargarLista(array) {
   array.forEach(
      function (item){
         agregarTarea(item.nombre, item.id, item.hecho, item.eliminar);
      }
   );
}