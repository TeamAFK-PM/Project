use QuanLyCauThu

--Tạo giải đấu
insert into GiaiDau
values(2019, N'Hoàng Sa'),
(2020, N'Trường Sa')

--Tạo trận đấu mùa giải 2019
insert into TranDau
values(2019, 1, 'player01', 'player02', 'player01'),
(2019, 1, 'player03', 'player04', 'player04'),
(2019, 1, 'player05', 'player06', 'player05'),
(2019, 1, 'player07', 'player08', 'player07'),
(2019, 1, 'player09', 'player10', 'player10'),
(2019, 1, 'player11', 'player12', 'player11'),
(2019, 1, 'player13', 'player14', 'player14'),
(2019, 1, 'player15', 'player16', 'player15'),
(2019, 1, 'player17', 'player18', 'player17'),
(2019, 1, 'player19', 'player20', 'player19'),
(2019, 1, 'player21', 'player22', 'player22'),
(2019, 1, 'player23', 'player24', 'player24'),
(2019, 1, 'player25', 'player26', 'player26'),
(2019, 1, 'player27', 'player28', 'player27'),
(2019, 1, 'player29', 'player30', 'player29'),
(2019, 1, 'player31', 'player32', 'player31')

insert into TranDau
values(2019, 2, 'player01', 'player04', 'player01'),
(2019, 2, 'player05', 'player07', 'player05'),
(2019, 2, 'player10', 'player11', 'player11'),
(2019, 2, 'player14', 'player15', 'player14'),
(2019, 2, 'player17', 'player19', 'player19'),
(2019, 2, 'player22', 'player24', 'player22'),
(2019, 2, 'player26', 'player27', 'player27'),
(2019, 2, 'player29', 'player31', 'player31')

insert into TranDau
values(2019, 3, 'player01', 'player05', 'player05'),
(2019, 3, 'player11', 'player14', 'player11'),
(2019, 3, 'player19', 'player22', 'player19'),
(2019, 3, 'player27', 'player31', 'player31')

insert into TranDau
values(2019, 4, 'player05', 'player11', 'player05'),
(2019, 4, 'player19', 'player31', 'player31')

insert into TranDau
values(2019, 5, 'player05', 'player31', 'player05')



--======================================
--Tạo trận đấu mùa giải 2020
insert into TranDau
values(2020, 1, 'player01', 'player02', 'player01'),
(2020, 1, 'player03', 'player04', 'player04'),
(2020, 1, 'player05', 'player06', 'player05'),
(2020, 1, 'player07', 'player08', 'player07'),
(2020, 1, 'player09', 'player10', 'player10'),
(2020, 1, 'player11', 'player12', 'player11'),
(2020, 1, 'player13', 'player14', 'player14'),
(2020, 1, 'player15', 'player16', 'player15'),
(2020, 1, 'player17', 'player18', 'player17'),
(2020, 1, 'player19', 'player20', 'player19'),
(2020, 1, 'player21', 'player21', 'player21')--player 21 vô thẳng

insert into TranDau
values(2020, 2, 'player01', 'player04', 'player01'),
(2020, 2, 'player05', 'player07', 'player05'),
(2020, 2, 'player10', 'player11', 'player11'),
(2020, 2, 'player14', 'player15', 'player14'),
(2020, 2, 'player17', 'player21', 'player21'),
(2020, 2, 'player19', 'player19', 'player19')

insert into TranDau
values(2020, 3, 'player01', 'player05', 'player05'),
(2020, 3, 'player11', 'player14', 'player11'),
(2020, 3, 'player19', 'player21', 'player19')

insert into TranDau
values(2020, 4, 'player05', 'player11', 'player05'),
(2020, 4, 'player19', 'player19', 'player19')

insert into TranDau
values(2020, 5, 'player05', 'player19', 'player05')