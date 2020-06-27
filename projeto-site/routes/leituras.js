var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Leitura = require('../models').Leitura;

/* Recuperar as últimas N leituras */
router.get('/ultimas', function(req, res, next) {
	
	// quantas são as últimas leituras que quer? 8 está bom?
	const limite_linhas = 10;

	console.log(`Recuperando as últimas ${limite_linhas} leituras`);
	
	let instrucaoSql = `select `;

	let momento1 = new Date();

	for (let tempos=0; tempos<10; tempos++) {
		
		let momento2 = new Date(momento1-60000);

		console.log(`m1: ${momento1} - m2: ${momento2}`);
		
		const momento1Sql = `CONVERT(Datetime, '${momento1.toLocaleDateString()} ${momento1.toLocaleTimeString()}', 120)`;
		const momento2Sql = `CONVERT(Datetime, '${momento2.toLocaleDateString()} ${momento2.toLocaleTimeString()}', 120)`;		

		let instrucao = `
		'${momento1.getHours()}:${momento1.getMinutes()}' as momento_t${tempos+1},

			(select count(idRegistro) from registro where
			fkSensor = 1 and
			dataregistro BETWEEN ${momento2Sql} and ${momento1Sql}) 
			-
			(select count(idRegistro) from registro where
			fkSensor = 2 and
			dataregistro BETWEEN ${momento2Sql} and ${momento1Sql}) 
			as passageiros_t${tempos+1} 
		`
		if (tempos+1<10) {
			instrucao+=',';
		}
		instrucaoSql += instrucao

		momento1.setTime(momento1-60000)
	}

	instrucaoSql+=';'

	console.log(`consulta: ${instrucaoSql}`);
	sequelize.query(instrucaoSql, {
		model: Leitura,
		mapToModel: true 
	  })
	  .then(resultado => {
			console.log(`Encontrados: ${resultado.length}`);
			res.json(resultado);
	  }).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
	  });
});


// tempo real (último valor de cada leitura)
router.get('/tempo-real', function (req, res, next) {
	
	console.log(`Recuperando a última leitura`);

	let instrucaoSql = `select `;

	let momento1 = new Date();

	
		
		let momento2 = new Date(momento1-60000);

		console.log(`m1: ${momento1} - m2: ${momento2}`);
		
		const momento1Sql = `CONVERT(Datetime, '${momento1.toLocaleDateString()} ${momento1.toLocaleTimeString()}', 120)`;
		const momento2Sql = `CONVERT(Datetime, '${momento2.toLocaleDateString()} ${momento2.toLocaleTimeString()}', 120)`;		

		let instrucao = `
		'${momento1.getHours()}:${momento1.getMinutes()}' as momento,

			(select count(idRegistro) from registro where
			fkSensor = 1 and
			dataregistro BETWEEN ${momento2Sql} and ${momento1Sql}) 
			-
			(select count(idRegistro) from registro where
			fkSensor = 2 and
			dataregistro BETWEEN ${momento2Sql} and ${momento1Sql}) 
			as passageiros
		`
		instrucaoSql += instrucao


	instrucaoSql+=';'

	console.log(`consulta: ${instrucaoSql}`);

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
		.then(resultado => {
			res.json(resultado[0]);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});
  
});



router.get('/estatisticas/:linha/:momento1/:momento2', function (req, res, next) {
	const linha = req.params.linha;
	const momento1 = req.params.momento1;
	const momento2 = req.params.momento2;
	
	console.log(`Recuperando as estatísticas atuais`);

	const instrucaoSql = `
	select rt.parada, 
	(
		select count(r.idRegistro) from registro r, Sensor s , Onibus o, Linha l 
		where r.fkSensor  = s.idSensor and s.fkOnibus = o.idOnibus and o.fkLinha = l.idLinha 
		and l.idLinha = ${linha} and s.localSensor = 'Entrada'
		and r.parada  = rt.parada 
		and r.dataregistro BETWEEN '${momento1}' and '${momento2}'
	) as registros
	from registro rt, Sensor st , Onibus ot , Linha lt
	where rt.fkSensor  = st.idSensor and st.fkOnibus = ot.idOnibus and ot.fkLinha = lt.idLinha
	and lt.idLinha = ${linha}
	group by rt.parada order by rt.parada 
	`;

	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
		.then(resultado => {
			res.json(resultado);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});
  
});


module.exports = router;
