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

## Bán hàng
- Trang **bán hàng thật**. Nền tảng bán chính là **Shopee**; cách gắn Shopee chờ người dùng bàn thêm.
- Ngày 28/11/2026 người dùng bỏ giỏ hàng và form đặt hàng (form đó không gửi đơn đi đâu): chưa nhận đơn trên web,
  không thêm lại khi chưa được yêu cầu. Mã giỏ hàng cũ nằm ở commit `913a6be`.
- Không thêm lại dòng "Website thực hành – không bán hàng thật" (yêu cầu này trong tài liệu Drive "Chỉnh sửa" là sơ suất).
- Không hiển thị tồn kho cho tới khi có số thật.
- Phí giao 25.000đ toàn quốc, miễn phí từ 199.000đ: ghi ở `chinh-sach.html` và Hero Banner.
- Đầu trang và chân trang lặp ở cả 4 tệp HTML.

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
