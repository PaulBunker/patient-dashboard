import { gql } from "graphql-tag";
import { readFileSync } from "fs";
import path from "path";

const schemaPath = path.join(__dirname, "..", "graphql", "schema.graphql");
const typeDefs = gql(readFileSync(schemaPath, "utf-8"));

export { typeDefs };
