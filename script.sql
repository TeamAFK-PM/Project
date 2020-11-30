create database QuanLyCauThu
go

use QuanLyCauThu
go

--Tạo bảng

create table LoaiNguoiDung(
	MaLoaiNguoiDung int primary key,
	TenLoaiNguoiDung nvarchar(50) not null
)

create table NguoiDung(
	TenDangNhap nvarchar(50) primary key,
	MatKhau nvarchar(50) not null,
	HoTen nvarchar(50) not null,
	VaiTro int not null,
	NgaySinh datetime not null,
	DiaChi nvarchar(50) not null,
	Email varchar(50),
	SoDienThoai varchar(20) not null,
	GioiTinh bit, --1: nam 0: nu
	CMND varchar(20),
	constraint fk_nguoidung_loainguoidung
	foreign key(VaiTro)
	references LoaiNguoiDung(MaLoaiNguoiDung)
)


create table GiaiDau(
	MaMuaGiai int primary key,
	DiaDiem nvarchar(100)
)

create table VongDau(
	MaVongDau int primary key,
	TenVongDau nvarchar(50) not null
)

create table TranDau(
	MuaGiai int not null,
	VongDau int not null,
	CauThu1 nvarchar(50) not null,
	CauThu2 nvarchar(50) not null,
	KetQua nvarchar(50),
	primary key(MuaGiai, VongDau, CauThu1, CauThu2),
	constraint fk_trandau_muagiai foreign key(MuaGiai) references GiaiDau(MaMuaGiai),
	constraint fk_trandau_vongdau foreign key(VongDau) references VongDau(MaVongDau),
	constraint fk_trandau_cauthu1 foreign key(CauThu1) references NguoiDung(TenDangNhap),
	constraint fk_trandau_cauthu2 foreign key(CauThu2) references NguoiDung(TenDangNhap),
	constraint fk_trandau_ketqua foreign key(KetQua) references NguoiDung(TenDangNhap)
)

create table PhieuDangKy(
	HoTen nvarchar(50) not null,
	NgaySinh datetime not null,
	DiaChi nvarchar(50) not null,
	Email varchar(50) primary key,
	SoDienThoai varchar(20) not null,
	GioiTinh bit, --1: nam 0: nu
	CMND varchar(20)
)

create table XepHang(
	CauThu nvarchar(50),
	MuaGiai int,
	DiemTichLuy int default 0,
	primary key(CauThu, MuaGiai),
	constraint fk_xephang_cauthu foreign key(CauThu) references NguoiDung(TenDangNhap),
	constraint fk_xephang_muagiai foreign key(MuaGiai) references GiaiDau(MaMuaGiai)
)

--insert dữ liệu
insert into LoaiNguoiDung
values(1, N'Admin'),
(2, N'Cầu thủ')

insert into NguoiDung
values('admin01', 'admin', N'Nguyễn Văn Trị', 1, '7-4-2000', N'Quảng Trị', 'tria315182000@gmail.com', '0827819373', 1, '197440964'),
('admin02', 'admin', N'Quách Hải Thanh', 1, '7-4-2000', N'Quảng Trị', 'tria315182000@gmail.com', '0827819373', 1, '197440964'),
('player01', 'player01', N'Nguyễn Thùy Chi', 2, '7-4-2000', N'Hồ Chí Minh', 'player01@gmail.com', '1597865413', 0, '197440964'),
('player02', 'player02', N'Nguyễn Trúc Quỳnh', 2, '7-4-2000', N'Hồ Chí Minh', 'player02@gmail.com', '9874562315', 0, '197440964'),
('player03', 'player03', N'Nguyễn Ngọc Mai', 2, '7-4-2000', N'Hồ Chí Minh', 'player03@gmail.com', '1026509752', 0, '197440964'),
('player04', 'player04', N'Nguyễn Phương Tuệ Nhi', 2, '7-4-2000', N'Hồ Chí Minh', 'player04@gmail.com', '1453023578', 0, '197440964'),
('player05', 'player05', N'Nguyễn Thúy An', 2, '7-4-2000', N'Hồ Chí Minh', 'player05@gmail.com', '7510236547', 0, '197440964'),
('player06', 'player06', N'Nguyễn Mai Anh', 2, '7-4-2000', N'Hồ Chí Minh', 'player06@gmail.com', '7856224201', 0, '197440964'),
('player07', 'player07', N'Nguyễn Tùng Chi', 2, '7-4-2000', N'Hồ Chí Minh', 'player07@gmail.com', '1023569874', 0, '197440964'),
('player08', 'player08', N'Nguyễn Diệp Chi', 2, '7-4-2000', N'Hồ Chí Minh', 'player08@gmail.com', '4523012657', 0, '197440964'),
('player09', 'player09', N'Nguyễn Ngọc Mai', 2, '7-4-2000', N'Hồ Chí Minh', 'player09@gmail.com', '4025630124', 0, '197440964'),
('player10', 'player10', N'Nguyễn Trúc Quỳnh', 2, '7-4-2000', N'Hồ Chí Minh', 'player10@gmail.com', '7852031269', 0, '197440964'),
('player11', 'player11', N'Nguyễn Linh Lan', 2, '7-4-2000', N'Hồ Chí Minh', 'player11@gmail.com', '7541067302', 0, '197440964'),
('player12', 'player12', N'Nguyễn Bảo Ngọc', 2, '7-4-2000', N'Hồ Chí Minh', 'player12@gmail.com', '4520321236', 0, '197440964'),
('player13', 'player13', N'Nguyễn Mai Thảo', 2, '7-4-2000', N'Hồ Chí Minh', 'player13@gmail.com', '4563205789', 0, '197440964'),
('player14', 'player14', N'Nguyễn Kim Ngân', 2, '7-4-2000', N'Hồ Chí Minh', 'player14@gmail.com', '7852013654', 0, '197440964'),
('player15', 'player15', N'Lê Uyển Nhi', 2, '7-4-2000', N'Hồ Chí Minh', 'player15@gmail.com', '7895620145', 0, '197440964'),
('player16', 'player16', N'Lê Uyên Thư', 2, '7-4-2000', N'Hồ Chí Minh', 'player16@gmail.com', '5557863044', 0, '197440964'),
('player17', 'player17', N'Nguyễn Gia Bảo', 2, '7-4-2000', N'Hồ Chí Minh', 'player17@gmail.com', '8522456563', 1, '197440964'),
('player18', 'player18', N'Nguyễn Bình An', 2, '7-4-2000', N'Hồ Chí Minh', 'player18@gmail.com', '7885265302', 1, '197440964'),
('player19', 'player19', N'Nguyễn Minh Khôi', 2, '7-4-2000', N'Hồ Chí Minh', 'player19@gmail.com', '4566598236', 1, '197440964'),
('player20', 'player20', N'Nguyễn Minh Khang', 2, '7-4-2000', N'Hồ Chí Minh', 'player20@gmail.com', '7894502365', 1, '197440964'),
('player21', 'player21', N'Lê Tuấn Anh', 2, '7-4-2000', N'Hồ Chí Minh', 'player21@gmail.com', '7896542302', 1, '197440964'),
('player22', 'player22', N'Lê Đức Minh', 2, '7-4-2000', N'Hồ Chí Minh', 'player22@gmail.com', '7410235620', 1, '197440964'),
('player23', 'player23', N'Phạm Gia An', 2, '7-4-2000', N'Hồ Chí Minh', 'player23@gmail.com', '7542001235', 1, '197440964'),
('player24', 'player24', N'Phạm Đức Duy', 2, '7-4-2000', N'Hồ Chí Minh', 'player24@gmail.com', '7845230125', 1, '197440964'),
('player25', 'player25', N'Phạm Hùng Cường', 2, '7-4-2000', N'Hồ Chí Minh', 'player25@gmail.com', '7895302123', 1, '197440964'),
('player26', 'player26', N'Đặng Minh Quân', 2, '7-4-2000', N'Hồ Chí Minh', 'player26@gmail.com', '6852458952', 1, '197440964'),
('player27', 'player27', N'Đặng Tuấn Kiệt', 2, '7-4-2000', N'Hồ Chí Minh', 'player27@gmail.com', '0236533695', 1, '197440964'),
('player28', 'player28', N'Đỗ Phúc Hưng', 2, '7-4-2000', N'Hồ Chí Minh', 'player28@gmail.com', '5253024789', 1, '197440964'),
('player29', 'player29', N'Đỗ Bảo Long', 2, '7-4-2000', N'Hồ Chí Minh', 'player29@gmail.com', '7850320124', 1, '197440964'),
('player30', 'player30', N'Đỗ Thành Đạt', 2, '7-4-2000', N'Hồ Chí Minh', 'player30@gmail.com', '963202214', 1, '197440964'),
('player31', 'player31', N'Đỗ Minh Triết', 2, '7-4-2000', N'Hồ Chí Minh', 'player31@gmail.com', '7412002584', 1, '197440964'),
('player32', 'player32', N'Đỗ Quốc Bảo', 2, '7-4-2000', N'Hồ Chí Minh', 'player32@gmail.com', '0287455660', 1, '197440964')


insert into VongDau
values(1, N'Vòng 16'),
(2, N'Vòng 8'),
(3, N'Tứ kết'),
(4, N'Bán kết'),
(5, N'Chung kết')

insert into GiaiDau
values(2020, N'Hồ Chí Minh')

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
(2020, 1, 'player21', 'player22', 'player22'),
(2020, 1, 'player23', 'player24', 'player24'),
(2020, 1, 'player25', 'player26', 'player26'),
(2020, 1, 'player27', 'player28', 'player27'),
(2020, 1, 'player29', 'player30', 'player29'),
(2020, 1, 'player31', 'player32', 'player31')

insert into TranDau
values(2020, 2, 'player01', 'player04', 'player01'),
(2020, 2, 'player05', 'player07', 'player05'),
(2020, 2, 'player10', 'player11', 'player11'),
(2020, 2, 'player14', 'player15', 'player14'),
(2020, 2, 'player17', 'player19', 'player19'),
(2020, 2, 'player22', 'player24', 'player22'),
(2020, 2, 'player26', 'player27', 'player27'),
(2020, 2, 'player29', 'player31', 'player31')

insert into TranDau
values(2020, 3, 'player01', 'player05', 'player05'),
(2020, 3, 'player11', 'player14', 'player11'),
(2020, 3, 'player19', 'player22', 'player19'),
(2020, 3, 'player27', 'player31', 'player31')

insert into TranDau
values(2020, 4, 'player05', 'player11', 'player05'),
(2020, 4, 'player19', 'player31', 'player31')

insert into TranDau
values(2020, 5, 'player05', 'player31', 'player05')

select * from LoaiNguoiDung
select * from NguoiDung
select * from VongDau
select * from GiaiDau
select * from TranDau
select * from XepHang
--store procedure để xếp hạng cho mùa sau
alter proc sp_xep_hang(@mua_giai int)
as
begin
	if not exists (select KetQua from TranDau td where td.MuaGiai = @mua_giai
					and td.VongDau = 5)--chưa thi đấu vòng chung kết
	begin
		raiserror(N'Mùa giải chưa kết thúc', 16, 1)
		rollback
	end

	insert into XepHang
	select CauThu1, MuaGiai, 0 from TranDau where VongDau = 1 and MuaGiai = @mua_giai
	insert into XepHang
	select CauThu2, MuaGiai, 0 from TranDau where VongDau = 1 and MuaGiai = @mua_giai

	declare @vong_dau int, @cau_thu_chien_thang nvarchar(50)
	declare xep_hang_cursor cursor
	for select VongDau, KetQua from TranDau where MuaGiai = @mua_giai

	open xep_hang_cursor

	fetch next from xep_hang_cursor into @vong_dau, @cau_thu_chien_thang

	while @@FETCH_STATUS = 0
	begin
		declare @diem int
		set @diem = case
			when @vong_dau = 1 then 1
			when @vong_dau = 2 then 10
			when @vong_dau = 3 then 100
			when @vong_dau = 4 then 1000
			when @vong_dau = 5 then 10000
		end

		update XepHang set DiemTichLuy = DiemTichLuy + @diem
		where MuaGiai = @mua_giai and CauThu = @cau_thu_chien_thang
		fetch next from xep_hang_cursor into @vong_dau, @cau_thu_chien_thang
	end

	close xep_hang_cursor
	DEALLOCATE cursor_product
end

exec sp_xep_hang 2020

select * from XepHang
delete XepHang