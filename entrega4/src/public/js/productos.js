const socket = io();

socket.emit("mensProduct", "Mensaje desde producto");

const agregarProducto = document.querySelector("#agregarProducto");

agregarProducto.addEventListener("click", (e) => {
  e.preventDefault();

  const nombre = document.querySelector("#nombre");
  const bodega = document.querySelector("#bodega");
  const tipo = document.querySelector("#tipo");
  const variedad = document.querySelector("#variedad");
  const ano = document.querySelector("#ano");
  const precio = document.querySelector("#precio");

  const productoNuevo = {
    nombre: nombre.value,
    bodega: bodega.value,
    tipo: tipo.value,
    variedad: variedad.value,
    ano: ano.value,
    precio: precio.value,
  };

  socket.emit("productoNuevo", productoNuevo);
});
