/**
 * index.ts
 * Main application file responsible for setting up the grid and handling user interaction.
 */

/// <reference path="kendo.all.d.ts" />
import { fetchHistoryData, historyItemSchema, historyColumns, historyTooltip } from './historydata';
import { fetchConfigData } from './configdata'

const apiUrl = 'https://api.dfi.tax/v02/hst/';
const configUrl = 'https://api.dfi.tax/v02/cfg/get/';

var grid: kendo.ui.Grid;
let textboxAccessKey: kendo.ui.TextBox;
let yearTextbox: kendo.ui.NumericTextBox;
let monthTextbox: kendo.ui.NumericTextBox;
var historyData: any;

/**
* Get local storage value for a given key or return the default value if not found.
* @param key - The key to search for in local storage.
* @param defaulValue - The default value to return if the key is not found.
* @returns The value found in local storage or the default value.
*/
function GetLocalStorage(key: string, defaulValue: any) {
  const val = localStorage.getItem(key);
  return val ? JSON.parse(val) : defaulValue;
}

/**
 * Initializes the application, setting up the grid and user interactions.
 */
async function init() {
  const columnWidths = JSON.parse(localStorage.getItem("dfitaxhistory.colWidths") || "[]");
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
      schema: historyItemSchema,
      aggregate: [
        { field: "value", aggregate: "sum" },
      ]
    },
    columns: historyColumns(columnWidths),
    sortable: true,
    resizable: true,
    filterable: true,
    filterMenuInit: function (e) {
      if (e.field?.startsWith("adr")) {
        e.container?.addClass("widerMenu");
      }
    },

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
    columnResize: function (e: kendo.ui.GridColumnResizeEvent) {
      const columnWidths: number[] = [];
      grid.columns.forEach((column: any) => { columnWidths.push(column.width); });
      localStorage.setItem("dfitaxhistory.colWidths", JSON.stringify(columnWidths));
    },
  }).data("kendoGrid")!;
  grid.thead.kendoTooltip({ filter: "th", content: historyTooltip });

  textboxAccessKey = $("#accessKey").kendoTextBox({
    value: GetLocalStorage('accessKey', ""),
  }).data("kendoTextBox")!;

  yearTextbox = $("#yearTexbox").kendoNumericTextBox({
    format: "#",
    decimals: 0,
    value: GetLocalStorage('dfitaxhistory.year', 2023),
    min: 2019
  }).data("kendoNumericTextBox")!;

  monthTextbox = $("#monthTexbox").kendoNumericTextBox({
    format: "#",
    decimals: 0,
    value: GetLocalStorage('dfitaxhistory.month', 0),
    min: 0,
    max: 12
  }).data("kendoNumericTextBox")!;

  $("#btnLoad").kendoButton({
    icon: "reload",
    click: async function () {
      const accKey = textboxAccessKey.value().trim();
      if (!accKey) {
        alert("Access Key is empty!");
      } else {
        const result = await fetchConfigData(`${configUrl}${accKey}`);
        if (typeof result === "string") {
          alert(result);
        } else {
          const year = yearTextbox.value();
          const month = monthTextbox.value();
          const url = `${apiUrl}${accKey}/${year}/${month}`;
          historyData = await fetchHistoryData(url);
          if (typeof historyData === "string") {
            alert(historyData);
          } else {
            grid.dataSource.data(historyData); //assign new data without loosing schema, tooltip filter
            localStorage.setItem('accessKey', JSON.stringify(accKey));
            localStorage.setItem('dfitaxhistory.year', JSON.stringify(year));
            localStorage.setItem('dfitaxhistory.month', JSON.stringify(month));
            //we have new data: reinit the Multticheck Filter
            $('.k-filterable').each((index, element) => $(element).data("kendoFilterMultiCheck")?._init());
          }
        }
      }
    }
  });
}
$(document).on("ready", function () {
  // Call init after DOM is loaded
  init();

  // Resize Grid on browser windows resize
  $(window).on('resize', function () {
    grid?.resize();
  });
});
