import {computed, ref} from 'vue';
import {CONSTANTS} from 'src/utils/utils';
import { Document }  from 'src/graphql/types';

type Cart = {
  id: string;
  title: string;
  category?: string;
  fileCount: number;
  size: number;
  price: number;
}

function getCart() {
  const data = JSON.parse(<string>localStorage.getItem(CONSTANTS.cart)) as Cart[];
  if(data) return data;
  return [];
}

export const cart = ref<Cart[]>(getCart());

export const useCart = () => {
  function addToCart(document: Document) {
    const index = cart.value.findIndex(x => x.id === document.id);
    if(index < 0) {
      cart.value.push({
        id: document.id,
        title: document.title,
        category: document.family?.category?.label,
        fileCount: document.files.length,
        size:  document.files.reduce((cum, cur) => cum + cur.size,0),
        price: document.price
      });

      localStorage.setItem(CONSTANTS.cart, JSON.stringify(cart.value));
    }
  }

  function removeFromCart(id: string) {
    cart.value = cart.value.filter(c => c.id !== id);
    localStorage.setItem(CONSTANTS.cart, JSON.stringify(cart.value));
  }

  const cartAmount = computed(() => cart.value.reduce((cum, cur) => cum + cur.price, 0));

  function inCart(id: string) {
    return cart.value.findIndex(d => d.id === id) >= 0;
  }

  return { addToCart, removeFromCart, cartAmount, cart, inCart }
}
