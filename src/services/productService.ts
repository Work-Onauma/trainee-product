import axios from "axios";

export async function fetchProductById(id: number) {
  try {
    const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw new Error("Failed to load product details");
  }
}

export async function fetchRelatedProducts(category: string, excludeId: number) {
  try {
    const res = await axios.get(
      `https://fakestoreapi.com/products/category/${category}`
    );
    return res.data.filter((p: any) => p.id !== excludeId);
  } catch (error) {
    console.error("Error fetching related products:", error);
    throw new Error("Failed to load related products");
  }
}

export async function fetchAllProducts() {
  try {
    const res = await axios.get("https://fakestoreapi.com/products");
    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to load products");
  }
}

export async function fetchCategories() {
  try {
    const res = await axios.get("https://fakestoreapi.com/products/categories");
    return res.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to load categories");
  }
}

export async function fetchProductTitles(): Promise<string[]> {
  try {
    const res = await axios.get("https://fakestoreapi.com/products");
    return res.data.map((p: any) => p.title);
  } catch (error) {
    console.error("Error fetching product titles:", error);
    throw new Error("Failed to load product suggestions");
  }
}
