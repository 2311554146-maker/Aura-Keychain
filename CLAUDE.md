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

## Giỏ hàng (website thực hành)
- Dòng "Website thực hành – không bán hàng thật" phải luôn hiển thị (dải trên cùng của mọi trang).
- Phí giao `SHIP_FEE = 25000`, miễn phí từ `FREE_SHIP_FROM = 199000` trong `cart.js`; đổi thì sửa cả `chinh-sach.html` và Hero Banner.
- Đơn không gửi đi đâu; không lưu và không gửi họ tên, số điện thoại, địa chỉ. Chỉ COD, không thu thông tin thẻ.
- Tồn kho `ton` trong `products.js` đang là số tạm (món lẻ 10, combo 5). Đầu trang và chân trang lặp ở cả 4 tệp HTML.
- Yêu cầu nguồn: tài liệu Drive "Chỉnh sửa" (28/11/2026).

## Đo lường và tìm kiếm
- Firebase: dự án `aura-keychain` (gói Spark, không bật dịch vụ trả phí). Chỉ dùng Google Analytics, không dùng Firebase SDK.
- Mã đo `G-ZBXBHNKF3T` trong `analytics.js`. Ngày 27/11/2026 người dùng yêu cầu **tự chạy, không hỏi đồng ý** (mã Google được tải 1,5 giây sau khi trang tải xong để không làm chậm trang); mục "Cookie và quyền riêng tư" trong `chinh-sach.html` phải mô tả đúng cách hoạt động này.
- Trang mới phải có `<link rel="canonical">`, thêm vào `sitemap.xml`, và nạp `analytics.js`.

## An toàn
- Không bao giờ commit `.env*`, `.vercel/`, token hay khóa riêng. Quét bí mật trước mỗi commit.
- `tai-lieu/` chứa tài liệu gốc của người dùng: **không đưa lên GitHub hay Vercel**.
- Sau khi push, kiểm tra bản thật; `README.md`, `CLAUDE.md`, `vercel.json`, `tai-lieu/` phải trả về 404.

## Nguồn nội dung
Google Drive, thư mục "Góp ý e marketing": tài liệu "sản phẩm" (tên, giá, ảnh) và
"Chính sách và thông tin liên hệ", "Giới thiệu thương hiệu".
