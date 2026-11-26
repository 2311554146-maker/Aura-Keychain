# Aura Keychain

Trang giới thiệu móc khóa vải nỉ, chia theo nhóm sản phẩm. Chỉ dùng HTML, CSS và JavaScript thuần, không cần bước build.

**Xem trang:** https://aura-keychain.vercel.app (đẩy mã lên nhánh `main` là Vercel tự cập nhật).

## Các nhóm sản phẩm

Cà Chua mèo · Pudding mèo · Ngôi sao mèo · Peanuts · Cỏ may mắn & Ếch ộp

## Cấu trúc

| File | Vai trò |
|---|---|
| `index.html`, `style.css` | Giao diện |
| `products.js` | **Danh sách sản phẩm**: tên, giá, ảnh. Sửa tệp này khi đổi giá hay thêm mẫu |
| `script.js` | Dựng danh sách theo nhóm và hộp xem ảnh lớn |
| `anh/` | Ảnh sản phẩm (mỗi ảnh hai cỡ: `-480.webp` và `-960.webp`), logo và biểu tượng tab |

## Chạy thử trên máy

```powershell
npx serve .
```
