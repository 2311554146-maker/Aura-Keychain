/* Danh sách sản phẩm của Aura KeyChain. Muốn đổi giá, thêm món hay thêm ảnh: sửa tệp này.
   - ma: mã riêng của món (giỏ hàng dùng mã này, đừng đổi sau khi đã đăng).
   - ton: số còn trong kho. HIỆN LÀ SỐ TẠM cho website thực hành (món lẻ 10, combo 5): sửa theo số thật.
   - gia: giá bán (đồng), ví dụ 28000 hiển thị thành 28.000đ.
   - soLuong: chỉ dùng cho combo (ví dụ 4 nghĩa là "100.000đ / 4 cái").
   - anh: tên ảnh trong thư mục anh/ (mỗi ảnh có hai cỡ: -480.webp và -960.webp).
     cao: chiều cao của ảnh cỡ 960, để trang không bị nhảy khi ảnh tải. */
const GROUPS = [
  {
    id: "ca-chua-meo", ten: "Cà Chua mèo",
    sanPham: [
      { ma: "ca-chua-combo", ten: "Combo Cà Chua mèo", ton: 5, gia: 100000, soLuong: 4, anh: [{ f: "ca-chua-combo-1", cao: 1200 }] },
      { ma: "ca-chua-tam-the", ten: "Cà chua mèo tam thể", ton: 10, gia: 28000, anh: [{ f: "ca-chua-tam-the-1", cao: 1200 }] },
      { ma: "ca-chua-vang", ten: "Cà chua mèo vàng", ton: 10, gia: 28000, anh: [{ f: "ca-chua-vang-1", cao: 1200 }] },
      { ma: "ca-chua-den", ten: "Cà chua mèo đen", ton: 10, gia: 28000, anh: [{ f: "ca-chua-den-1", cao: 1196 }] },
      { ma: "ca-chua-cam", ten: "Cà chua mèo cam", ton: 10, gia: 28000, anh: [{ f: "ca-chua-cam-1", cao: 1196 }] }
    ]
  },
  {
    id: "pudding-meo", ten: "Pudding mèo",
    sanPham: [
      { ma: "pudding-combo", ten: "Combo Pudding mèo", ton: 5, gia: 50000, soLuong: 2, anh: [{ f: "pudding-combo-1", cao: 1056 }] },
      { ma: "pudding-tam-the", ten: "Pudding mèo tam thể", ton: 10, gia: 28000, anh: [{ f: "pudding-tam-the-1", cao: 1035 }] },
      { ma: "pudding-vang", ten: "Pudding mèo vàng", ton: 10, gia: 28000, anh: [{ f: "pudding-vang-1", cao: 1280 }] }
    ]
  },
  {
    id: "ngoi-sao-meo", ten: "Ngôi sao mèo",
    sanPham: [
      { ma: "sao-hello-kitty", ten: "Ngôi sao mèo Hello Kitty", ton: 10, gia: 35000, anh: [{ f: "sao-hello-kitty-2", cao: 1280 }, { f: "sao-hello-kitty-1", cao: 983 }] },
      { ma: "sao-cam-trang", ten: "Ngôi sao mèo cam trắng", ton: 10, gia: 35000, anh: [{ f: "sao-cam-trang-1", cao: 1173 }] },
      { ma: "sao-den", ten: "Ngôi sao mèo đen", ton: 10, gia: 32000, anh: [{ f: "sao-den-1", cao: 1319 }] }
    ]
  },
  {
    id: "peanuts", ten: "Peanuts",
    sanPham: [
      { ma: "peanuts-combo", ten: "Combo Peanuts", ton: 5, gia: 40000, anh: [{ f: "peanuts-combo-1", cao: 1199 }] },
      { ma: "snoopy", ten: "Snoopy", ton: 10, gia: 25000, anh: [{ f: "snoopy-1", cao: 1199 }] },
      { ma: "woodstock", ten: "Woodstock", ton: 10, gia: 20000, anh: [{ f: "woodstock-1", cao: 1199 }] }
    ]
  },
  {
    id: "may-man-ech", ten: "Cỏ may mắn & Ếch ộp",
    sanPham: [
      { ma: "co-xoay", ten: "Cỏ xoáy may mắn", ton: 10, gia: 42000, anh: [{ f: "co-xoay-1", cao: 1280 }, { f: "co-xoay-2", cao: 1280 }, { f: "co-xoay-3", cao: 1280 }] },
      { ma: "co-bon-la", ten: "Mèo cỏ bốn lá", ton: 10, gia: 30000, anh: [{ f: "co-bon-la-1", cao: 1280 }, { f: "co-bon-la-2", cao: 960 }] },
      { ma: "ech-op", ten: "Ếch ộp", ton: 10, gia: 30000, anh: [{ f: "ech-op-1", cao: 1173 }] }
    ]
  }
];
