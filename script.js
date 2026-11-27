/* Dựng danh sách sản phẩm theo nhóm từ products.js và hộp xem ảnh lớn. Chỉ dùng textContent, không dùng innerHTML. */
(function () {
  "use strict";

  const $ = (s) => document.querySelector(s);

  function el(tag, props, ...children) {
    const node = Object.assign(document.createElement(tag), props);
    node.append(...children);
    return node;
  }

  /* 28000 -> "28.000đ"; combo: "100.000đ / 4 cái" */
  function price(p) {
    const money = String(p.gia).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
    return p.soLuong ? money + " / " + p.soLuong + " cái" : money;
  }

  const src = (f, w) => "anh/" + f + "-" + w + ".webp";

  /* ---------- Danh sách theo nhóm ---------- */
  let shown = 0;   // đếm ảnh để ưu tiên tải những ảnh đầu tiên

  function card(p) {
    const first = p.anh[0];
    const index = shown++;
    const img = el("img", {
      alt: p.ten, width: 480, height: 600, decoding: "async",
      sizes: "(max-width: 560px) 46vw, (max-width: 960px) 31vw, 260px"
    });
    // Đặt loading TRƯỚC src để trình duyệt áp dụng đúng. Ưu tiên tải cao dành cho hình trong Hero Banner (index.html).
    if (index >= 4) img.loading = "lazy";
    img.srcset = src(first.f, 480) + " 480w, " + src(first.f, 960) + " 960w";
    img.src = src(first.f, 480);

    const photo = el("button", { type: "button", className: "photo" }, img);
    photo.setAttribute("aria-label", "Xem ảnh lớn: " + p.ten);
    if (p.anh.length > 1) photo.append(el("span", { className: "count", textContent: p.anh.length + " ảnh" }));
    if (p.ten.startsWith("Combo")) photo.append(el("span", { className: "combo", textContent: "Combo" }));
    photo.addEventListener("click", () => openViewer(p));

    return el("li", { className: "card" },
      photo,
      el("h3", { textContent: p.ten }),
      el("p", { className: "price", textContent: price(p) }));
  }

  GROUPS.forEach((g) => {
    $("#menu").append(el("li", {}, el("a", { href: "#" + g.id, textContent: g.ten })));

    const title = el("h2", { id: g.id + "-ten", textContent: g.ten });
    const total = el("span", { className: "total", textContent: g.sanPham.length + " mẫu" });
    const section = el("section", { id: g.id },
      el("div", { className: "group-head" }, title, total),
      el("ul", { className: "grid" }, ...g.sanPham.map(card)));
    section.setAttribute("aria-labelledby", g.id + "-ten");
    $("#catalog").append(section);
  });

  /* ---------- Hộp xem ảnh lớn ---------- */
  const viewer = $("#viewer");
  let current = null, pos = 0;

  function show() {
    const photo = current.anh[pos], many = current.anh.length > 1;
    const img = $("#vImg");
    img.width = 960;
    img.height = photo.cao;
    img.alt = current.ten + (many ? " – ảnh " + (pos + 1) + " / " + current.anh.length : "");
    img.src = src(photo.f, 960);
    $("#vTitle").textContent = current.ten;
    $("#vPrice").textContent = price(current);
    $("#vCount").textContent = many ? "· ảnh " + (pos + 1) + "/" + current.anh.length : "";
    $("#vPrev").hidden = $("#vNext").hidden = !many;
  }

  function openViewer(p) {
    current = p;
    pos = 0;
    show();
    viewer.showModal();
  }

  function step(d) {
    if (!current || current.anh.length < 2) return;
    pos = (pos + d + current.anh.length) % current.anh.length;
    show();
  }

  $("#vClose").addEventListener("click", () => viewer.close());
  $("#vPrev").addEventListener("click", () => step(-1));
  $("#vNext").addEventListener("click", () => step(1));
  viewer.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });

  // Trình duyệt chưa hỗ trợ closedby (như Safari): bấm vùng tối bên ngoài để đóng.
  if (!("closedBy" in HTMLDialogElement.prototype)) {
    viewer.addEventListener("click", (e) => {
      if (e.target !== viewer) return;
      const r = viewer.getBoundingClientRect();
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      if (!inside) viewer.close();
    });
  }
})();
