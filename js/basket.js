const storageKey = "burgerHouseBasket";
let basket = [];

function formatPrice(amount) {
  return amount.toFixed(2).replace(".", ",") + "€";
}

function findDish(dishId) {
  return allDishes.find((dish) => dish.id === dishId);
}

function findBasketItem(dishId) {
  return basket.find((item) => item.dishId === dishId);
}

function getQuantity(dishId) {
  const item = findBasketItem(dishId);
  return item ? item.quantity : 0;
}

function getItemCount() {
  return basket.reduce((count, item) => count + item.quantity, 0);
}

function getSubtotal() {
  return basket.reduce((sum, item) => {
    return sum + findDish(item.dishId).price * item.quantity;
  }, 0);
}

function getTotal() {
  return basket.length > 0 ? getSubtotal() + deliveryFee : 0;
}

function addToBasket(dishId) {
  const item = findBasketItem(dishId);
  if (item) {
    item.quantity++;
  } else {
    basket.push({ dishId, quantity: 1 });
  }
  updateShop();
}

function decreaseQuantity(dishId) {
  const item = findBasketItem(dishId);
  if (!item) return;
  if (item.quantity <= 1) {
    removeFromBasket(dishId);
    return;
  }
  item.quantity--;
  updateShop();
}

function removeFromBasket(dishId) {
  basket = basket.filter((item) => item.dishId !== dishId);
  updateShop();
}

function placeOrder() {
  if (basket.length === 0) return;
  basket = [];
  closeBasketDialog();
  updateShop();
  showConfirmation();
}

function saveBasket() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(basket));
  } catch (error) {
    console.warn("Basket could not be saved.", error);
  }
}

function loadBasket() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey)) || [];
    basket = saved.filter((item) => findDish(item.dishId));
  } catch (error) {
    basket = [];
  }
}