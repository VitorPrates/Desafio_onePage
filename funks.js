//Barra Lateral
const btns_opcao_desafio = document.querySelectorAll(".btn_opcao_desafio")
const telas_desafios = document.querySelectorAll(".tela_desafio")
const background_dashboard = document.getElementById("Display_dashboard")
const tela_conversor = document.querySelector(".conversor")
const btn_mudar_conversao = document.querySelector(".btn_mudar_conversao")

//desafio 1
const dolar_atual_view = document.querySelector(".dolar_atual")
const real_atual_view = document.querySelector(".real_atual")
const conversao_atual_view = document.querySelector(".conversao_atual")
const para_converter_view = document.querySelector(".para_converter")
const form_dolar = document.getElementById("form_conversor")
let dolar_padrao = 5
let real_para_dolar = true

//Desafio 2
let imc = 0
const form_imc = document.getElementById("form_calcular_imc")
const result_imc = document.getElementById("result_imc")
const result_faixa_imc = document.getElementById("result_faixa_imc")

//Desafio 3
const form_celsius = document.querySelector(".celsius_form")
const form_fahrenheit = document.querySelector(".fahrenheit_form")
const celsius_input = document.getElementById("celsius_input")
const fahrenheit_input = document.getElementById("fahrenheit_input")

//Desafio 4
const kmh_form = document.querySelector(".kmh_form")
const mph_form = document.querySelector(".mph_form")
const kmh_input = document.getElementById("kmh_input")
const mph_input = document.getElementById("mph_input")

//Desafio 5
const kg_form = document.querySelector(".kg_form")
const lbs_form = document.querySelector(".lbs_form")
const kg_input = document.getElementById("kg_input")
const lbs_input = document.getElementById("lbs_input")

//Elementos 3D - elementos
const cube = document.getElementById('cube');
const faces = document.querySelectorAll(".face")
const eye = document.querySelector(".olho")

let rodando = false

let isDragging = false;
let previousX = 0;
let previousY = 0;

let rotateX = -20;
let rotateY = 30;
// let rotateX = 0;
// let rotateY = 180;

//Fim elementos 3D - elementos

//Elementos 3D - funções
eye.addEventListener("click",()=>{
    faces.forEach(face =>{
        console.log(face.style.opacity);
        face.style.opacity = face.style.opacity == 1 ? 0.5 : 1
    })
})


cube.addEventListener('pointerdown', (e) => {
    isDragging = true;
    document.body.style.userSelect = 'none';
    previousX = e.clientX;
    previousY = e.clientY;
});

window.addEventListener('pointerup', () => {
    isDragging = false;
    document.body.style.userSelect = '';
    // console.log(`X: ${rotateX} / Y: ${rotateY}`);
    // acoes_rotacao()
});

window.addEventListener('pointermove', (e) => {
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
    console.log(pos);
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
            case 7:
                rodando = false
                rodar(Math.floor(Math.random() * 6) + 1)
                return
                break;
        }

        function animar()
        {
            const velocidade = 0.15;
            // const velocidade = 1.99;

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
    if(rotateX < -90 || rotateX > 90 )
    {
        tela_conversor.style.transform = "rotateZ(180deg)"
    }
    else
    {
        tela_conversor.style.transform = "rotateZ(0deg)"
    }
}

//Fim- elementos 3d - funções


//barra lateral
btns_opcao_desafio.forEach((btn,index) =>{
    btn.style.backgroundColor = `var(--cor${index+1})`
    btn.addEventListener("click", (e) =>{
        e.preventDefault()
        // background_dashboard.style.backgroundColor = `var(--cor${e.target.innerText.at(-1)})`
        // console.log(e.target.innerText.at(-1));
        // console.log(index+1);
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
        // console.log(dolar_hoje);
        const dolar_atual = +dolar_hoje.USDBRL.bid
        dolar_padrao = +dolar_hoje.USDBRL.bid
        // console.log(dolar_atual.toLocaleString("pt-BR",{style:"currency", currency:"BRL"}));
        dolar_atual_view.innerHTML = `Valor do dolar hoje: ${(dolar_atual).toLocaleString("pt-BR",{style:"currency", currency:"BRL"})}`
    } catch (error) {
        
    }

}
getdolar()

function calcular_resultado_cotacao(valor)
{
    if(real_para_dolar)
    {
        const calculado = dolar_padrao * valor
        conversao_atual_view.innerHTML = calculado.toLocaleString("pt-BR",{style:"currency", currency:"BRL"})
    }
    else
    {
        const calculado = valor / dolar_padrao
        conversao_atual_view.innerHTML = calculado.toLocaleString("en",{style:"currency", currency:"USD"})
    }
}
form_dolar.addEventListener("input", (e)=>{
    let input_user = e.target.value
    calcular_resultado_cotacao(input_user)
})
btn_mudar_conversao.addEventListener("click",()=>{
    let rot = 0
    function rodar_conversor()
    {
        
        if(rot < 330)
        {
            requestAnimationFrame(rodar_conversor)
        }
        rot += 30

        btn_mudar_conversao.style.transform = `rotate(${rot}deg)`
    }
    requestAnimationFrame(rodar_conversor)
    
    real_para_dolar = !real_para_dolar
    if(!real_para_dolar)
    {
        para_converter_view.innerHTML = "R$<input type='number' placeholder='00,00' min='0'>"
        conversao_atual_view.innerHTML = "$00,00"
    }
    else
    {
        para_converter_view.innerHTML = "$<input type='number' placeholder='00,00' min='0'>"
        conversao_atual_view.innerHTML = "R$00,00"
    }
})

//desafio 2
form_imc.addEventListener("input", (e) => {
    const result_form = new FormData(form_imc);
    const dados_form = Object.fromEntries(result_form.entries());

    //Conversão e tratamento dos dados de entrada
    const peso = parseFloat(dados_form.peso) || 0;
    let altura = parseFloat(dados_form.altura) || 0;

    // Se o usuário digitou a altura em centímetros (ex: 170), transforma em metros (1.70)
    if (altura > 3) {
        altura = altura / 100;
    }

    // Evita divisão por zero
    if (peso === 0 || altura === 0) {
        result_imc.innerHTML = "Imc Calculado: 0";
        result_faixa_imc.innerHTML = "Diagnóstico: ...";
        return; // Para a execução aqui até que o usuário digite dados válidos
    }

    // 2. Cálculo do IMC
    const calculo = peso / (altura * altura);
    result_imc.innerHTML = `Imc Calculado: ${calculo.toFixed(2)}`;

    // 3. Ajuste de faixa para o sexo feminino (Subtrai 1 das faixas superiores)
    const ajusteSexo = (dados_form.sexo === "Feminino" || dados_form.sexo === "Femenino") ? 1 : 0;

    // 4. Classificação do IMC (Sem buracos entre os números)
    if (calculo < 18.5) {
        result_faixa_imc.innerHTML = "Diagnóstico: Abaixo do peso";
    } 
    else if (calculo <= 24.9 - ajusteSexo) {
        result_faixa_imc.innerHTML = "Diagnóstico: Normal";
    } 
    else if (calculo <= 29.9 - ajusteSexo) {
        result_faixa_imc.innerHTML = "Diagnóstico: Sobrepeso";
    } 
    else {
        result_faixa_imc.innerHTML = "Diagnóstico: Obesidade";
    }
});

//Desafio 3
form_celsius.addEventListener("input", (e) =>{
//   °C → °F: C × 1.8 + 32
    let calculo_temperatura = (e.target.value * 1.8) + 32
    fahrenheit_input.value = calculo_temperatura.toFixed(2)
})
form_fahrenheit.addEventListener("input", (e) =>{
//   °F → °C: (F − 32) / 1.8
    let calculo_temperatura = (e.target.value - 32) / 1.8
    celsius_input.value = calculo_temperatura.toFixed(2)
})

//Desafio 4
kmh_form.addEventListener("input", (e) =>{
//1 km/h = 0.621371 mph
    let calculo_velocidade= e.target.value * 0.621371
    mph_input.value = calculo_velocidade.toFixed(2)
})
mph_form.addEventListener("input", (e) =>{
    let calculo_velocidade =  e.target.value / 0.621371
    kmh_input.value = calculo_velocidade.toFixed(2)
})

//Desafio 5
kg_form.addEventListener("input", (e) =>{
//1 kg = 2,20462 Libras
    let calculo_massa= e.target.value * 2.20462
    lbs_input.value = calculo_massa.toFixed(2)
})
lbs_form.addEventListener("input", (e) =>{
    let calculo_massa =  e.target.value / 2.20462
    kg_input.value = calculo_massa.toFixed(2)
})
