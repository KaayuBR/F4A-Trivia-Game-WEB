function consultar(){

  metodoGET()
  }
  
  function metodoGET() {
    var id = document.getElementById("ide").value
    console.log(id)
  
    var consultaSucesso = false
    var Resultado
    var Codigo
    var Tipo
    var Categoria
    var Dificuldade
    var Enunciado
    var AlternativaA
    var AlternativaB
    var AlternativaC
    var AlternativaD
    var Resposta
  
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("http://localhost:8080/api/questao/consultar/"+id, requestOptions)
      .then(response => {
        Resultado = response.json();
        return Resultado;
      })
      .then(result => {
        consultaSucesso = true
        Codigo = result.codigo
        Tipo = result.tipo
        Categoria = result.categoria
        Dificuldade = result.dificuldade
        Enunciado = result.enunciado
        AlternativaA = result.alternativaA
        AlternativaB = result.alternativaB
        AlternativaC = result.alternativaC
        AlternativaD = result.alternativaD
        Resposta = result.resposta
        EscreverNaTela(consultaSucesso, Codigo, Tipo, Categoria, 
          Dificuldade, Enunciado, AlternativaA, AlternativaB, AlternativaC, AlternativaD, Resposta)
        return console.log(result)
      })
      .catch(error => {
        consultaSucesso = false
        EscreverNaTela(consultaSucesso)
        return console.log('error', error)
      });
  
      
  }
  
   function EscreverNaTela(consultaSucesso, Codigo, Tipo, Categoria, 
    Dificuldade, Enunciado, AlternativaA, AlternativaB, AlternativaC, AlternativaD, Resposta){
    
    document.getElementById("nencontrado").style.visibility="hidden"
   
    if(consultaSucesso){
     document.getElementById("editado").style.visibility="visible"
     
    console.log("valores de entrada: \n",consultaSucesso, Codigo, Tipo, Categoria, 
    Dificuldade, Enunciado, AlternativaA, AlternativaB, AlternativaC, AlternativaD, Resposta)

    
     var str1 = "multipla escolha"
     var str2 = Tipo
     var str3 = "encontre a palavra"
     var comp1 = str1.toLowerCase() === str2.toLowerCase()
     var comp2 = str3.toLowerCase() === str2.toLowerCase()


     if(comp1){
      document.getElementById("mEscolhae").checked = true
      document.getElementById("alternativase").style.visibility="visible"
    }
    else if(comp2){
      document.getElementById("ePalavrae").checked = true
      document.getElementById("alternativase").style.visibility="hidden"
    }

    if(Categoria == "anime" ){
          document.getElementById("categoriae").selectedIndex = 0;
      }
      else if(Categoria == "games" ){
        document.getElementById("categoriae").selectedIndex = 1;
    }
    else if(Categoria == "pop" ){
      document.getElementById("categoriae").selectedIndex = 2;
  }
  

    if (Dificuldade == 'facil')
    {
      document.getElementById("dificuldadee").selectedIndex = 0
      
    }
    else if (Dificuldade == 'medio'){
      document.getElementById("dificuldadee").selectedIndex = 1
    }
    else if (Dificuldade == 'dificil'){
      document.getElementById("dificuldadee").selectedIndex = 2
    }
    else if (Dificuldade == 'impossivel'){
      document.getElementById("dificuldadee").selectedIndex = 3
    }
    
     document.getElementById("enunciadoe").value = Enunciado
     document.getElementById("alternativaAe").setAttribute("value", AlternativaA)
     document.getElementById("alternativaBe").setAttribute("value", AlternativaB)
     document.getElementById("alternativaCe").setAttribute("value", AlternativaC)
     document.getElementById("alternativaDe").setAttribute("value", AlternativaD)
     document.getElementById("respostae").setAttribute("value", Resposta)
    }
    else{
     document.getElementById("editado").style.visibility="hidden"
     document.getElementById("nencontrado").style.visibility="visible"
     console.log("entrei no else")
    }  
   }

function esconder(){
  document.getElementById("alternativase").style.visibility="hidden"
}
function mostrar(){
  document.getElementById("alternativase").style.visibility="visible"
}

function editar(){

  if ((document.getElementById("respostae").value=="") | (document.getElementById("enunciadoe").value=="")){
    console.log("campo obrigatorio em branco")
  }
  else{
// get the form element from dom
const formElement = document.getElementById("adicionar-perguntase")

// convert the form to JSON
function getFormJSON(form) {
  const data = new FormData(form);
  return Array.from(data.keys()).reduce((result, key) => {
    if (result[key]) {
      result[key] = data.getAll(key);
      return result;
    }
    result[key] = data.get(key);
    return result;
  }, {});
}

// handle the form submission event, prevent default form behaviour, check validity, convert form to JSON
var saida
const handler = (event) => {
  event.preventDefault();
  const valid = formElement.reportValidity();
  if (valid) {
    const result = getFormJSON(formElement);
  
    const output = {
      ...result
          }
    console.log(output)
    saida = output
  }
  
}

formElement.addEventListener("submit", handler)
console.log(saida)


var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

if(document.getElementById("mEscolhae").checked){
  var tipo = document.getElementById("mEscolhae").value
}
else if(document.getElementById("ePalavrae").checked){
  var tipo = document.getElementById("ePalavrae").value
}

var raw = JSON.stringify({
  "codigo": document.getElementById("ide").value,
  "tipo": tipo,
  "categoria": document.getElementById("categoriae").value,
  "dificuldade": document.getElementById("dificuldadee").value,
  "enunciado": document.getElementById("enunciadoe").value,
  "alternativaA": document.getElementById("alternativaAe").value,
  "alternativaB": document.getElementById("alternativaBe").value,
  "alternativaC": document.getElementById("alternativaCe").value,
  "alternativaD": document.getElementById("alternativaDe").value,
  "resposta": document.getElementById("respostae").value
});

var requestOptions = {
  method: 'PUT',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};
var id = document.getElementById("ide").value
fetch("http://localhost:8080/api/questao/atualizar/"+id, requestOptions)
  .then(response => response.text())
  .then(result => {
    alert("Atualizado com sucesso!")
    return console.log(result)
  })
  .catch(error => {
    alert("Houve um erro!")
    return console.log('error', error)
  });
}
}