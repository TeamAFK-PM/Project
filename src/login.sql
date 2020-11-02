use master
go

if DB_ID('loginName') is not null
	drop database loginName

create database loginName
go

use loginName

CREATE TABLE USERS
(
	ID INT IDENTITY(1,1) PRIMARY KEY,
	USERNAME NVARCHAR(30) NOT NULL,
	PASS NVARCHAR(100) NOT NULL,
	email varchar(100) not null
)

INSERT USERS
VALUES
	('test', '$2b$10$iJI0CLe52lMRaQJOJzw4y.Q/5LJakIff40SXH5r2t8FBduvqPDN9m', 'test@test.com'),
	('thanh', '$2b$10$aP4fLm/DfWnAJx45Ar16fOS/uWigSG4PhEEykYH8u1ctsCkT0Izxi', 'thanh@gmail.com'),
	('a', '$2b$10$2YhT5bOyWKf4ytW1iadg3O2bSJuSalSyiisq2O6b8snJF1w2u56zC', 'a@gmail.com')


SELECT * FROM USERS