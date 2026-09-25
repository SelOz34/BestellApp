const confirmationDelay = 7000;
let confirmationTimer;

function init() {
  loadBasket();
  renderSlider();
  renderMenu();
  renderBasket();
  renderMobileBar();
  registerEvents();
}

function renderSlider() {
  const slider = document.getElementById("categorySlider");
  slider.innerHTML = menu.map(getSliderLinkTemplate).join("");
}

function renderMenu() {
  const menuElement = document.getElementById("menu");
  menuElement.innerHTML = menu.map(getCategoryTemplate).join("");
}

function updateShop() {
  saveBasket();
  renderBasket();
  refreshAddButtons();
  renderMobileBar();
}

function refreshAddButtons() {
  document.querySelectorAll(".add-button").forEach((button) => {
    const quantity = getQuantity(button.dataset.dishId);
    const label = button.querySelector(".add-button__label");
    button.classList.toggle("is-added", quantity > 0);
    label.textContent = getAddButtonLabel(quantity);
  });
}

function renderBasket() {
  const focusTarget = getFocusTarget();
  const html = getBasketTemplate();
  document.querySelectorAll("[data-basket-host]").forEach((host) => {
    renderBasketInto(host, html);
  });
  restoreFocus(focusTarget);
}

function renderBasketInto(host, html) {
  const oldList = host.querySelector(".basket__items");
  const scrollTop = oldList ? oldList.scrollTop : 0;
  host.innerHTML = html;
  const newList = host.querySelector(".basket__items");
  if (newList) newList.scrollTop = scrollTop;
}

function getFocusTarget() {
  const active = document.activeElement;
  const host = active.closest("[data-basket-host]");
  const key = active.dataset.focusKey;
  return host && key ? { host, key } : null;
}

function restoreFocus(target) {
  if (!target) return;
  const selector = `[data-focus-key="${target.key}"]`;
  const button = target.host.querySelector(selector);
  if (button) button.focus();
}

function renderMobileBar() {
  const count = getItemCount();
  const button = document.getElementById("mobileBasketButton");
  const countElement = document.getElementById("mobileBasketCount");
  const totalElement = document.getElementById("mobileBasketTotal");
  countElement.textContent = count;
  countElement.hidden = count === 0;
  totalElement.textContent = count > 0 ? formatPrice(getTotal()) : "";
  button.setAttribute("aria-label", getBasketButtonLabel(count));
}

function getBasketButtonLabel(count) {
  if (count === 0) return "Open basket, it is empty";
  return `Open basket, ${count} items, ${formatPrice(getTotal())}`;
}

function openBasketDialog() {
  document.getElementById("basketDialog").showModal();
}

function closeBasketDialog() {
  document.getElementById("basketDialog").close();
}

function showConfirmation() {
  const overlay = document.getElementById("confirmation");
  overlay.classList.add("is-open");
  overlay.querySelector(".confirmation__card").focus();
  clearTimeout(confirmationTimer);
  confirmationTimer = setTimeout(hideConfirmation, confirmationDelay);
}

function hideConfirmation() {
  document.getElementById("confirmation").classList.remove("is-open");
  clearTimeout(confirmationTimer);
}

function backToHomePage() {
  hideConfirmation();
  window.scrollTo({ top: 0 });
}

function registerEvents() {
  registerDialogEvents();
  registerConfirmationEvents();
}

function registerDialogEvents() {
  const dialog = document.getElementById("basketDialog");
  const desktopQuery = window.matchMedia("(min-width: 1024px)");
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeBasketDialog();
  });
  desktopQuery.addEventListener("change", (event) => {
    if (event.matches) closeBasketDialog();
  });
}

function registerConfirmationEvents() {
  const overlay = document.getElementById("confirmation");
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) hideConfirmation();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") hideConfirmation();
  });
}

init();