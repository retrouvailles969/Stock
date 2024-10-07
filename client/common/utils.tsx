import { Item, ItemStatus } from "./types";

export function getStatusBadgeColor(status: ItemStatus): string {
  switch (status) {
    case "On Check":
      return "green";
    case "Tidak Sesuai":
      return "orange";
    case "Salah Tempat":
      return "pink";
    case "Sesuai":
      return "violet";
    default:
      return "violet";
  }
}

export const placeholderItem: Item = {
  _id: "",
  name: "Item name",
  description:
    "This is a sample description that contains many alphanumeric characters.",
  status: "On Check",
  stock: 0,
  image: "https://placehold.co/600x400?text=Image",
  aktual: 0,
  category: "",
};

export const ERROR = {
  SERVER_CONNECTION: "Unable to connect to server. Please try again later.",
  EMPTY_CATEGORY_LIST:
    "No categories exist. Please create at least one category before proceeding.",
  MISSING_ITEM_ID: "Invalid URL: Item ID is missing.",
};
