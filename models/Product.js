
function validateProduct(product) {
    const { name, quantity, price, category } = product;

    if (
        typeof name !== "string" ||
        name.trim() === "" ||
        !Number.isInteger(quantity) ||
        quantity < 0 ||
        typeof price !== "number" ||
        !Number.isFinite(price) ||
        price < 0 ||
        typeof category !== "string" ||
        category.trim() === ""
    ) {
        return "Name, quantity, price, and category are required and must be valid.";
    }

    return null;
}

module.exports = { validateProduct };
