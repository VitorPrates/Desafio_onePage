const btns_opcao_desafio = document.querySelectorAll(".btn_opcao_desafio")
const telas_desafios = document.querySelectorAll(".tela_desafio")


//desafio 1
const dolar_atual_view = document.querySelector(".dolar_atual")
const conversao_atual_view = document.querySelector(".conversao_atual")
const form_dolar = document.getElementById("form_conversor")
let dolar_padrao = 5

btns_opcao_desafio.forEach((btn,index) =>{
    btn.style.backgroundColor = `var(--cor${index+1})`
    btn.addEventListener("click", (e) =>{
        e.preventDefault()
        console.log(e.target.innerText.at(-1));
        telas_desafios.forEach((tela,index) => {
            tela.classList.remove("selecionado")
            tela.style.backgroundColor = `var(--cor${index+1})`
        })
        telas_desafios[e.target.innerText.at(-1)-1].classList.add("selecionado")
    })
})

async function getdolar()
{
    const url = " https://economia.awesomeapi.com.br/json/last/USD-BRL"
    try {
        const dolar_hoje = await(await fetch(url)).json()
        const dolar_atual = +dolar_hoje.USDBRL.bid
        dolar_padrao = +dolar_hoje.USDBRL.bid
        // console.log(dolar_atual.toLocaleString("pt-BR",{style:"currency", currency:"BRL"}));
        dolar_atual_view.innerHTML = `Valor do dolar hoje: ${dolar_atual.toLocaleString("pt-BR",{style:"currency", currency:"BRL"})}`
    } catch (error) {
        
    }

}
getdolar()

form_dolar.addEventListener("input", (e)=>{
    let input_user = e.target.value
    const calculado = dolar_padrao * input_user
    conversao_atual_view.innerHTML = calculado.toLocaleString("pt-BR",{style:"currency", currency:"BRL"})
})