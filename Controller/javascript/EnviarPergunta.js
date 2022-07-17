function esconder(){
  document.getElementById("alternativas").style.visibility="hidden"
}
function mostrar(){
  document.getElementById("alternativas").style.visibility="visible"
}

function postar(){

  if ((document.getElementById("resposta").value=="") | (document.getElementById("enunciado").value=="")){
    console.log("campo obrigatorio em branco")
  }
  else{
// get the form element from dom
const formElement = document.querySelector("form")

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

if(document.getElementById("mEscolha").checked){
  var tipo = document.getElementById("mEscolha").value
}
else if(document.getElementById("ePalavra").checked){
  var tipo = document.getElementById("ePalavra").value
}

var raw = JSON.stringify(
  {
    "tipo": tipo,
    "categoria": document.getElementById("categoria").value,
    "dificuldade": document.getElementById("dificuldade").value,
    "enunciado": document.getElementById("enunciado").value,
    "alternativaA": document.getElementById("alternativaA").value,
    "alternativaB": document.getElementById("alternativaB").value,
    "alternativaC": document.getElementById("alternativaC").value,
    "alternativaD": document.getElementById("alternativaD").value,
    "resposta": document.getElementById("resposta").value
  }
);
console.log(raw)
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'

};

fetch("http://localhost:8080/api/questao/adicionar", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => {
    alert("houve um erro! \n\nVerifique o status de servidor do banco de dados")
    return console.log('error', error);
  });

document.getElementById("adicionar-perguntas").reset()
}
}