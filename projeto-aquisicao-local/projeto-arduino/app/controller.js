const express = require('express');
const { ArduinoDataTemp } = require('./newserial')
const { ArduinoDataHumidity } = require('./serialHumidity')
const { ArduinoDataSwitch } = require('./serialSwitch')
const { ArduinoDataLuminosity} = require('./serialLuminosidity')
//const db = require('./database')
const banco = require(`./database`);
const registros_mantidos_tabela_leitura = 10000;
const router = express.Router();


router.get('/', (request, response, next) => {

    let sum = ArduinoDataTemp.List.reduce((a, b) => a + b, 0);
    let average = (sum / ArduinoDataTemp.List.length).toFixed(2);
	let sumHour = ArduinoDataTemp.ListHour.reduce((a, b) => a + b, 0);
	let averageHour = (sumHour / ArduinoDataTemp.ListHour.length).toFixed(2);
    
    response.json({
        data: ArduinoDataTemp.List,
        total: ArduinoDataTemp.List.length,
        average: isNaN(average) ? 0 : average,
		dataHour: ArduinoDataTemp.ListHour,
		totalHour: ArduinoDataTemp.ListHour.length,
		averageHour: isNaN(averageHour) ? 0 : averageHour
    });

});

router.get('/humidity', (request, response, next) => {

    let sum = ArduinoDataHumidity.List.reduce((a, b) => a + b, 0);
    let average = (sum / ArduinoDataHumidity.List.length).toFixed(2);
	let sumHour = ArduinoDataHumidity.ListHour.reduce((a, b) => a + b, 0);
	let averageHour = (sumHour / ArduinoDataHumidity.ListHour.length).toFixed(2);

    response.json({
        data: ArduinoDataHumidity.List,
        total: ArduinoDataHumidity.List.length,
        average: isNaN(average) ? 0 : average,
		dataHour: ArduinoDataHumidity.ListHour,
		totalHour: ArduinoDataHumidity.ListHour.length,
		averageHour: isNaN(averageHour) ? 0 : averageHour
    });

});

router.get('/switch', (request, response, next) => {

    let sum = ArduinoDataSwitch.List.reduce((a, b) => a + b, 0);
    let average = (sum / ArduinoDataSwitch.List.length).toFixed(2);
	let sumHour = ArduinoDataSwitch.ListHour.reduce((a, b) => a + b, 0);
	let averageHour = (sumHour / ArduinoDataSwitch.ListHour.length).toFixed(2);

    response.json({
        data: ArduinoDataSwitch.List,
        total: ArduinoDataSwitch.List.length,
        average: isNaN(average) ? 0 : average,
		dataHour: ArduinoDataSwitch.ListHour,
		totalHour: ArduinoDataSwitch.ListHour.length,
		averageHour: isNaN(averageHour) ? 0 : averageHour
    });


var presenca = ArduinoDataSwitch.List[ArduinoDataSwitch.List.length -1]

console.log('\nIniciando inclusão de novo registro...');
    console.log(`presenca: ${presenca}`);

    banco.conectar().then(() => {

        return banco.sql.query(`
        INSERT into registro (registro, dataregistro,FkSensor)
        values (${presenca}, CONVERT(Datetime, '${agora()}', 120),${parseInt(Math.random()*2)+1});
        
        delete from Registro where idRegistro not in 
        (select top ${registros_mantidos_tabela_leitura} idRegistro from registro order by idRegistro desc);`)
        .then(() => {
            console.log('Registro inserido com sucesso!');
        });
        

    }).catch(erro => {

        console.error(`Erro ao tentar registrar aquisição na base: ${erro}`);

    }).finally(() => {
        banco.sql.close();
    });

    function agora() {
        const momento_atual = new Date();
        const retorno = `${momento_atual.toLocaleDateString()} ${momento_atual.toLocaleTimeString()}`;
        console.log(`Data e hora atuais: ${retorno}`);
        return retorno;
    }
    
});

router.get('/luminosity', (request, response, next) => {

    let sum = ArduinoDataLuminosity.List.reduce((a, b) => a + b, 0);
    let average = (sum / ArduinoDataLuminosity.List.length).toFixed(2);
	let sumHour = ArduinoDataLuminosity.ListHour.reduce((a, b) => a + b, 0);
	let averageHour = (sumHour / ArduinoDataLuminosity.ListHour.length).toFixed(2);

    response.json({
        data: ArduinoDataLuminosity.List,
        total: ArduinoDataLuminosity.List.length,
        average: isNaN(average) ? 0 : average,
		dataHour: ArduinoDataLuminosity.ListHour,
		totalHour: ArduinoDataLuminosity.ListHour.length,
		averageHour: isNaN(averageHour) ? 0 : averageHour
    });

// router.post('/sendData', (request, response) => {

//     temperature = ArduinoDataTemp.List[ArduinoDataTemp.List.length -1];
//     Humidity = ArduinoDataHumidity.List[ArduinoDataHumidity.List.length -1];
//     luminosidade = ArduinoDataLuminosity.List[ArduinoDataLuminosity.List.length -1]

// 	var sql = "INSERT INTO medidas(type, value) VALUES(?)";
//     var values= [['temperatura',temperature],['umidade',Humidity]];
    
//     for (i = 0; i < values.length; i++){

//         db.query(sql,[values[i]],function(err, result) {
//             if (err) throw err;
//             console.log("Medidas inseridas: " + result.affectedRows);
//         });
//     }

//     response.sendStatus(200);
// })

});

module.exports = router;