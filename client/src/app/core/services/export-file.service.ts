import { Injectable } from '@angular/core';
import { WorkSheet, WorkBook, writeFile, utils, write } from "xlsx"

@Injectable({
  providedIn: 'root'
})
export class ExportFileService {

  constructor() { }

  exportAsXlsx(data: any[], fileName: string){
      const worksheet: WorkSheet = utils.json_to_sheet(data);
      const workbook: WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      //const excelBuffer: any = write(workbook, { bookType: 'xlsx', type: 'array' });
      writeFile(workbook, `${fileName}.xlsx`);
  }
}
