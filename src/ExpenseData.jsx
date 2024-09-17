import { Button, Stack } from "@mui/material";
import Header from "./Components/Header";
import ExpenseDataTable from "./Components/ExpenseDataTable";
import ExpenseModalForm from "./Components/ExpenseModalForm";
import { useState } from "react";

const ExpenseData = () => {
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  return (
    <Stack width={"100%"}>
      <Header />
      <Stack
        p={2}
        gap={4}
        direction={"column"}
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
      >
        <Button sx={{ ml: "auto" }} onClick={() => setExpenseModalOpen(true)}>
          Create Expense
        </Button>
        <ExpenseDataTable data={[]}/>
        <ExpenseModalForm
          open={expenseModalOpen}
          handleClose={() => {
            console.log("hello");
            setExpenseModalOpen(false);
          }}
        />
      </Stack>
    </Stack>
  );
};

export default ExpenseData;

