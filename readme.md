# DFI Tax History Project

This project is a web application that helps users retrieve and display their DFI Tax History data in a user-friendly table format. Users can input their access key, year, and month to fetch data from the DFI Tax API, and the application will display the information in a sortable, filterable, and resizable grid.

## Features

- Kendo UI Grid for displaying data with various customization options
- Access Key input for secure data fetching
- Year and Month inputs for filtering data by specific timeframes
- Responsive design that adjusts the grid size based on the browser window size
- Export data to Excel with proper date formatting
- Save column widths, access key, year, and month values in local storage for future use

## Setup

1. Clone the repository to your local machine.
2. Run `npm install` to install all required dependencies.

## Usage

1. Run `npm start` to start the development server.
2. Open your browser and navigate to `http://localhost:9000` to view the application.
3. Enter your Access Key in the "Access Key" input field.
4. Enter the desired Year and Month in their respective input fields. The selection of 0 at Month means the complete year. 
5. Click the "Load" button to fetch and display data.
6. Use the grid's features to sort, filter, and resize columns as needed.
7. Click the "Excel" button to export the data to an Excel file.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
