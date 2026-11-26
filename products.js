/* Danh sách sản phẩm của Aura Keychain. Muốn đổi giá, thêm món hay thêm ảnh: sửa tệp này.
   - gia: giá bán (đồng), ví dụ 28000 hiển thị thành 28.000đ.
   - soLuong: chỉ dùng cho combo (ví dụ 4 nghĩa là "100.000đ / 4 cái").
   - anh: tên ảnh trong thư mục anh/ (mỗi ảnh có hai cỡ: -480.webp và -960.webp).
     cao: chiều cao của ảnh cỡ 960, để trang không bị nhảy khi ảnh tải. */
const GROUPS = [
  {
    id: "ca-chua-meo", ten: "Cà Chua mèo",
    sanPham: [
      { ten: "Combo Cà Chua mèo", gia: 100000, soLuong: 4, anh: [{ f: "ca-chua-combo-1", cao: 1200 }] },
      { ten: "Cà chua mèo tam thể", gia: 28000, anh: [{ f: "ca-chua-tam-the-1", cao: 1200 }] },
      { ten: "Cà chua mèo vàng", gia: 28000, anh: [{ f: "ca-chua-vang-1", cao: 1200 }] },
      { ten: "Cà chua mèo đen", gia: 28000, anh: [{ f: "ca-chua-den-1", cao: 1196 }] },
      { ten: "Cà chua mèo cam", gia: 28000, anh: [{ f: "ca-chua-cam-1", cao: 1196 }] }
    ]
  },
  {
    id: "pudding-meo", ten: "Pudding mèo",
    sanPham: [
      { ten: "Combo Pudding mèo", gia: 50000, soLuong: 2, anh: [{ f: "pudding-combo-1", cao: 1056 }] },
      { ten: "Pudding mèo tam thể", gia: 28000, anh: [{ f: "pudding-tam-the-1", cao: 1035 }] },
      { ten: "Pudding mèo vàng", gia: 28000, anh: [{ f: "pudding-vang-1", cao: 1280 }] }
    ]
  },
  {
    id: "ngoi-sao-meo", ten: "Ngôi sao mèo",
    sanPham: [
      { ten: "Ngôi sao mèo Hello Kitty", gia: 35000, anh: [{ f: "sao-hello-kitty-2", cao: 1280 }, { f: "sao-hello-kitty-1", cao: 983 }] },
      { ten: "Ngôi sao mèo cam trắng", gia: 35000, anh: [{ f: "sao-cam-trang-1", cao: 1173 }] },
      { ten: "Ngôi sao mèo đen", gia: 32000, anh: [{ f: "sao-den-1", cao: 1319 }] }
    ]
  },
  {
    id: "peanuts", ten: "Peanuts",
    sanPham: [
      { ten: "Combo Peanuts", gia: 40000, anh: [{ f: "peanuts-combo-1", cao: 1199 }] },
      { ten: "Snoopy", gia: 25000, anh: [{ f: "snoopy-1", cao: 1199 }] },
      { ten: "Woodstock", gia: 20000, anh: [{ f: "woodstock-1", cao: 1199 }] }
    ]
  },
  {
    id: "may-man-ech", ten: "Cỏ may mắn & Ếch ộp",
    sanPham: [
      { ten: "Cỏ xoáy may mắn", gia: 42000, anh: [{ f: "co-xoay-1", cao: 1280 }, { f: "co-xoay-2", cao: 1280 }, { f: "co-xoay-3", cao: 1280 }] },
      { ten: "Mèo cỏ bốn lá", gia: 30000, anh: [{ f: "co-bon-la-1", cao: 1280 }, { f: "co-bon-la-2", cao: 960 }] },
      { ten: "Ếch ộp", gia: 30000, anh: [{ f: "ech-op-1", cao: 1173 }] }
    ]
  }
];
