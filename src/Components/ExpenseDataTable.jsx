/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  createColumnHelper,
  getFilteredRowModel,
} from "@tanstack/react-table";

import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import {
  Table,
  Stack,
  TableRow,
  useTheme,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
} from "@mui/material";

import TableWrapper from "./TableWrapper";

// Create column helper
const columnHelper = createColumnHelper();

// Define columns
const columns = [
  columnHelper.accessor("id", {
    header: "Id",
    size: 100,
    enableSorting: false,
  }),
  columnHelper.accessor("date", {
    header: "Date",
    size: 120,
  }),
  columnHelper.accessor("transaction_name", {
    header: "Transaction Name",
    size: 180,
  }),
  columnHelper.accessor("description", {
    header: "Description",
  }),
  columnHelper.accessor("amount", {
    header: "Amount",
  }),
  columnHelper.accessor("bank_name", {
    header: "Bank Name",
  }),
  columnHelper.accessor("transaction_status", {
    header: "Transaction Status",
    size: 180,
  }),
  columnHelper.accessor("transaction_category", {
    header: "Transaction Category",
    size: 180,
  }),
];

const ExpenseDataTable = ({ data }) => {
  const theme = useTheme();
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

  const table = useReactTable({
    data: data || [], // Use provided data or fallback to empty array
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <TableContainer component={TableWrapper}>
      <Table size="medium" stickyHeader>
        <TableHead sx={{ top: 0, zIndex: 2, position: "sticky" }}>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell
                  key={header.id}
                  sx={{
                    py: 0,
                    px: 2,
                    fontWeight: 500,
                    userSelect: "none",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    width: header.column.getSize(),
                    maxWidth: header.column.getSize(),
                    backgroundColor: theme.palette.secondary.main,
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <span
                      style={{ fontWeight: 500, cursor: "pointer" }}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </span>
                    {header?.column?.getIsSorted() ? (
                      <>
                        {sorting?.find((sortingItem) => {
                          return sortingItem.id === header.column.id;
                        })?.desc ? (
                          <ArrowDownwardOutlinedIcon
                            fontSize="small"
                            sx={{ fontSize: "16px" }}
                          />
                        ) : (
                          <ArrowUpwardOutlinedIcon
                            fontSize="small"
                            sx={{ fontSize: "16px" }}
                          />
                        )}
                      </>
                    ) : (
                      <div style={{ width: "32px", height: "32px" }} />
                    )}
                  </Stack>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  sx={{
                    p: 1,
                    px: 2,
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    backgroundColor: "#fff",
                    textOverflow: "ellipsis",
                    width: cell.column.getSize(),
                    maxWidth: cell.column.getSize(),
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExpenseDataTable;

