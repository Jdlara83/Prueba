<template>

<div>

    <form @submit.prevent="editarCliente(cliente)" v-if ="modoEditar">

<h3>Editar usuario</h3>

<input type = "text" placeholder = "nombre" v-model="ciente.nombre" class = "form-control mb-2 " v-model="usuario.nombre">

<input type = "text" placeholder = "apellido" v-model="ciente.identificacion" class = "form-control mb-2 " v-model="usuario.identificacion">

<button class = "btn btn-warning" type="submit">Editar</button>
<button class = "btn btn-danger" type="submit">Cancelar</button>

</form>


<form @submit.prevent="agregar" v-esle>

<h3>Agregar Usuario</h3>

<input type = "text" placeholder = "nombre de usuario" v-model="ciente.nombre" class = "form-control mb-2 " v-model="usuario.nombre">
<input type = "text" placeholder = "identificacion" class = "form-control mb-2 " v-model="usuario.identificacion">
<button class = "btn btn-primary" type="submit">Agregar</button>

</form>
<hr>

<h3>Lista de Clientes:</h3>

<ul class="list-group">

    <li class="list-group-item"
        v-for="(item, index) in cliente" :key="index" >
        <span class="badge badge-primary float-rigth">
            {{item.update_at}}
        </span>
        <p> {{ item.nombre}} </p>
        <p> {{ item.identificacion}} </p>


                <p>

                    <button class="btn btn-warning btn-sm"
                    @click="editarFormulario(item)">Editar</button>

                   <button class="btn btn-danger btn-sm"
                   @click="eliminarCliente(item)">Eliminar</button>
               </p>
            </li>
        </ul>
    </div>
</template>

<script>

  export default{

      data(){

          return{


               usuarios:[],
               modoEditar: false,
               usuario:{nombre: '', identificacion:''}

          }
      },

    created(){

        axios.get('/clientes'). then(res=>{
            this.clientes = res.data;
        })
    },
    methods:{

        agregar(){
                 if(this.cliente.nombre.trim()== '' || this.cliente.descripcion.trim() === '')
        {
            alert('Por favor complete los campos antes de guardar');
            return;
        }
        const clienteNuevo = this.cliente;
        this.cliente ={nombre: '', identificacion: ''};
        axios.post('cliente', clienteNuevo)
        .then ((res) =>{
                  const clienteServidor = res.data;
                  this.clientes.push(clienteServidor);
        })

        },
        editarFormulario(item){
                this.cliente.nombre = item.nombre;
                this.cliente.identificacion =item.descripcion;
                this.cliente.id = item.id;
                this.modoEditar= true;
        },
        editarCliente(cliente){
            const params = {nombre: cliente.nombre, identificacion: cliente.identificacion};
            axios.put('/cliente/${cliente.id}',params)
            .then(res=>{
                     this.modoEditar =false;
                     const index = this.clientes.findIndex(item => item.id === cliente.id);
                     this.clientes[index] = res.data
            })
        },
        eliminarCliente(cliente,index){
            const confirmacion = confirm('eliminar cliente ${cliente.nombre}');
            if(confirmacion){
                axios.delete('/cliente ${cliente.id}')
                .then(()=>{
                    this.clientes.splice(index, 1);
                })
            }
        },
        cancelarEdicion(){
            this.modoEditar = false;
            this.cliente = {nombre:'', identificacion:''};
        }
    }
  }

  </script>

