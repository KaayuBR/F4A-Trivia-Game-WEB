function consultar(){

metodoGET()
}

function metodoGET() {
  var id = document.getElementById("id").value
  console.log(id)

  var consultaSucesso = false
  var resultado
  var codigo
  var tipo
  var categoria
  var dificuldade
  var enunciado
  var alternativaA
  var alternativaB
  var alternativaC
  var alternativaD
  var resposta

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
      codigo = result.codigo
      tipo = result.tipo
      categoria = result.categoria
      dificuldade = result.dificuldade
      enunciado = result.enunciado
      alternativaA = result.alternativaA
      alternativaB = result.alternativaB
      alternativaC = result.alternativaC
      alternativaD = result.alternativaD
      resposta = result.resposta
      EscreverNaTela(consultaSucesso, codigo, tipo, categoria, 
        dificuldade, enunciado, alternativaA, alternativaB, alternativaC, alternativaD, resposta)
      return console.log(result)
    })
    .catch(error => {
      consultaSucesso = false
      EscreverNaTela(consultaSucesso)
      return console.log('error', error)
    });

    
}

 function EscreverNaTela(consultaSucesso, codigo, tipo, categoria, 
  dificuldade, enunciado, alternativaA, alternativaB, alternativaC, alternativaD, resposta){
  var divConsultado = document.getElementById("consultado")
 
  if(consultaSucesso){
   document.getElementById("consultado").style.visibility="visible"
   divConsultado.innerHTML = "Código: " + codigo + "<BR><BR>" +
     "\nTipo: " + tipo + "<BR><BR>" +
     "\nCategoria: " + categoria + "<BR><BR>" +
     "\nDificuldade: " + dificuldade + "<BR><BR>" +
     "\nEnunciado: " + enunciado + "<BR><BR>" +
     "\nAlternativa A: " + alternativaA + "<BR><BR>" +
     "\nAlternativa B: " + alternativaB + "<BR><BR>" +
     "\nAlternativa C: " + alternativaC + "<BR><BR>" +
     "\nAlternativa D: " + alternativaD + "<BR><BR>" +
     "\nResposta: " + resposta
  }
  else{
   document.getElementById("consultado").style.visibility="visible"
   divConsultado.innerHTML = "Código não encontrado"
  }  
 }