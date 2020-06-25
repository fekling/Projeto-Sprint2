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
}