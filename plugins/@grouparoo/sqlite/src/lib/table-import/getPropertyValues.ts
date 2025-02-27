import { makeWhereClause } from "./util";
import { validateQuery } from "../validateQuery";
import {
  GetPropertyValuesMethod,
  DataResponse,
  AggregationMethod,
  FilterOperation,
} from "@grouparoo/app-templates/dist/source/table";

export const getPropertyValues: GetPropertyValuesMethod = async ({
  connection,
  tableName,
  columnNames,
  sortColumn,
  tablePrimaryKeyCol,
  tableMappingCol,
  matchConditions,
  isArray,
  aggregationMethod,
  primaryKeys,
}) => {
  let responses: { [key: string]: { [column: string]: DataResponse[] } } = {};
  const columnList = columnNames.map((col) => `"${col}"`).join(", ");
  const orderBys = [];
  const groupByColumns = [];
  let aggFunc = null;

  if (primaryKeys.length === 0) return responses;

  switch (aggregationMethod) {
    case AggregationMethod.Exact:
      if (sortColumn) {
        orderBys.push(`"${sortColumn}" ASC`);
      }
      break;
    case AggregationMethod.Average:
      aggFunc = `COALESCE(AVG(${columnList}), 0) as ${columnList}`;
      break;
    case AggregationMethod.Count:
      aggFunc = `COUNT(CAST(${columnList} as INT)) as ${columnList}`;
      break;
    case AggregationMethod.Sum:
      aggFunc = `COALESCE(SUM(${columnList}), 0) as ${columnList}`;
      break;
    case AggregationMethod.Min:
      aggFunc = `MIN(${columnList}) as ${columnList}`;
      break;
    case AggregationMethod.Max:
      aggFunc = `MAX(${columnList}) as ${columnList}`;
      break;
    case AggregationMethod.MostRecentValue:
      if (!sortColumn) throw new Error("Sort Column is needed");
      orderBys.push(`"${sortColumn}" DESC`);
      break;
    case AggregationMethod.LeastRecentValue:
      if (!sortColumn) throw new Error("Sort Column is needed");
      orderBys.push(`"${sortColumn}" ASC`);
      break;
    default:
      throw new Error(`${aggregationMethod} is not a known aggregation method`);
  }

  let ranked = false;
  let query = `SELECT "${tablePrimaryKeyCol}" as __pk`;

  if (aggFunc) {
    query += `, ${aggFunc}`;
    groupByColumns.push(tablePrimaryKeyCol);
  } else {
    query += `, ${columnList}`;
    if (!isArray && orderBys.length > 0) {
      // Note: windowing (ROW_NUMBER) only in SQLite >= 3.25.0 released 2018-09-15
      const order = `ORDER BY ${orderBys.join(", ")}`;
      query += `, ROW_NUMBER() OVER (PARTITION BY "${tablePrimaryKeyCol}" ${order}) AS __rownum`;
      ranked = true;
    }
  }

  query += ` FROM "${tableName}" WHERE`;

  let addAnd = false;

  for (const condition of matchConditions) {
    const filterClause = makeWhereClause(condition);
    if (addAnd) query += ` AND`;
    query += ` ${filterClause}`;
    addAnd = true;
  }

  const inClause = makeWhereClause({
    columnName: tablePrimaryKeyCol,
    filterOperation: FilterOperation.In,
    values: primaryKeys,
  });
  if (addAnd) query += ` AND`;
  query += ` ${inClause}`;
  addAnd = true;

  if (groupByColumns.length > 0) {
    query += ` GROUP BY ${groupByColumns}`;
  }
  if (!ranked && orderBys.length > 0) {
    query += ` ORDER BY ${orderBys.join(", ")}`;
  }

  if (ranked) {
    // -- Ranked example
    // SELECT * FROM
    //  (SELECT  "user_id" as __pk, "created_at",
    //              ROW_NUMBER() OVER (PARTITION BY "user_id" ORDER BY "created_at" DESC) AS __rownum
    //        FROM demo.purchases
    //        WHERE  "state" = 'successful' AND "user_id" IN ('1','2','3','4')
    //   ) AS __ranked
    // WHERE __ranked.__rownum = 1;

    query = `SELECT * FROM (${query}) AS __ranked WHERE __ranked.__rownum = 1`;
  }

  validateQuery(query);

  try {
    const rows: { [column: string]: DataResponse }[] =
      await connection.asyncQuery(query);

    for (const row of rows) {
      const pk = row.__pk.toString();
      responses[pk] ??= {};
      for (const col in row) {
        responses[pk][col] ??= [];
        if (isArray || (responses[pk][col].length === 0 && !isArray)) {
          responses[pk][col].push(row[col]);
        }
      }
    }
  } catch (error) {
    throw new Error(
      `Error with SQLite SQL Statement: Query - \`${query}\`, Error - ${error}`
    );
  }

  return responses;
};
