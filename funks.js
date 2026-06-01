const btns_opcao_desafio = document.querySelectorAll(".btn_opcao_desafio")
const telas_desafios = document.querySelectorAll(".tela_desafio")
const background_dashboard = document.getElementById("Display_dashboard")

//Elementos 3D - elementos
const cube = document.getElementById('cube');
let rodando = false

let isDragging = false;
let previousX = 0;
let previousY = 0;

let rotateX = -20;
let rotateY = 30;
//Fim elementos 3D - elementos

//Elementos 3D - funções
cube.addEventListener('mousedown', (e) => {
    isDragging = true;
    document.body.style.userSelect = 'none';
    previousX = e.clientX;
    previousY = e.clientY;
});

window.addEventListener('mouseup', () => {
    isDragging = false;
    document.body.style.userSelect = '';
    // console.log(`X: ${rotateX} / Y: ${rotateY}`);
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - previousX;
    const deltaY = e.clientY - previousY;

    rotateY += deltaX * 0.15;
    rotateX -= deltaY * 0.15;

    cube.style.transform =
        `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    previousX = e.clientX;
    previousY = e.clientY;
});

function rodar(pos)
{
    if(!rodando)
    {
        rodando = true
        let alvoX = 0;
        let alvoY = 0;

        switch (pos)
        {
            case 1:
                alvoX = 0;
                alvoY = 0;
                break;

            case 2:
                alvoX = 0;
                alvoY = 180;
                break;

            case 3:
                alvoX = 0;
                alvoY = 270;
                break;

            case 4:
                alvoX = 0;
                alvoY = 90;
                break;

            case 5:
                alvoX = -90;
                alvoY = 0;
                break;

            case 6:
                alvoX = 90;
                alvoY = 0;
                break;
        }

        function animar()
        {
            const velocidade = 0.15;

            rotateX += (alvoX - rotateX) * velocidade;
            rotateY += (alvoY - rotateY) * velocidade;

            cube.style.transform =
                `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

            const chegouX = Math.abs(alvoX - rotateX) < 0.1;
            const chegouY = Math.abs(alvoY - rotateY) < 0.1;

            if (!chegouX || !chegouY)
            {
                requestAnimationFrame(animar);
            }
            else
            {
                rotateX = alvoX;
                rotateY = alvoY;
                cube.style.transform =
                    `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                rodando = false
            }
        }
        requestAnimationFrame(animar);
    }
    
}

function acoes_rotacao()
{
    
}

//Fim- elementos 3d - funções


//desafio 1
const dolar_atual_view = document.querySelector(".dolar_atual")
const real_atual_view = document.querySelector(".real_atual")
const conversao_atual_view = document.querySelector(".conversao_atual")
const form_dolar = document.getElementById("form_conversor")
let dolar_padrao = 5

//Desafio 2
let imc = 0
const form_imc = document.getElementById("form_calcular_imc")
const result_imc = document.getElementById("result_imc")
const result_faixa_imc = document.getElementById("result_faixa_imc")


//barra lateral
btns_opcao_desafio.forEach((btn,index) =>{
    btn.style.backgroundColor = `var(--cor${index+1})`
    btn.addEventListener("click", (e) =>{
        e.preventDefault()
        background_dashboard.style.backgroundColor = `var(--cor${e.target.innerText.at(-1)})`
        console.log(e.target.innerText.at(-1));
        rodar(index+1)
        telas_desafios.forEach((tela,index) => {
            tela.classList.remove("selecionado")
            tela.style.borderColor = `var(--cor${index+1})`
        })
        // telas_desafios[e.target.innerText.at(-1)-1].classList.add("selecionado")
    })
})

//Desafio 1
async function getdolar()
{
    const url = " https://economia.awesomeapi.com.br/json/last/USD-BRL"
    try {
        const dolar_hoje = await(await fetch(url)).json()
        const dolar_atual = +dolar_hoje.USDBRL.bid
        dolar_padrao = +dolar_hoje.USDBRL.bid
        // console.log(dolar_atual.toLocaleString("pt-BR",{style:"currency", currency:"BRL"}));
        dolar_atual_view.innerHTML = `Valor do dolar hoje: ${(dolar_atual).toLocaleString("pt-BR",{style:"currency", currency:"BRL"})}`
        

    } catch (error) {
        
    }

}
getdolar()

form_dolar.addEventListener("input", (e)=>{
    let input_user = e.target.value
    const calculado = dolar_padrao * input_user
    conversao_atual_view.innerHTML = calculado.toLocaleString("pt-BR",{style:"currency", currency:"BRL"})
})


//desafio 2
form_imc.addEventListener("input", (e) =>{
    const result_form = new FormData(form_imc)
    const dados_form = Object.fromEntries(result_form.entries())
    // console.log(dados_form);

    let calculo = +dados_form.peso/(((+dados_form.altura < 3? +dados_form.altura*100 : +dados_form.altura)/100)**2)
    console.log(calculo);
    console.log(!Number.isFinite(calculo));
    console.log(!isNaN(calculo.toFixed(2)));
    result_imc.innerHTML = `Imc Calculado: ${!isNaN(calculo.toFixed(2))? !Number.isFinite(calculo)? "0" : calculo.toFixed(2): "0"}`
    if(dados_form.sexo == "Masculino")
    {
        if(calculo < 18.5)
        {
            result_faixa_imc.innerHTML = `Seu caso é: Abaixo do peso`
        }
    }
})



function calcular_imc()
{

}