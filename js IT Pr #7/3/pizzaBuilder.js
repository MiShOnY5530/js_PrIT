class Pizza {
    constructor(size, dough, sauce, toppings) {
        this.size = size;
        this.dough = dough;
        this.sauce = sauce;
        this.toppings = toppings;
    }

    toString() {
        return `Піца: ${this.size}, Тісто: ${this.dough}, Соус: ${this.sauce}, Інгредієнти: ${this.toppings.join(', ')}`;
    }
}

class PizzaBuilder {
    constructor() {
        this.size = null;
        this.dough = null;
        this.sauce = null;
        this.toppings = [];
    }

    setSize(size) {
        this.size = size;
        return this;
    }

    setDough(dough) {
        this.dough = dough;
        return this;
    }

    setSauce(sauce) {
        this.sauce = sauce;
        return this;
    }

    addTopping(topping) {
        this.toppings.push(topping);
        return this;
    }
    build() {
        if (this.toppings.length === 0) {
            throw new Error("Потрібно вибрати хоча б один інгредієнт.");
        }
        return new Pizza(this.size, this.dough, this.sauce, this.toppings);
    }
}

document.getElementById('createPizza').addEventListener('click', () => {
    const size = document.getElementById('size').value;
    const dough = document.getElementById('dough').value;
    const sauce = document.getElementById('sauce').value;
    const toppings = Array.from(document.getElementById('toppings').selectedOptions).map(option => option.value);

    try {
        const pizzaBuilder = new PizzaBuilder()
            .setSize(size)
            .setDough(dough)
            .setSauce(sauce);

        toppings.forEach(topping => pizzaBuilder.addTopping(topping));

        const pizza = pizzaBuilder.build();
        displayPizza(pizza);
    } catch (error) {
        alert(error.message);
    }
});

function displayPizza(pizza) {
    const pizzasDiv = document.getElementById('pizzas');
    const pizzaElement = document.createElement('div');
    pizzaElement.textContent = pizza.toString();
    pizzasDiv.appendChild(pizzaElement);
}
