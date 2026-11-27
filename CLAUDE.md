# Aura KeyChain – ghi chú cho Claude

Tên hiển thị là **Aura KeyChain**; thư mục trên máy vẫn tên `AuraHandmade`.

Trang giới thiệu móc khóa vải nỉ. Mọi chữ hiển thị cho khách và mọi giải thích cho người dùng bằng **tiếng Việt**.
Cấu trúc tệp: xem `README.md`.

## Ràng buộc
- HTML, CSS, JavaScript thuần. Không framework, không bước build.
- Thêm dịch vụ bên thứ ba thì phải cập nhật `Content-Security-Policy` trong `vercel.json`.

## Nơi triển khai
- Trang: https://aura-keychain.vercel.app. Repo công khai: `2311554146-maker/Aura-Keychain`.
- **Đẩy lên nhánh `main` là Vercel tự deploy production.** Chỉ đẩy khi người dùng đồng ý.
- Trước khi push: `gh auth switch -u 2311554146-maker`, push xong chuyển lại tài khoản đang dùng trước đó.

## An toàn
- Không bao giờ commit `.env*`, `.vercel/`, token hay khóa riêng. Quét bí mật trước mỗi commit.
- `tai-lieu/` chứa tài liệu gốc của người dùng: **không đưa lên GitHub hay Vercel**.
- Sau khi push, kiểm tra bản thật; `README.md`, `CLAUDE.md`, `vercel.json`, `tai-lieu/` phải trả về 404.

## Nguồn nội dung
Google Drive, thư mục "Góp ý e marketing": tài liệu "sản phẩm" (tên, giá, ảnh) và
"Chính sách và thông tin liên hệ".
