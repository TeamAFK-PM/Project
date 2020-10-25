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
	PASS NVARCHAR(30) NOT NULL,
	email varchar(100) not null
)

INSERT USERS
VALUES
	('test', 'test', 'test@test.com'),
	('thanh', 'thanh', 'thanh@gmail.com'),
	('a', 'a', 'a@gmail.com')


SELECT * FROM USERS