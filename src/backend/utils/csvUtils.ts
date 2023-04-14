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
