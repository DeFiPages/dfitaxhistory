/// <reference path="kendo.all.d.ts" />
import { fetchHistoryData, historyItemSchema, historyColumns, historyTooltip } from './historydata';

const apiUrl = 'https://api.dfi.tax/v02/hst/';
const configUrl = 'https://api.dfi.tax/v02/cfg/get/';

var currency = ""

// var toolbar!: kendo.ui.ToolBar ;
var grid: kendo.ui.Grid;
let textboxAccessKey: kendo.ui.TextBox;
let yearTextbox: kendo.ui.NumericTextBox;
let monthTextbox: kendo.ui.NumericTextBox;
var historyData: any;

async function init() {

  grid = $("#grid").kendoGrid({
    toolbar: [
      { template: "<label>Access key:</label>" },
      { template: "<input id='accessKey' />" },
      { template: "<label>Year:</label>" },
      { template: "<input id='yearTexbox' />" },
      { template: "<label>Month:</label>" },
      { template: "<input id='monthTexbox' />" },
      { template: "<button id='btnLoad'>Load</button>" },
      "excel"
    ],
    dataSource: {
      data: historyData,
      schema: historyItemSchema
    },
    columns: historyColumns(currency),
    sortable: true,
    filterable: true,
    // pageable: { pageSizes: [25, 50, 100, "All"] }
    excel: {
      fileName: "dfitax_history.xlsx",
      filterable: true,
      allPages: true
    },
    excelExport: function (e) {
      var sheet = e.workbook!.sheets[0];
      for (var rowIndex = 1; rowIndex < sheet.rows!.length; rowIndex++) {
        var row = sheet.rows![rowIndex];
        for (var cellIndex = 0; cellIndex < row.cells!.length; cellIndex++) {
          //check if the cell value is of type date
          if (row.cells![cellIndex].value instanceof Date) {
            row.cells![cellIndex].format = "dd.MM.yy hh:mm:ss"
          }
        }
      }
    },
  }).data("kendoGrid")!;
  grid.thead.kendoTooltip({ filter: "th", content: historyTooltip });

  function GetLocalStorage(key: string, defaulValue: any) {
    const val = localStorage.getItem(key);
    if (val)
      return JSON.parse(val)
    else
      return defaulValue;
  }
  textboxAccessKey = $("#accessKey").kendoTextBox({
    value: GetLocalStorage('accessKey', ""),
  }).data("kendoTextBox")!;


  yearTextbox = $("#yearTexbox").kendoNumericTextBox({
    format: "#",
    decimals: 0,
    value: GetLocalStorage('year', 2023),
    min: 2019
  }).data("kendoNumericTextBox")!;

  monthTextbox = $("#monthTexbox").kendoNumericTextBox({
    format: "#",
    decimals: 0,
    value: GetLocalStorage('month', 0),
    min: 0,
    max: 12
  }).data("kendoNumericTextBox")!;

  $("#btnLoad").kendoButton({
    icon: "reload",
    click: async function () {
      const accKey = textboxAccessKey.value().trim();
      if (!accKey) {
        alert("Access Key is empty!");
        return;
      }
      const year = yearTextbox.value();
      const month = monthTextbox.value();
      const url = `${apiUrl}${accKey}/${year}/${month}`;
      //      const cfg = await fetchConfigData(configUrl + accessKey);
      //      currency = cfg.cur_code == "EUR" ? "€" : cfg.cur_code == "USD" ? "$" : cfg.cur_code;
      historyData = await fetchHistoryData(url);
      if (typeof historyData === "string") {
        alert(historyData);
      } else {
        grid.setDataSource(historyData);
        localStorage.setItem('accessKey', JSON.stringify(accKey));
        localStorage.setItem('year', JSON.stringify(year));
        localStorage.setItem('month', JSON.stringify(month));
      }
    }
  })

}

// Wait until DOM is loaded
$(document).on("ready", function () {
  init();
  // Resize Grid on browser windows resize
  $(window).on('resize', function () { grid?.resize(); });
});
