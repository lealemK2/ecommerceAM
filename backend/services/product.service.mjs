import { mysqlPool as db } from "../db.mjs";

export async function getAllProducts() {
    const [result]=await db.query("SELECT * FROM products")
    return result;
}

export async function getProductById(id) {
    const [[result]]=await db.query("SELECT * FROM products WHERE id= ?", [id]);
    return result;
}

export async function deleteProduct(id) {
    const [{affectedRows}]=await db.query("DELETE FROM products WHERE id= ?", [id]);
    return affectedRows;
}

export async function addOrUpdate(product,id=0) {
    const [[[{affectedRows}]]]=await db.query("CALL product_add_or_update(?,?,?,?,?)",
     [id, product.name, product.description,product.image,product.price]);
    return affectedRows;
}
