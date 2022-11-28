import {
  client,
  // CombinedField,
  Field,
  Query,
} from "@tilework/opus";

client.setEndpoint("http://localhost:4000");

export const getCurrencies = async () => {
  const myQuery = new Query("currencies", true)
    .addField("symbol")
    .addField("label");

  return await client.post(myQuery)
};

export const getProductList = async (category) => {
  const productFields = ["brand", "id", "name", "inStock", "gallery"];
  const productsQuery = new Query("category", false)
    .addArgument("input", "CategoryInput", { title: category })
    .addField(
      new Field("products", true)
        .addFieldList(productFields)
        .addField(
          new Field("prices", true)
            .addField(new Field("currency").addField("symbol"))
            .addField("amount")
        )
    );

  return await client.post(productsQuery);
};

export const getProductData = async (productId, addtitionaFields) => {
  const productFields = addtitionaFields;

  const productQuery = new Query("product", false)
    .addArgument("id", "String!", productId)
    .addFieldList(productFields)
    .addField(
      new Field("prices", true)
        .addField(new Field("currency").addField("symbol"))
        .addField("amount")
    )
    .addField(
      new Field("attributes", true)
        .addFieldList(["id", "name", "type"])
        .addField(
          new Field("items", true).addFieldList(["id", "value", "displayValue"])
        )
    );

  return await client.post(productQuery);
};
