import { Patient } from "../../graphql/resolvers";

const comparePatients = (
  a: Patient,
  b: Patient,
  orderBy: string,
  orderDirection: "asc" | "desc"
) => {
  const fieldA = a[orderBy as keyof Patient];
  const fieldB = b[orderBy as keyof Patient];

  if (fieldA < fieldB) {
    return orderDirection === "asc" ? -1 : 1;
  }
  if (fieldA > fieldB) {
    return orderDirection === "asc" ? 1 : -1;
  }
  return 0;
};

export { comparePatients };
