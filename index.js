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