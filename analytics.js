/* Google Analytics 4 (dự án Firebase aura-keychain). Theo quyết định của chủ trang ngày 27/11/2026:
   nạp ngay khi khách vào trang, không hỏi đồng ý. Trang Chính sách phải luôn nói rõ điều này.
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
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
  document.head.append(s);
})();
