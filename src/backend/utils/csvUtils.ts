import { createReadStream } from "fs";
import { parse } from "csv-parse";
import path from "path";

const readCSV = async (filename: string): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const file = createReadStream(
      path.join(__dirname, "..", "data", filename),
      "utf-8"
    );

    const parser = parse({
      columns: (header: string[]) =>
        header.map((column: string) => column.trim()),
      skip_empty_lines: true,
    });
    const records: any[] = [];

    parser.on("readable", function () {
      let record;
      while ((record = parser.read()) !== null) {
        // Check for 'id' key and cast its value to a number
        // I would like to do this in a more generic way.
        // Perhaps the type from the schema somehow but I'm running way over time.
        if (record.hasOwnProperty("id")) {
          record.id = parseInt(record.id, 10);
        }
        records.push(record);
      }
    });

    parser.on("error", function (err) {
      reject(err);
    });

    parser.on("end", function () {
      resolve(records);
    });

    file.pipe(parser);
  });
};

export { readCSV };
