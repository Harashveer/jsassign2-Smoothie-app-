// Smoothie class to store and handle all details about a custom smoothie order
class Smoothie {
  constructor(name, milk, fruits, sweetener, addons, icecream, size) {
    this.name = name || "Unnamed Smoothie";
    this.milk = milk;
    this.fruits = fruits;
    this.sweetener = sweetener;
    this.addons = addons;
    this.icecream = icecream;
    this.size = size;
    this.price = this.calculatePrice();
  }
// I added a price system 
// it will calculate the price of the smoothie 
  calculatePrice() {
    let price = 0;

    switch (this.size) {
      case "Small":
        price += 5;
        break;
      case "Medium":
        price += 6;
        break;
      case "Large":
        price += 7;
        break;
    }

    // will charge extra if fruits added more than three
    if (this.fruits.length > 3) {
      price += (this.fruits.length - 3) * 0.5;
    }

    // will charge extra if addons added more than 2
    if (this.addons.length > 2) {
      price += (this.addons.length - 2) * 1;
    }
    // most important thing in smoothie :)
    // Ice cream scoops
    const scoopNum =
      parseInt(this.icecream) || parseInt(this.icecream?.charAt(0)) || 0;
    if (scoopNum > 2) {
      price += (scoopNum - 2) * 0.75;
    }

    return price;
  }
// the bill
  getSummary() {
    return `
      <h3>Your Smoothie Summary</h3>
      <p><strong>Name:</strong> ${this.name}</p>
      <p><strong>Milk:</strong> ${this.milk}</p>
      <p><strong>Fruits:</strong> ${this.fruits.join(", ")}</p>
      <p><strong>Sweetener:</strong> ${this.sweetener}</p>
      <p><strong>Add-ons:</strong> ${
        this.addons.length > 0 ? this.addons.join(", ") : "None"
      }</p>
      <p><strong>Ice Cream:</strong> ${this.icecream}</p>
      <p><strong>Size:</strong> ${this.size}</p>
      <p class="total-price"><strong>Total Price:</strong> $${this.price}</p>
    `;
  }
}

// Handling the form submit
document
  .getElementById("smoothieForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Gather form inputs
    const name = document.getElementById("smoothieName").value;
    const milk = document.getElementById("milkType").value;

    const fruits = Array.from(
      document.querySelectorAll("input[name='fruits']:checked")
    ).map((el) => el.value);
    const sweetener =
      document.querySelector("input[name='sweetener']:checked")?.value || "";
    const addons = Array.from(
      document.querySelectorAll("input[name='addons']:checked")
    ).map((el) => el.value);
    const icecream =
      document.querySelector("input[name='icecream']:checked")?.value || "";
    const size =
      document.querySelector("input[name='size']:checked")?.value || "";

    // Smoothie object
    const smoothie = new Smoothie(
      name,
      milk,
      fruits,
      sweetener,
      addons,
      icecream,
      size
    );

    // showing the bill 
    document.getElementById("smoothieOutput").innerHTML = smoothie.getSummary();
  });


