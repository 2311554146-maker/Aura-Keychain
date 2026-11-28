/* Google Analytics 4 (dự án Firebase aura-keychain). Theo quyết định của chủ trang ngày 27/11/2026:
   tự chạy khi khách vào trang, không hỏi đồng ý. Trang Chính sách phải luôn nói rõ điều này.
   Mã của Google chỉ được tải SAU KHI trang đã tải xong, để không tranh băng thông với ảnh và chữ.
   Mã đo (G-...) là thông tin công khai. Không gửi tên, số điện thoại hay email của khách cho Analytics.
   Chạy thử trên máy (localhost) thì không gửi dữ liệu. */
(function () {
  "use strict";
  if (["localhost", "127.0.0.1"].includes(location.hostname)) return;
  const GA_ID = "G-ZBXBHNKF3T";
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID);

  function loadTag() {
    const s = document.createElement("script");
    s.async = true;
    s.fetchPriority = "low";
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.append(s);
  }
  // Đợi trang tải xong thêm 1,5 giây. Khách rời trang sớm hơn thế sẽ không được ghi nhận.
  const schedule = () => setTimeout(loadTag, 1500);
  if (document.readyState === "complete") schedule();
  else addEventListener("load", schedule, { once: true });
})();
