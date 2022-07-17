function deletar(){
var consultaSucesso = false  
metodoGET(consultaSucesso)
  

}

function EscreverNaTela (consultaSucesso){
  if(consultaSucesso){
    metodoDELETE()
    alert("Deletado com sucesso!")
  }
  else {
    alert("Houve um erro! \n\nConsulte se o id está correto.")
  }
}


function metodoGET(consultaSucesso) {
  var id = document.getElementById("id").value
  console.log(id)

  consultaSucesso = false
  
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("http://localhost:8080/api/questao/consultar/"+id, requestOptions)
    .then(response => {
      resultado = response.json();
      return resultado;
    })
    .then(result => {
      consultaSucesso = true
      EscreverNaTela(consultaSucesso)
      return console.log(result)
    })
    .catch(error => {
      consultaSucesso = false
      EscreverNaTela(consultaSucesso)
      return console.log('error', error)
    });

    
}
function metodoDELETE(){
var id = document.getElementById("id").value
  console.log(id)

  var consultaSucesso = false

  var requestOptions = {
    method: 'DELETE',
    redirect: 'follow'
  };
  
  fetch("http://localhost:8080/api/questao/excluir/"+id, requestOptions)
    .then(response => response.text())
    .then(result => {
      return console.log(result);
    })
    .catch(error => {
     return console.log('error', error);
    });
  }