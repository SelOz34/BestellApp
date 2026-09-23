function renderMenu() {
  const menuElement = document.getElementById("menu");
  menuElement.innerHTML = menu.map(getCategoryTemplate).join("");
}