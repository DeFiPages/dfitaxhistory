import {config} from './configdata'

/**
 * The schema definition for the history item model.
 */
export const historyItemSchema = {
  model: {
    fields: {
      dt: { type: "date" },
      debit1Code: { type: "string" },
      debit1Qty: { type: "number" },
      debit1Value: { type: "number" },
      debit2Code: { type: "string" },
      debit2Qty: { type: "number" },
      debit2Value: { type: "number" },
      credit1Code: { type: "string" },
      credit1Qty: { type: "number" },
      credit1Value: { type: "number" },
      credit2Code: { type: "string" },
      credit2Qty: { type: "number" },
      credit2Value: { type: "number" },
      adr: { type: "string" },
      cat: { type: "string" },
      tx_id: { type: "string" },
      blkid: { type: "number" },
      value: { type: "number" },
      fee_qty: { type: "number" },
      fee_value: { type: "number" },
    },
  }
}

/**
 * Returns an array of columns for the history table.
 * 
 * @param {number[]} columnWidths - Optional array of column widths.
 * @returns {kendo.ui.GridColumn[]} An array of Kendo UI GridColumn objects.
 */
export function historyColumns(columnWidths: number[] = []): kendo.ui.GridColumn[] {
  return [
    { field: 'dt', title: 'Date', width: columnWidths[0] || 120, format: "{0:dd.MM.yy HH:mm:ss}" },
    { field: 'blk_id', title: 'Block', width: columnWidths[1] || 70, template: '<a href="https://defiscan.live/blocks/${blk_id}" target="_blank">${blk_id}</a>' },
    { field: 'adr', title: "Address", width:columnWidths[2] || 70, filterable: { multi: true, search: true }, template: '<a href="https://defiscan.live/address/${adr}" target="_blank">${adr}</a>' },
    { field: 'tx_id', title: "tx", width: columnWidths[3] || 50, template: '<a href="https://defiscan.live/transactions/${tx_id}" target="_blank">${tx_id}</a>' },
    { field: 'cat', title: "Category", width: columnWidths[4] || 100, filterable: { multi: true } },
    { field: 'debit1Qty', title: 'D1.Qty', width: columnWidths[5] || 85, format: "{0:n}" },
    { field: 'debit1Code', title: 'D1.Code', width: columnWidths[6] || 85, filterable: { multi: true } },
    { field: 'debit2Qty', title: 'D2.Qty', width: columnWidths[7] || 85, format: "{0:n}" },
    { field: 'debit2Code', title: 'D2.Code', width: columnWidths[8] || 85, filterable: { multi: true } },
    { field: 'credit1Qty', title: 'C1.Qty', width: columnWidths[9] || 85, format: "{0:n}" },
    { field: 'credit1Code', title: 'C1.Code', width: columnWidths[10] || 85, filterable: { multi: true } },
    { field: 'credit2Qty', title: 'C2.Qty', width: columnWidths[11] || 85, format: "{0:n}" },
    { field: 'credit2Code', title: 'C2.Code', width: columnWidths[12] || 85, filterable: { multi: true } },
    { field: 'value', width: columnWidths[13] || 100, format: "{0:n}"},
    { field: 'fee_qty', width: columnWidths[14] || 80 , format: "{0:#.########}"},
    { field: 'fee_value' , format: "{0:#.########}"},
  ]
}

/**
 * Returns a tooltip text for a given table column.
 * 
 * @param {any} e - Event data.
 * @returns {string} Tooltip text.
 */
export function historyTooltip(e: any) {
  var text = e.target.text().trim(); // element for which the tooltip is shown
  switch (text) {
    case "D1.Qty": return "Debit 1 Quantity";
    case "D1.Code": return "Debit 1 Token Code";
    case "D1.Value": return "Debit 1 Value";
    case "D2.Qty": return "Debit 2 Quantity";
    case "D2.Code": return "Debit 2 Token Code";
    case "D2.Value": return "Debit 2 Value";
    case "C1.Qty": return "Credit 1 Quantity";
    case "C1.Code": return "Credit 1 Token Code";
    case "C1.Value": return "Credit 1 Value";
    case "C2.Qty": return "Credit 2 Quantity";
    case "C2.Code": return "Credit 2 Token Code";
    case "C2.Value": return "Credit 2 Value";
    case "value": return "value in " + config?.cur_code;
    case "fee_value": return "fee in " + config?.cur_code;
    default:
      return text;
  }
}

/**
 * Fetches history data from the given API URL.
 * 
 * @param {string} apiUrl - The URL to fetch the history data from.
 * @returns {Promise<string | HistoryItem[]>} A promise that resolves to an array of history items
 * or an error message string in case of an error.
 */
export async function fetchHistoryData(apiUrl: string) {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) 
      return `HTTP error fetching: ${apiUrl} status: ${response.status}`
    const data = await response.json();
    return data.history.map(historyData);
  } catch (error) {
      return "An error occurred while fetching the data:" + error;
  }
}

/**
 * Interface for a token object.
 */
interface Token {
  code: string;
  qty: number;
  value?: number;
}

/**
 * Interface for a processed history item used in the application.
 */
interface HistoryApiItem {
  dt: string;
  adr: string;
  cat: string;
  tx_id: string;
  blk_id: number;
  value: number;
  fee_qty: number;
  fee_value: number;
  tokens: Token[];
}

/**
 * Interface for a processed history item used in the application.
 */
interface HistoryItem {
  dt: Date;
  adr: string;
  cat: string;
  tx_id: string;
  blk_id: number;
  value: number;
  fee_qty: number;
  fee_value: number;
  debit1Code?: string;
  debit1Qty?: number;
  debit1Value?: number;
  debit2Code?: string;
  debit2Qty?: number;
  debit2Value?: number;
  credit1Code?: string;
  credit1Qty?: number;
  credit1Value?: number;
  credit2Code?: string;
  credit2Qty?: number;
  credit2Value?: number;
}

/**
 * Processes a raw history item received from the API and returns
 * a history item object used in the application.
 * 
 * @param {HistoryApiItem} item - A raw history item received from the API.
 * @returns {HistoryItem} A processed history item object.
 */
function historyData(item: HistoryApiItem): HistoryItem {
  const historyItem: HistoryItem = {
    dt: new Date(item.dt),
    adr: item.adr,
    cat: item.cat,
    tx_id: item.tx_id,
    blk_id: item.blk_id,
    value: item.value,
    fee_qty: item.fee_qty,
    fee_value: item.fee_value,
  };

  let debitCount = 0;
  let creditCount = 0;

  item.tokens.forEach((token) => {
    if (token.qty >= 0) {
      debitCount++;
      if (debitCount === 1) {
        historyItem.debit1Code = token.code;
        historyItem.debit1Qty = token.qty;
        historyItem.debit1Value = token.value;
      } else if (debitCount === 2) {
        historyItem.debit2Code = token.code;
        historyItem.debit2Qty = token.qty;
        historyItem.debit2Value = token.value;
      }
    } else {
      creditCount++;
      if (creditCount === 1) {
        historyItem.credit1Code = token.code;
        historyItem.credit1Qty = token.qty;
        historyItem.credit1Value = token.value;
      } else if (creditCount === 2) {
        historyItem.credit2Code = token.code;
        historyItem.credit2Qty = token.qty;
        historyItem.credit2Value = token.value;
      }
    }
  });

  return historyItem;
}
