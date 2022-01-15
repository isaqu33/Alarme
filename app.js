var input = document.getElementById("input")
var mostrar = document.getElementById("container-alarmes")
var nomeTarefa = document.getElementById("nomeTarefa")
var ShowAlarmar = document.querySelector(".notification")
var musica = document.querySelector("#play")

var indexAlarmeAtivo = "";

function criarBanco() {
    if (localStorage.getItem("banco") === null) {
        localStorage.setItem("banco", "[]")
    }

}

function reloud() {

    criarBanco()
    bdGet()
    aparecerDom()


}

function bdGet() {
    let banco = localStorage.getItem("banco")
    let dados = JSON.parse(banco)

    return dados
}

function dbSave(dado) {

    let banco = JSON.stringify(dado)
    localStorage.setItem("banco", banco)
}

function alarmar() {

    let hora_atual = new Date()
    let horas = hora_atual.getHours();
    let min = hora_atual.getMinutes();
    let seg = hora_atual.getSeconds();

    let banco = bdGet()

    let resultado = `${("0" + horas).slice(-2)}:${("0" + min).slice(-2)}:${seg}`

    banco.forEach(Element => {

        if (`${Element.horario}:0` == resultado) {

            notificar(Element)
        }

    });



}


function adicionarObjeto(elemento, nomes) {




    obj = {
        horario: elemento,
        id: Math.floor(Math.random() * 1000),
        activt: true,
        nome: nomes,



    }

    let banco = bdGet()

    banco.push(obj)

    dbSave(banco)



}

function adicionar() {
    if (input.value === "") {

        alert("Nenhuma atividade foi adicionada!")


    }

    else {

        adicionarObjeto(input.value, nomeTarefa.value);
        aparecerDom()
        input.value = ""
        nomeTarefa.value = ""
        desaparecer()






    }

}


// HORAS ==================================================== 

function getHoras() {
    let hoje = new Date()


    let horas = hoje.getHours();
    let minutos = hoje.getMinutes();
    // let segundos = hoje.getSeconds();


    let mostrar = `${("0" + horas).slice(-2)}:${("0" + minutos).slice(-2)}`

    return mostrar
}

var atualizarHoras = setInterval(() => {

    document.querySelector("#mostrarHoras").innerHTML = getHoras();

    alarmar();

}, 500)



function aparecer() {
    let classe = document.querySelector(".abainput");
    classe.style.display = "flex";

    document.querySelector("#btn-add").addEventListener("click", adicionar)

}

function desaparecer() {
    let classe = document.querySelector(".abainput");
    classe.style.display = "none";

}




function getHtml({ horario, id, nome }) {


    let aparecer = `
    <div class="tarefa-adicionada" onclick="setNewDado(${id})">
        

        <div id="manipulando">
            
            
            <span>${horario}</span> <span>${nome}</span> <ion-icon name="trash-outline" onclick="apagar(${id})" ></ion-icon>

        </div>
                
        

    </div>`

    return aparecer





}

function aparecerDom() {

    let banco = bdGet();
    let dado = banco.map(getHtml)

    mostrar.innerHTML = dado.join("");

}

function apagar(elemento) {
    const banco = bdGet();

    const novoarrey = banco.filter(({ id }) => id != elemento)

    dbSave(novoarrey)

    aparecerDom()

}

function appearNotificação() {
    
    let classe = document.querySelector(".notification");
    classe.style.display = "flex";
    playerPlay()

}

function vanishNotificação(){
    let classe= document.querySelector(".notification")
    classe.style.display = "none"

    playerStop()
}


function notificar(obj){

    document.querySelector("#notification-name").innerHTML = obj.nome

    document.querySelector("#time-notification").innerHTML = obj.horario


    appearNotificação()


}


function playerPlay(){
    musica.play( );

}

function playerStop(){

    musica.pause( )
    musica.currentTime = 0;
}

function setNewDado(parametro){

    let banco = bdGet();

    
    banco.forEach((Element, index) => {
        
        if (`${Element.id}` == parametro) {
            
            aparecer( input.value = Element.horario, nomeTarefa.value = Element.nome ) 
            
            indexAlarmeAtivo = index
            
            document.querySelector("#btn-add").addEventListener("click", editarAlarme)
        }

        

    });

   
}

function editarAlarme(){

    let banco = bdGet();

    let elemento = banco[indexAlarmeAtivo]

    elemento.horario = input.value

    elemento.nome = nomeTarefa.value

    dbSave(banco)

    aparecerDom()

    desaparecer()

}







// console.log(alarmar())

