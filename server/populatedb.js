#! /usr/bin/env node

/**
 * This script populates some items and categories to your database.
 * ! A .env file must be present in server folder and it must contain your mongo connection string
 *
 */

require("dotenv").config();

const Item = require("./models/item");
const Category = require("./models/category");

const items = [];
const categories = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(process.env.MONGO_STRING);
  console.log("Debug: Should be connected?");
  // ! Categories must be created first before item depend on category
  await createCategories();
  await createItems();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function categoryCreate(index, name, description) {
  const category = new Category({ name: name, description: description });
  await category.save();
  categories[index] = category;
  console.log(`Added genre: ${name}`);
}

async function itemCreate(
  index,
  name,
  description,
  status,
  stock,
  aktual,
  category,
  image = false
) {
  const item_ = {
    name: name,
    description: description,
    status: status,
    stock: stock,
    aktual: aktual,
    category: category,
  };
  if (image != false) item_.image = image;

  const item = new Item(item_);

  await item.save();
  items[index] = item;
  console.log(`Added item: ${name}`);
}

async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    categoryCreate(0, "Aluminum Sheets", "Aluminum sheets used for radiator cores and fins"),
    categoryCreate(1, "Copper Tubes", "Copper tubing for efficient heat transfer in radiators"),
    categoryCreate(2, "Brass Components", "Brass components for connectors and fittings in radiators"),
    categoryCreate(3, "Plastic End Caps", "Durable plastic end caps used to seal radiator ends"),
    categoryCreate(4, "Rubber Seals", "Heat-resistant rubber seals for preventing leakage"),
    categoryCreate(5, "Steel Frames", "Steel structures and frames for mounting radiators"),
    categoryCreate(6, "Coolant Fluids", "Coolant liquids, such as ethylene glycol, for heat dissipation"),
    categoryCreate(7, "Zinc Coatings", "Zinc coatings to prevent corrosion of metal parts"),
    categoryCreate(8, "Thermal Paste", "Conductive paste used to improve heat transfer between surfaces"),
    categoryCreate(9, "Brazing Rods", "Brazing rods for joining metal components"),
    categoryCreate(10, "Silicone Sealants", "Silicone-based sealants for leak-proof sealing in radiators"),
    categoryCreate(11, "Radiator Fins", "Aluminum or copper fins for enhancing heat dissipation"),
    categoryCreate(12, "Gaskets", "Rubber or metal gaskets used for sealing joints and connections"),
    categoryCreate(13, "Hoses", "Flexible rubber or silicone hoses for fluid transmission"),
    categoryCreate(14, "Welded Joints", "Pre-fabricated welded joints for connecting pipes and components"),
    categoryCreate(15, "Antifreeze", "Additives to prevent freezing in cooling systems"),
    categoryCreate(16, "Adhesive Tapes", "High-strength adhesive tapes used in radiator assembly"),
    categoryCreate(17, "Pressure Relief Valves", "Valves used to control pressure buildup in radiator systems"),
    categoryCreate(18, "Mounting Brackets", "Metal brackets for securely mounting radiators in place"),
    categoryCreate(19, "Radiator Cores", "Central parts of radiators that allow heat exchange between fluids"),
  ]);
}

async function createItems() {
  console.log("Adding items");
  await Promise.all([
    // Bahan baku untuk produksi inti radiator
    itemCreate(0, "Aluminum Sheet 1mm", "Lembaran aluminium tipis untuk fin radiator", "On Check", 500, 450, categories[0]),
    itemCreate(1, "Aluminum Sheet 2mm", "Lembaran aluminium tebal untuk pelat samping", "Sesuai", 300, 300, categories[0]),
    itemCreate(2, "Copper Tube 10mm", "Tabung tembaga untuk pipa penyaluran panas", "Tidak Sesuai", 200, 180, categories[1]),
    itemCreate(3, "Copper Tube 15mm", "Tabung tembaga diameter besar untuk sirkulasi utama", "On Check", 150, 145, categories[1]),
    itemCreate(4, "Brass Connector", "Konektor kuningan untuk sambungan pipa", "Sesuai", 600, 600, categories[2]),
    itemCreate(5, "Steel Plate 5mm", "Pelat baja untuk rangka radiator", "Sesuai", 250, 250, categories[3]),
    itemCreate(6, "Steel Plate 3mm", "Pelat baja tipis untuk penutup luar", "Salah Tempat", 350, 360, categories[3]),
    itemCreate(7, "Plastic End Cap Type A", "Penutup plastik untuk radiator kecil", "On Check", 800, 750, categories[4]),
    itemCreate(8, "Plastic End Cap Type B", "Penutup plastik untuk radiator besar", "Tidak Sesuai", 400, 390, categories[4]),

    // Bahan baku untuk sistem pendingin
    itemCreate(9, "Radiator Coolant Type A", "Cairan pendingin untuk radiator", "Sesuai", 500, 500, categories[5]),
    itemCreate(10, "Radiator Coolant Type B", "Cairan pendingin formula khusus", "On Check", 600, 580, categories[5]),
    itemCreate(11, "Radiator Coolant Concentrate", "Konsentrat pendingin radiator", "Tidak Sesuai", 450, 440, categories[5]),
    itemCreate(12, "Thermal Paste High Temp", "Pasta termal untuk distribusi panas yang efisien", "Sesuai", 1000, 1000, categories[6]),
    itemCreate(13, "Thermal Tape 10mm", "Pita termal untuk komponen radiator", "On Check", 500, 490, categories[6]),
    
    // Bahan baku pengencang dan sambungan
    itemCreate(14, "Steel Bolt M10", "Baut baja untuk sambungan utama radiator", "Sesuai", 2000, 2000, categories[7]),
    itemCreate(15, "Steel Nut M10", "Mur baja M10 untuk sambungan radiator", "On Check", 1800, 1700, categories[7]),
    itemCreate(16, "Steel Washer M10", "Ring baja untuk pengencang M10", "Salah Tempat", 2200, 2300, categories[7]),
    itemCreate(17, "Aluminum Rivet 5mm", "Rivet aluminium untuk sambungan", "Sesuai", 3000, 3000, categories[8]),
    itemCreate(18, "Brass Valve", "Katup kuningan untuk pengaturan aliran", "On Check", 1500, 1400, categories[2]),
    itemCreate(19, "Rubber Seal Ring 20mm", "Cincin karet untuk sambungan pipa", "Sesuai", 5000, 5000, categories[9]),

    // Bahan baku komponen elektronik
    itemCreate(20, "Cooling Fan 120mm", "Kipas pendingin untuk radiator elektronik", "Sesuai", 800, 800, categories[10]),
    itemCreate(21, "Cooling Fan 80mm", "Kipas pendingin ukuran kecil", "On Check", 900, 880, categories[10]),
    itemCreate(22, "Thermistor", "Sensor suhu untuk kontrol radiator", "Tidak Sesuai", 1500, 1450, categories[10]),
    itemCreate(23, "Temperature Sensor", "Sensor suhu untuk monitoring", "Sesuai", 1200, 1200, categories[10]),
    
    // Bahan baku perlindungan
    itemCreate(24, "Radiator Cover Type A", "Penutup radiator untuk perlindungan fisik", "Sesuai", 400, 400, categories[11]),
    itemCreate(25, "Radiator Cover Type B", "Penutup radiator dengan ventilasi", "On Check", 450, 440, categories[11]),
    itemCreate(26, "Heat Shield Plate", "Pelat pelindung panas", "Tidak Sesuai", 300, 290, categories[11]),

    // Lainnya
    itemCreate(27, "Epoxy Adhesive", "Lem epoxy untuk sambungan logam", "On Check", 700, 680, categories[12]),
    itemCreate(28, "Radiator Paint Black", "Cat hitam tahan panas untuk radiator", "Sesuai", 900, 900, categories[13]),
    itemCreate(29, "Radiator Paint Silver", "Cat perak untuk finishing radiator", "On Check", 850, 830, categories[13]),

  ]);
}
