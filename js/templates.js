function getIcon(name) {
  return `<img class="icon" src="assets/icons/${name}.svg" alt="" aria-hidden="true" />`;
}

function getHoverIcon(name) {
  return `
    <span class="icon icon-swap" aria-hidden="true">
      <img class="icon-swap__img" src="assets/icons/${name}.svg" alt="" />
      <img class="icon-swap__img icon-swap__hover" src="assets/icons/${name}-orange.svg" alt="" />
    </span>`;
}

function getSliderLinkTemplate(category) {
  return `
    <li>
      <a class="category-slider__link" href="#${category.id}">
        <img src="${category.icon}" alt="" />
        ${category.title}
      </a>
    </li>`;
}

function getCategoryTemplate(category) {
  return `
    <section class="category" id="${category.id}">
      <div class="category__header">
        <img class="category__icon" src="${category.icon}" alt="" />
        <h2 class="category__title">${category.title}</h2>
      </div>
      <div class="category__dishes">
        ${category.dishes.map(getDishTemplate).join("")}
      </div>
    </section>`;
}

function getDishTemplate(dish) {
  return `
    <article class="dish">
      <img class="dish__image" src="${dish.image}" alt="${dish.name}"
        width="720" height="480" loading="lazy" />
      <div class="dish__text">
        <h3 class="dish__name">${dish.name}</h3>
        <p class="dish__description">${dish.description}</p>
      </div>
      <p class="dish__price">${formatPrice(dish.price)}</p>
      ${getAddButtonTemplate(dish)}
    </article>`;
}

function getAddButtonLabel(quantity) {
  return quantity > 0 ? `Added ${quantity}` : "Add to basket";
}

function getAddButtonTemplate(dish) {
  const quantity = getQuantity(dish.id);
  return `
    <button class="add-button ${quantity > 0 ? "is-added" : ""}"
      data-dish-id="${dish.id}" onclick="addToBasket('${dish.id}')">
      ${getHoverIcon("plus")}
      <span class="add-button__label">${getAddButtonLabel(quantity)}</span>
      <span class="visually-hidden">: ${dish.name}</span>
    </button>`;
}

function getBasketTemplate() {
  return `
    <div class="basket">
      <h2 class="basket__title">Your Basket</h2>
      ${basket.length > 0 ? getFilledBasketTemplate() : getEmptyBasketTemplate()}
    </div>`;
}

function getEmptyBasketTemplate() {
  return `
    <div class="basket__empty">
      <p>Nothing here yet. Go ahead and choose something delicious!</p>
      ${getIcon("cart")}
    </div>`;
}

function getFilledBasketTemplate() {
  return `
    <ul class="basket__items">
      ${basket.map(getBasketItemTemplate).join("")}
    </ul>
    ${getBasketSumsTemplate()}`;
}

function getBasketItemTemplate(item) {
  const dish = findDish(item.dishId);
  return `
    <li class="basket-item">
      <div class="basket-item__top">
        <span class="basket-item__name">${item.quantity} x ${dish.name}</span>
        ${item.quantity > 1 ? getDeleteButtonTemplate(dish) : ""}
      </div>
      <div class="basket-item__bottom">
        ${getQuantityTemplate(item, dish)}
        ${getItemPriceTemplate(item, dish)}
      </div>
    </li>`;
}

function getItemPriceTemplate(item, dish) {
  const price = formatPrice(dish.price * item.quantity);
  return `<span class="basket-item__price">${price}</span>`;
}

function getDeleteButtonTemplate(dish) {
  return getIconButtonTemplate({
    icon: "trash",
    action: "removeFromBasket",
    label: `Remove ${dish.name} from basket`,
    dishId: dish.id,
    focusRole: "delete",
  });
}

function getQuantityTemplate(item, dish) {
  return `
    <div class="quantity">
      ${getStepDownButtonTemplate(item, dish)}
      <span class="quantity__value">${item.quantity}</span>
      ${getPlusButtonTemplate(dish)}
    </div>`;
}

function getStepDownButtonTemplate(item, dish) {
  const single = item.quantity === 1;
  return getIconButtonTemplate({
    icon: single ? "trash" : "minus",
    action: single ? "removeFromBasket" : "decreaseQuantity",
    label: single ? `Remove ${dish.name}` : `One less ${dish.name}`,
    dishId: dish.id,
    focusRole: "step-down",
  });
}

function getPlusButtonTemplate(dish) {
  return getIconButtonTemplate({
    icon: "plus",
    action: "addToBasket",
    label: `One more ${dish.name}`,
    dishId: dish.id,
    focusRole: "step-up",
  });
}

function getIconButtonTemplate(config) {
  return `
    <button class="icon-button" aria-label="${config.label}"
      data-focus-key="${config.focusRole}-${config.dishId}"
      onclick="${config.action}('${config.dishId}')">
      ${getHoverIcon(config.icon)}
    </button>`;
}

function getBasketSumsTemplate() {
  return `
    <div class="basket__sums">
      ${getSumRowTemplate("Subtotal", getSubtotal())}
      ${getSumRowTemplate("Delivery fee", deliveryFee)}
      ${getSumRowTemplate("Total", getTotal(), "sum-row--total")}
      <button class="buy-button" onclick="placeOrder()">
        Buy now (${formatPrice(getTotal())})
      </button>
    </div>`;
}

function getSumRowTemplate(label, amount, modifier = "") {
  return `
    <p class="sum-row ${modifier}">
      <span>${label}</span>
      <span>${formatPrice(amount)}</span>
    </p>`;
}