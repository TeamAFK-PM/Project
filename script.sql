create database QuanLyCauThu
go

use QuanLyCauThu
go

create table LoaiNguoiDung(
	MaLoaiNguoiDung int primary key,
	TenLoaiNguoiDung nvarchar(50) not null
)

create table NguoiDung(
	TenDangNhap nvarchar(50) primary key,
	MatKhau nvarchar(50) not null,
	HoTen nvarchar(50) not null,
	VaiTro int not null,
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
	constraint fk_trandau_cauthu2 foreign key(CauThu2) references NguoiDung(TenDangNhap)
)

create table PhieuDangKy(
	TenDangNhap nvarchar(50) primary key,
	MatKhau nvarchar(50) not null,
	HoTen nvarchar(50) not null,
)

--Ràng buộc
--1 Không được tạo tên đăng nhập trùng với Người dùng hiện tại
create trigger exist_username
on PhieuDangKy
for insert
as
begin
	if exists (select * from inserted i join NguoiDung nd
				on i.TenDangNhap = nd.TenDangNhap)
	begin
		raiserror(N'Đã tồn tại tên đăng nhập này', 16, 1)
		rollback
	end
end