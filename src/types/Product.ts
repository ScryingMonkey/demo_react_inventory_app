type ProductField = {
  valueKey: keyof Product;
  label: string;
  type: string;
  min?: string;
  step?: string;
};
type ProductFields = { [key: string]: ProductField };

export class Product {
  "_id": string;
  "sku": string;
  "name": string;
  "quantity": string;
  "imageUrl": string;
  "costPrice": string;
  "lastUpdated": string;

  static productFields: ProductFields = {
    sku: { valueKey: "sku", label: "SKU", type: "text" },
    name: { valueKey: "name", label: "Name", type: "text" },
    costPrice: {
      valueKey: "costPrice",
      label: "Cost Price",
      type: "number",
      min: "0",
      step: "0.01"
    },
    quantity: {
      valueKey: "quantity",
      label: "Quantity",
      type: "number",
      min: "0",
      step: "1"
    },
    imageUrl: { valueKey: "imageUrl", label: "Image Url", type: "longtext" }
  };

  constructor() {
    this._id = "";
    this.sku = "";
    this.name = "";
    this.quantity = "";
    this.imageUrl = "";
    this.costPrice = "NaN";
    this.lastUpdated = new Date().toISOString();
  }
  clone(): Product {
    const np = new Product();
    Object.keys(this).forEach((k: string) => (np[k] = this[k]));
    return np;
  }
  clear() {
    const np: Product = new Product();
    Object.keys(np).forEach(k => (this[k] = np[k]));
  }
  setConfig(p: Product) {
    Object.keys(p).forEach(k => {
      this[k] = p[k];
    });
  }
  getObject() {
    let o: { [key: string]: any } = {};
    Object.keys(this).forEach(k => (o[k] = this[k]));
    return o;
  }
}
