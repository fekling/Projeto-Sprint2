create database mobility_solution;
use mobility_solution;
create table Empresa(
    cnpj char(17) primary key,
    nome varchar(30),
    emailEmpresa varchar(30),
    inscricaoEstadual char(9),
    nomeResponsavel varchar(50),
    rgResponsavel varchar(15),
    cargoResponsavel varchar(40),
    estado varchar(30),
    cidade varchar(30),
    bairro varchar(30),
    cep char(9),
    rua varchar(30)
);
create table Usuario(
	idUsuario int primary key auto_increment,
    nome varchar(30),
    email varchar(40),
    senha varchar(15),
    fkEmpresa char(17),
    foreign key (fkEmpresa) references Empresa(cnpj)
);
create table Linha(
	idLinha int primary key auto_increment,
    trajeto varchar(30)
);
create table Motorista(
	idMotorista int primary key auto_increment,
    nome varchar(40),
    cnh varchar(15),
    horarioEntrada time,
    horarioSaida time,
    fkEmpresa char(17),
    foreign key (fkEmpresa) references Empresa (cnpj)
);
create table Onibus(
	idOnibus int primary key auto_increment,
    placa char(9),
    modelo varchar(20),
    fkLinha int,
    foreign key(fkLinha) references Linha(idLinha)
);
create table OnibusMotorista(
	idOnibusMotorista int primary key auto_increment,
    fkOnibus int,
    foreign key (fkOnibus) references Onibus(idOnibus),
    fkMotorista int,
    foreign key (fkMotorista) references Motorista(idMotorista)
);
create table Sensor(
	idSensor int primary key auto_increment,
    tipo varchar(30),
    localSensor varchar(40),
    dataHora datetime,
    fkOnibus int,
    foreign key(fkOnibus) references Onibus(idOnibus)
);