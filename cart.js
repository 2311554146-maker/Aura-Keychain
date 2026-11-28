/* Giỏ hàng và đặt hàng COD cho website thực hành.
   - Giỏ lưu trong localStorage (chỉ mã món và số lượng) nên tải lại trang không mất.
   - Đơn hàng KHÔNG được gửi đi đâu; họ tên, số điện thoại, địa chỉ không được lưu lại.
   - Đổi phí giao hoặc mức miễn phí ở đây thì sửa cả chinh-sach.html và Hero Banner trong index.html. */
(function () {
  "use strict";
  const SHIP_FEE = 25000;
  const FREE_SHIP_FROM = 199000;
  const KEY = "aura-gio";
  const PRODUCTS = new Map(GROUPS.flatMap((g) => g.sanPham).map((p) => [p.ma, p]));

  const money = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
  /* 28000 -> "28.000đ"; combo: "100.000đ / 4 cái" */
  const price = (p) => money(p.gia) + (p.soLuong ? " / " + p.soLuong + " cái" : "");

  /* ---------- Dữ liệu giỏ ---------- */
  function load() {
    const result = new Map();
    try {
      for (const [ma, n] of Object.entries(JSON.parse(localStorage.getItem(KEY)) || {})) {
        const p = PRODUCTS.get(ma);
        // Chỉ nhận món còn bán và số lượng hợp lệ, không quá tồn kho
        if (p && Number.isInteger(n) && n > 0 && p.ton > 0) result.set(ma, Math.min(n, p.ton));
      }
    } catch (e) { /* dữ liệu hỏng hoặc trình duyệt chặn lưu: dùng giỏ trống */ }
    return result;
  }
  let cart = load();
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(Object.fromEntries(cart))); } catch (e) { /* bỏ qua */ }
  }
  function totals() {
    let sub = 0;
    cart.forEach((n, ma) => { sub += PRODUCTS.get(ma).gia * n; });
    const ship = !sub || sub >= FREE_SHIP_FROM ? 0 : SHIP_FEE;
    return { sub, ship, total: sub + ship };
  }

  /* ---------- Khung hộp giỏ hàng (chữ cố định, không chứa dữ liệu người dùng) ---------- */
  const field = (id, label, control) =>
    `<div class="field"><label for="${id}">${label}</label>${control}<p class="error" id="${id}Err" hidden></p></div>`;

  document.body.insertAdjacentHTML("beforeend", `
    <dialog id="cart" closedby="any" aria-labelledby="cartTitle">
      <div class="cart-head">
        <h2 id="cartTitle">Giỏ hàng</h2>
        <button type="button" class="cart-close" aria-label="Đóng giỏ hàng">×</button>
      </div>
      <div class="cart-body">
        <div id="cartEmpty">
          <p>Giỏ hàng đang trống.</p>
          <a class="cta" href="./#noi-dung" data-close>Xem sản phẩm</a>
        </div>
        <div id="cartFull">
          <ul id="cartItems" class="cart-items"></ul>
          <dl class="sum">
            <div><dt>Tạm tính</dt><dd id="sumSub"></dd></div>
            <div><dt>Phí giao hàng</dt><dd id="sumShip"></dd></div>
            <div class="sum-total"><dt>Tổng cộng</dt><dd id="sumTotal"></dd></div>
          </dl>
          <p id="shipHint" class="hint"></p>
          <form id="order" novalidate>
            <h3>Thông tin đặt hàng</h3>
            ${field("fName", "Họ tên", '<input id="fName" autocomplete="name" maxlength="80" required>')}
            ${field("fPhone", "Số điện thoại", '<input id="fPhone" type="tel" autocomplete="tel" maxlength="20" required>')}
            ${field("fAddress", "Địa chỉ giao hàng", '<textarea id="fAddress" autocomplete="street-address" rows="2" maxlength="200" required></textarea>')}
            ${field("fNote", "Ghi chú (không bắt buộc)", '<textarea id="fNote" autocomplete="off" rows="2" maxlength="300"></textarea>')}
            <fieldset>
              <legend>Phương thức thanh toán</legend>
              <label class="pay"><input type="radio" name="pay" checked> Thanh toán khi nhận hàng (COD)</label>
            </fieldset>
            <p class="hint">Không có thanh toán online, không thu thông tin thẻ. Thông tin bạn nhập không được gửi đi đâu và không được lưu lại.</p>
            <button type="submit" class="cta">Đặt hàng</button>
          </form>
        </div>
        <div id="cartDone" hidden>
          <h3 id="doneTitle" tabindex="-1">Cảm ơn bạn đã đặt hàng!</h3>
          <p>Mã đơn: <strong id="doneCode"></strong></p>
          <p>Tổng tiền: <strong id="doneTotal"></strong> (trả khi nhận hàng)</p>
          <p class="check-note">Hãy kiểm tra hàng trước khi thanh toán tiền cho shipper.</p>
          <p class="hint">Đây là website thực hành nên đơn hàng không được gửi đi.</p>
          <button type="button" class="cta" data-close>Đóng</button>
        </div>
      </div>
      <p class="cart-practice">Website thực hành – không bán hàng thật</p>
      <p class="visually-hidden" role="status" data-live></p>
    </dialog>
    <p id="cartStatus" class="visually-hidden" role="status"></p>`);

  const $ = (s) => document.querySelector(s);
  const dialog = $("#cart"), form = $("#order");

  function el(tag, props, ...children) {
    const node = Object.assign(document.createElement(tag), props);
    node.append(...children);
    return node;
  }

  /* ---------- Hiển thị ---------- */
  function control(ma, act, text, label, disabled) {
    const b = el("button", { type: "button", textContent: text, disabled });
    b.dataset.ma = ma;
    b.dataset.act = act;
    b.setAttribute("aria-label", label);
    return b;
  }

  function row([ma, n]) {
    const p = PRODUCTS.get(ma);
    const img = el("img", { src: "anh/" + p.anh[0].f + "-480.webp", alt: "", width: 64, height: 80, loading: "lazy" });
    const qty = el("div", { className: "qty" },
      control(ma, "less", "−", "Giảm số lượng " + p.ten, n <= 1),
      el("output", { textContent: n }),
      control(ma, "more", "+", "Tăng số lượng " + p.ten, n >= p.ton));
    const remove = control(ma, "remove", "Xóa", "Xóa " + p.ten + " khỏi giỏ", false);
    remove.className = "remove";
    return el("li", {}, img,
      el("div", { className: "info" },
        el("h3", { textContent: p.ten }),
        el("p", { textContent: price(p) }),
        el("p", { className: "stock", textContent: "Còn " + p.ton + " trong kho" }),
        el("div", { className: "row-actions" }, qty, remove)),
      el("b", { className: "line", textContent: money(p.gia * n) }));
  }

  function render() {
    const count = [...cart.values()].reduce((a, b) => a + b, 0);
    const counter = $("#cartCount");
    if (counter) counter.textContent = count;

    // Giữ vị trí con trỏ bàn phím sau khi vẽ lại danh sách
    const active = dialog.contains(document.activeElement) ? { ...document.activeElement.dataset } : null;
    $("#cartItems").replaceChildren(...[...cart].map(row));
    const done = !$("#cartDone").hidden;
    $("#cartEmpty").hidden = done || cart.size > 0;
    $("#cartFull").hidden = done || cart.size === 0;

    const t = totals();
    $("#sumSub").textContent = money(t.sub);
    $("#sumShip").textContent = t.ship ? money(t.ship) : "Miễn phí";
    $("#sumTotal").textContent = money(t.total);
    $("#shipHint").textContent = t.ship
      ? "Mua thêm " + money(FREE_SHIP_FROM - t.sub) + " để được miễn phí giao hàng."
      : "Đơn từ " + money(FREE_SHIP_FROM) + " được miễn phí giao hàng.";

    if (active && active.ma) {
      const same = dialog.querySelector(`button[data-ma="${active.ma}"][data-act="${active.act}"]:not(:disabled)`)
        || dialog.querySelector(`button[data-ma="${active.ma}"]:not(:disabled)`)
        || $(".cart-close");
      same.focus();
    }
    document.dispatchEvent(new CustomEvent("cart:change"));
  }

  /* Đọc thông báo cho trình đọc màn hình: dùng vùng trong hộp đang mở, nếu không có thì vùng chung của trang */
  let announceTimer;
  function announce(text, delay = 100) {
    const region = document.querySelector("dialog:modal [data-live]") || $("#cartStatus");
    clearTimeout(announceTimer);
    region.textContent = "";                       // xóa trước để câu lặp lại vẫn được đọc
    announceTimer = setTimeout(() => { region.textContent = text; }, delay);
  }

  function setQty(ma, n) {
    const p = PRODUCTS.get(ma);
    if (n > 0) cart.set(ma, Math.min(n, p.ton));
    else cart.delete(ma);
    save();
    render();
  }

  /* Thêm một món; trả về false nếu đã đủ số trong kho */
  function add(ma) {
    const p = PRODUCTS.get(ma), n = cart.get(ma) || 0;
    if (!p || n >= p.ton) { announce("Bạn đã chọn đủ số lượng còn trong kho."); return false; }
    setQty(ma, n + 1);
    announce("Đã thêm " + p.ten + " vào giỏ.");
    return true;
  }

  /* ---------- Kiểm tra form (chỉ báo lỗi sau khi khách đã nhập hoặc bấm đặt hàng) ---------- */
  const rules = {
    fName: (v) => v.length >= 2 ? "" : "Vui lòng nhập họ tên (ít nhất 2 ký tự).",
    fPhone: (v) => /^(0|\+84)\d{9}$/.test(v.replace(/[\s.-]/g, "")) ? "" : "Số điện thoại gồm 10 số bắt đầu bằng 0, ví dụ 0912 345 678.",
    fAddress: (v) => v.length >= 10 ? "" : "Vui lòng nhập địa chỉ giao hàng đầy đủ (ít nhất 10 ký tự)."
  };

  function check(input) {
    const message = rules[input.id](input.value.trim()), error = $("#" + input.id + "Err");
    error.textContent = message;
    error.hidden = !message;
    input.setAttribute("aria-invalid", message ? "true" : "false");
    if (message) input.setAttribute("aria-describedby", error.id);
    else input.removeAttribute("aria-describedby");
    return !message;
  }

  function clearForm() {
    form.reset();
    Object.keys(rules).forEach((id) => {
      $("#" + id).removeAttribute("aria-invalid");
      $("#" + id).removeAttribute("aria-describedby");
      $("#" + id + "Err").hidden = true;
    });
  }

  const touched = new WeakSet(), announced = new WeakSet();
  Object.keys(rules).forEach((id) => {
    const input = $("#" + id);
    input.addEventListener("input", () => {
      touched.add(input);
      // sửa đúng là hết báo lỗi ngay
      if (input.getAttribute("aria-invalid") === "true" && check(input)) {
        announced.delete(input);
        announce("");
      }
    });
    input.addEventListener("blur", () => {
      if (!touched.has(input)) return;
      if (check(input)) { announced.delete(input); return; }
      if (announced.has(input)) return;
      announced.add(input);
      // Chờ trình đọc đọc xong ô kế tiếp rồi mới đọc lỗi
      announce(input.labels[0].textContent + ": " + $("#" + id + "Err").textContent, 500);
    });
  });

  function orderCode() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    return "AURA-" + Array.from(crypto.getRandomValues(new Uint8Array(6)), (x) => chars[x % chars.length]).join("");
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!cart.size) return;
    const wrong = Object.keys(rules).map((id) => $("#" + id)).filter((input) => !check(input));
    if (wrong.length) {
      wrong.forEach((input) => announced.add(input));
      wrong[0].focus();                  // trình đọc đọc luôn ô lỗi đầu tiên cùng câu lỗi
      clearTimeout(announceTimer);       // tránh đọc chồng thông báo khi rời ô
      return;
    }
    $("#doneCode").textContent = orderCode();
    $("#doneTotal").textContent = money(totals().total);
    clearForm();                       // không giữ lại thông tin khách
    $("#cartDone").hidden = false;
    cart.clear();
    save();
    render();
    $("#doneTitle").focus();
  });

  /* ---------- Mở, đóng, bấm nút ---------- */
  function open() {
    $("#cartDone").hidden = true;
    render();
    dialog.showModal();
  }

  $("#cartOpen")?.addEventListener("click", open);
  $(".cart-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) { dialog.close(); return; }
    const b = e.target.closest("button[data-act]");
    if (!b) return;
    const ma = b.dataset.ma, n = cart.get(ma) || 0;
    setQty(ma, b.dataset.act === "more" ? n + 1 : b.dataset.act === "less" ? Math.max(1, n - 1) : 0);
    const now = cart.get(ma) || 0;
    announce(PRODUCTS.get(ma).ten + (now ? ": " + now + "." : ": đã xóa khỏi giỏ.") + " Tổng cộng " + money(totals().total) + ".");
  });

  // Trình duyệt chưa hỗ trợ closedby (như Safari): bấm vùng tối bên ngoài để đóng.
  if (!("closedBy" in HTMLDialogElement.prototype)) {
    dialog.addEventListener("click", (e) => {
      if (e.target !== dialog) return;
      const r = dialog.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();
    });
  }

  // Đổi giỏ ở thẻ trình duyệt khác thì thẻ này cập nhật theo
  addEventListener("storage", (e) => { if (e.key === KEY) { cart = load(); render(); } });

  window.Cart = { add, price, quantity: (ma) => cart.get(ma) || 0 };
  render();
})();
