
import { 
  client, 
  // CombinedField, 
  Field, 
  Query 
} from "@tilework/opus";

client.setEndpoint("http://localhost:4000");

export const getProductList = async (category) => {
  const productFields = ["id", "name", "gallery"];
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

  return await client.post(productsQuery)
};

export const getProduct = async (productId) => {
  const productFields = ["id", "name", "brand", "inStock", "gallery"];

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
          new Field("items", true)
          .addFieldList(["id", "value", "displayValue"])
        )
    )

  return await client.post(productQuery)
};

