import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils"

import BuyItems from '../global/BuyItems.vue'

describe("BuyItems", () => {
  const wrapper = mount(BuyItems, {
    props: {
      price: 252,
      priceFormatted: 'R$ 252,00',
    }
  })

  const formatPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  it('deve testar se existe label for [value-unit-item] com texto [Preço:]', () => {
    const target = wrapper.find('[for="value-unit-item"]');
    expect(target.element.tagName.toLowerCase()).toBe('label');
    expect(target.text()).toBe('Preço:')
  })

  it('deve testar se o valor unitário  inicial na tela  é [R$ 252,00]', () => {
    const target = wrapper.find('[id="value-unit-item"]');
    expect(target.text()).toEqual('R$ 252,00')
  })

  it('deve testar se existe label for [value-total-item] com texto [Total:]', () => {
    const target = wrapper.find('[for="value-total-item"]');
    expect(target.element.tagName.toLowerCase()).toBe('label');
    expect(target.text()).toBe('Total:')
  })

  it('deve testar se o valor Total  inicial na tela  é [R$ 252,00]', async () => {
    const target = wrapper.find('[id="value-total-item"]');
    expect(target.text()).toEqual(formatPrice.format(252))

  })

  it('deve testar se existe um input type [text] com id [input-item-amount] iniciando com valor 1 ', () => {
    expect(wrapper.find('input[id="input-item-amount"]')).toBeTruthy()
    expect(wrapper.find('input[id="input-item-amount"]').attributes('type')).toBe('text')
    expect(wrapper.find('input').element.value).toBe('1');
  })

  it('deve testar se existe um botão clicável type [button] com id [btn-remove-unit] e texto [ - ]', async () => {
    const button = wrapper.find('[id="btn-remove-unit"]');
    expect(button.attributes('type')).toBe('button')
    expect(button.text()).toBe('-')
    expect(button.attributes('disabled')).toBeFalsy();
  })

  it('deve testar se existe um botão clicável type [button] com id [btn-add-unit] e texto [ + ]', async () => {
    const button = wrapper.find('[id="btn-add-unit"]');
    expect(button.attributes('type')).toBe('button')
    expect(button.text()).toBe('+')
    expect(button.attributes('disabled')).toBeFalsy();
  })

  it('deve testar se existe um botão clicável type [button] com id [btn-buy] e texto [ Comprar ]', async () => {
    const button = wrapper.find('[id="btn-buy"]');
    expect(button.attributes('type')).toBe('button')
    expect(button.text()).toBe('Comprar')
    expect(button.attributes('disabled')).toBeFalsy();
  })

  it('deve testar se ao dar 2 click no botão [ + ] se o valor do input [input-item-amount] será 3 ', async () => {
    const button = wrapper.find('[id="btn-add-unit"]');
    await button.trigger('click.prevent');
    await button.trigger('click.prevent');
    expect(wrapper.find('input[id="input-item-amount"]')).toBeTruthy()
    expect(wrapper.find('input').element.value).toBe('3');
  })

  it('deve testar se o novo valor total na tela será  [ R$ 756,00 ]', async () => {
    const target = wrapper.find('[id="value-total-item"]');
    expect(target.text()).toEqual(formatPrice.format(756))
  })

  it('deve testar se ao dar 2 click no botão [-] se o valor do input [input-item-amount] será 1 ', async () => {
    const buttonAdd = wrapper.find('[id="btn-add-unit"]');
    const button = wrapper.find('[id="btn-remove-unit"]');

    await button.trigger('click.prevent');
    await button.trigger('click.prevent');

    expect(wrapper.find('input[id="input-item-amount"]')).toBeTruthy()
    expect(wrapper.find('input').element.value).toBe('1');
  })

  it('deve testar se ao dar 2 click no botão [-] se o valor do input [input-item-amount] continuara 1 ', async () => {
    const buttonAdd = wrapper.find('[id="btn-add-unit"]');
    const button = wrapper.find('[id="btn-remove-unit"]');

    await button.trigger('click.prevent');
    await button.trigger('click.prevent');

    expect(wrapper.find('input[id="input-item-amount"]')).toBeTruthy()
    expect(wrapper.find('input').element.value).toBe('1');
  })

  it('deve testar se ao dar 2 click no botão [ + ] e clicar no botão [ Comprar] emitirá o valor 3 ', async () => {
    const button = wrapper.find('[id="btn-add-unit"]');
    await button.trigger('click.prevent');
    await button.trigger('click.prevent');
    expect(wrapper.find('input[id="input-item-amount"]')).toBeTruthy()
    expect(wrapper.find('input').element.value).toBe('3');

    const buttonBuy = wrapper.find('[id="btn-buy"]');
    await buttonBuy.trigger('click.prevent');

    expect((wrapper.emitted() as any).getAmount[0][0]).toEqual(3);
  })

})


