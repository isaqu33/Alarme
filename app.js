var input = document.getElementById("input")
var mostrar = document.getElementById("container-alarmes")
var nomeTarefa = document.getElementById("nomeTarefa")
var ShowAlarmar = document.querySelector(".notification")
var musica = document.querySelector("#play")
var imputEditHora = document.querySelector("#input-edit")
var imputEditnome = document.querySelector("#imputTarefaedit")
var canceleditalarm = document.querySelector(".cancelar-edit")

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


    } else {

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
    let segundos = hoje.getSeconds();


    let mostrar = `${("0" + horas).slice(-2)}:${("0" + minutos).slice(-2)}:${("0" + segundos).slice(-2)}`

    return mostrar
}

var atualizarHoras = setInterval(() => {

    document.querySelector("#mostrarHoras").innerHTML = getHoras();

    alarmar();

}, 500)



function aparecer() {
    let classe = document.querySelector(".abainput");
    classe.style.transform = "translateY(0%)"



}

function desaparecer() {
    let classe = document.querySelector(".abainput");
    classe.style.transform = "translateY(100%)"

}




function getHtml({
    horario,
    id,
    nome
}) {


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

    const novoarrey = banco.filter(({
        id
    }) => id != elemento)

    dbSave(novoarrey)

    aparecerDom()

}

function appearNotificação() {

    let classe = document.querySelector(".notification");
    classe.style.display = "flex";
    playerPlay()

}

function vanishNotificação() {
    let classe = document.querySelector(".notification")
    classe.style.display = "none"

    playerStop()
}


function notificar(obj) {

    document.querySelector("#notification-name").innerHTML = obj.nome

    document.querySelector("#time-notification").innerHTML = obj.horario


    appearNotificação()


}


function playerPlay() {
    musica.play();

}

function playerStop() {

    musica.pause()
    musica.currentTime = 0;
}

function setNewDado(parametro) {

    let banco = bdGet();


    banco.forEach((Element, index) => {

        if (`${Element.id}` == parametro) {

            let domnotificar = document.querySelector(".abainputajusttime")
            domnotificar.style.display = "flex"

            imputEditHora.value = Element.horario, imputEditnome.value = Element.nome

            indexAlarmeAtivo = index

            document.querySelector(".salvar-edit").addEventListener("click", editarAlarme)
        }



    });


}

function editarAlarme() {

    let banco = bdGet();

    let elemento = banco[indexAlarmeAtivo]


    elemento.horario = imputEditHora.value

    elemento.nome = imputEditnome.value

    dbSave(banco)

    aparecerDom()

    let classe = document.querySelector(".abainputajusttime");
    classe.style.display = "none"

}

canceleditalarm.addEventListener("click", () => {

    document.querySelector(".abainputajusttime").style.display = "none"
})