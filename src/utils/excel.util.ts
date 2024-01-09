import * as XLSX from "xlsx";

export const excelToJson = (file: string) => {
  const workbook: XLSX.WorkBook = XLSX.readFile(file);

  // Assuming the first sheet in the Excel file
  const sheetName: string = workbook.SheetNames[0];
  const sheet: XLSX.WorkSheet = workbook.Sheets[sheetName];

  // Convert the sheet data to a JSON object
  const jsonData: any[] = XLSX.utils.sheet_to_json(sheet);

  console.log(jsonData);

  return jsonData;
};

// const show = excelToJson("Student.xlsx");
