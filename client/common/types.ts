export type ItemStatus = "On Check" | "Tidak Sesuai" | "Salah Tempat" | "Sesuai";

export interface Category {
  _id: string;
  name: string;
  description: string;
}

export interface NullableCategory {
  category?: Category;
}

export interface Item {
  _id: string;
  name: string;
  description: string;
  status: ItemStatus;
  stock: number;
  image: string;
  aktual: number;
  category: string;
}

export interface appProps {
  backendURL: string;
  displayError(message: string): void;
  toggleLoader(switchOn: Boolean): void;
}
