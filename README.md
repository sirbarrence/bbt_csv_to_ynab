# BB&T CSV to YNAB

When [YNAB](https://www.youneedabudget.com/) imports [BB&T's](https://www.bbt.com/) Online Banking CSV transaction export, all it understands are the dates and the amounts, and all of the amounts are shown as inflow. This is a simple Node.js script to convert BB&T's format to [the CSV format that YNAB understands](https://www.youneedabudget.com/support/article/csv-file-importing), so that all the fields are populated correctly when imported into YNAB.

## Requirements

- Node.js

## Installation

```bash
git clone https://github.com/blabla/bbt_csv_to_ynab.git
cd bbt_csv_to_ynab
npm install
```

## Usage

You can either read the CSV input from stdin or from a file path. In this example, `EXPORT.CSV` is the file downloaded from BB&T and `import_to_ynab.csv` is the file you will import into YNAB.

```bash
# Reading from a file path:
node main.js EXPORT.CSV > import_to_ynab.csv

# Piping a CSV file to stdin:
cat EXPORT.CSV | node main.js > import_to_ynab.csv
```

## License

Copyright &copy; 2014 Barry Simpson MIT License
