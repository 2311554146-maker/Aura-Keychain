# Aura KeyChain

Trang giới thiệu móc khóa vải nỉ, chia theo nhóm sản phẩm. Chỉ dùng HTML, CSS và JavaScript thuần, không cần bước build.

**Xem trang:** https://aura-keychain.vercel.app (đẩy mã lên nhánh `main` là Vercel tự cập nhật).

## Các nhóm sản phẩm

Cà Chua mèo · Pudding mèo · Ngôi sao mèo · Peanuts · Cỏ may mắn & Ếch ộp

## Cấu trúc

| File | Vai trò |
|---|---|
| `index.html`, `style.css` | Trang sản phẩm và giao diện chung |
| `gioi-thieu.html` | Giới thiệu thương hiệu (theo tài liệu "Giới thiệu thương hiệu" trên Drive). Đầu trang và chân trang lặp lại ở cả bốn tệp HTML: đổi thì sửa đủ |
| `chinh-sach.html` | Chính sách giao hàng và đổi trả (theo tài liệu "Chính sách và thông tin liên hệ" trên Drive) |
| `lien-he.html` | Thông tin liên hệ. Số điện thoại và email còn nằm ở chân trang của cả ba tệp HTML và trong `chinh-sach.html` (đường dẫn Zalo): đổi thì sửa đủ. Đường dẫn Facebook cũng nằm ở chân trang, `lien-he.html` và `chinh-sach.html` |
| `products.js` | **Danh sách sản phẩm**: tên, giá, ảnh. Sửa tệp này khi đổi giá hay thêm mẫu |
| `script.js` | Dựng danh sách theo nhóm và hộp xem ảnh lớn |
| `analytics.js` | Google Analytics (dự án Firebase `aura-keychain`), tự nạp khi khách vào trang |
| `sitemap.xml`, `robots.txt` | Cho Google Search Console. Thêm trang mới thì thêm vào `sitemap.xml` |
| `google*.html` | Tệp xác minh Google Search Console: không xóa, không sửa |
| `anh/` | Ảnh sản phẩm (mỗi ảnh hai cỡ: `-480.webp` và `-960.webp`), hình Hero Banner (`hero-khau.svg`), logo và biểu tượng tab |

## Chạy thử trên máy

```powershell
npx serve .
```
