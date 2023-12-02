const CommercialEstablishment =  require("./CommercialEstablishment");
const Product = require("./Product");
const Review = require("./Review");


const establishment1 = new CommercialEstablishment();
console.log(establishment1.registrar("Loja A", "123456789", "Cidade1", "Estado1"));

const establishment2 = new CommercialEstablishment();
console.log(establishment2.registrar("Loja B", "987654321", "Cidade2", "Estado2"));

// Tentativa de cadastrar um estabelecimento com o mesmo documento
try {
  const establishment3 = new CommercialEstablishment();
  console.log(establishment3.registrar("Loja C", "123456789", "Cidade3", "Estado3"));
} catch (error) {
  console.error(error.message);
}

const product1 = new Product();
console.log(product1.registrar("Camisa", "Roupa", "PRD001", "123456789"));


const product2 = new Product();
console.log(product2.registrar("Short", "Roupa", "PRD002", "987654321"));
console.log("Buscando produto pelo nome:", Product.findProductByName("Camisa"));

// Tentativa de cadastrar um estabelecimento com o mesmo documento
try {
  const product3 = new Product();
  console.log(product3.registrar("Copo", "Utensílios", "PRD002", "987654321"));
} catch (error) {
  console.error(error.message);
}

try {
    const product4 = new Product("Produto Y", "Roupas", "002", "00");
} catch (error) {
    console.error(error.message);
}

const review1 = new Review();
console.log(review1.registrar("Emilly", "10", "As camisas tem uma ótima qualidade", product1))
console.log(review1)
//onsole.log(review1.addReview(this))

console.log("Buscando produto pela categoria:", Product.findProductByCategory("Roupa"));

// const service1 = new Service();
// console.log(product1.registrar("Camisa", "Roupa", "Camisas", "PRD001"));

// const product2 = new Product();
// console.log(product2.registrar("Copo", "Utensílios", "Personalizado", "PRD002"));

// // Tentativa de cadastrar um estabelecimento com o mesmo documento
// try {
//   const product3 = new Product();
//   console.log(product3.registrar("Copo", "Utensílios", "Personalizado", "PRD002"));
// } catch (error) {
//   console.error(error.message);
// }


// Teste de cadastro de estabelecimento
// const establishment = new CommercialEstablishment("Loja A", "123456789", "Cidade", "Estado");
// console.log(establishment);

// // Teste de cadastro de produto vinculado ao estabelecimento
// const product = new Product("Produto X", "Eletrônicos", "001", "123456789");
// console.log(product);

// Tente cadastrar o mesmo produto novamente (deve lançar uma exceção)
// try {
//     const duplicateProduct = new Product("Produto X", "Eletrônicos", "001", "123456789");
// } catch (error) {
//     console.error(error.message);
// }

// Tente cadastrar um produto com um estabelecimento inexistente (deve lançar uma exceção)
