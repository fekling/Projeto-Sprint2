const { mapFinderOptions } = require("sequelize/types/lib/utils");

function escolherData(){
    let dataEscolhida = data.value;
    let hoje = new Date();
    if(dataEscolhida != undefined){
        plotarGraficoManha(1,dataEscolhida);
        plotarGraficotarde(1,dataEscolhida);
    }
    else{
        plotarGraficoManha(1,hoje);
        plotarGraficotarde(1,hoje);
    }
}
function abrirsemanal(){
    semanal.style.display = 'block';
    graficoreal.style.display = 'none';
    alerta.style.display = 'none';
    diario.style.display = 'none';
    sem.style.color = 'rgb(2, 127, 165)';
    dia.style.color = 'white'
    temp.style.color = 'white'
}
function abrirtemporeal(){
    semanal.style.display = 'none';
    diario.style.display = 'none';
    graficoreal.style.display = 'block';
    alerta.style.display = 'block';
    sem.style.color = 'white';
    dia.style.color = 'white';
    temp.style.color = 'rgb(2, 127, 165)';
}
function abrirdiario(){
    semanal.style.display = 'none';
    diario.style.display = 'block';
    graficoreal.style.display = 'none';
    alerta.style.display = 'none';
    sem.style.color = 'white';
    dia.style.color = 'rgb(2, 127, 165)';
    temp.style.color = 'white';
    window.onload = escolherData();
}
function abrirgraficos(){
    main.style.display = 'block';
    welcome.style.display = 'none';
}