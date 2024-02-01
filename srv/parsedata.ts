import * as XLSX from "xlsx";

const data = XLSX.readFile(
  "./data/TABULKY_STEM_pro_CRo_hlavni_soubor.xls",
  { dense: true },
);

const qs = data.Sheets["Celá veřejnost 18+"].reduce((acc, row, i) => {
  if (i > 2 && i < 549 && row[0]) acc = [...acc, { q: row[0].v, a: [row.slice(1,9).map((a) => a.v)] }];
  if (i > 2 && i < 549 && row[0]=== undefined && row[1].v !== "Počet") {
    
    acc[acc.length-1].a.push(row.slice(1, 9).map((a) => a.v));
  }
  return acc;
}, []);

console.log(qs);

Bun.write("./data/qas.json", JSON.stringify(qs, null, 2));
