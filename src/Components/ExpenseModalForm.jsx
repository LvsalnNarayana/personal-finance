/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  Divider,
  FormControlLabel,
  IconButton,
  Select,
  Stack,
  TextField,
  Typography,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import { supabase } from "../Utils/SupabaseClient";

const ExpenseModalForm = ({ open, handleClose }) => {
  const [date, setDate] = useState(moment());
  const [transactionName, setTransactionName] = useState("");
  const [transactionDescription, setTransactionDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("");
  const [transactionCategory, setTransactionCategory] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [toAccount, setToAccount] = useState("");

  const [transactionNameError, setTransactionNameError] = useState(false);
  const [transactionDescriptionError, setTransactionDescriptionError] =
    useState(false);
  const [transactionAmountError, setTransactionAmountError] = useState(false);
  const [transactionStatusError, setTransactionStatusError] = useState(false);
  const [bankAccountError, setBankAccountError] = useState(false);
  const [toAccountError, setToAccountError] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleTransactionNameChange = (event) => {
    setTransactionName(event.target.value);
    setTransactionNameError(false);
  };

  const handleTransactionDescriptionChange = (event) => {
    setTransactionDescription(event.target.value);
    setTransactionDescriptionError(false);
  };

  const handleTransactionAmountChange = (event) => {
    const value = event.target.value;
    const regex = /^\d{1,4}(\.\d{0,2})?$/;
    if (regex.test(value) || value === "") {
      setTransactionAmount(value);
      setTransactionAmountError(false);
    } else {
      setTransactionAmountError(true);
    }
  };

  const handleSubmit = async () => {
    if (transactionName.trim() === "") {
      setTransactionNameError(true);
    }
    if (transactionDescription.trim() === "") {
      setTransactionDescriptionError(true);
    }
    if (transactionAmount.trim() === "") {
      setTransactionAmountError(true);
    }
    if (transactionStatus.trim() === "") {
      setTransactionStatusError(true);
    }
    if (bankAccount.trim() === "") {
      setBankAccountError(true);
    }
    if (toAccount.trim() === "") {
      setToAccountError(true);
    }

    if (
      transactionName &&
      transactionDescription &&
      transactionAmount &&
      transactionStatus &&
      bankAccount &&
      toAccount
    ) {
      console.log("Transaction data:", {
        transactionName,
        transactionDescription,
        transactionAmount,
        transactionStatus,
        bankAccount,
        toAccount,
      });

      const { data, error } = await supabase
        .from("expenses")
        .insert([
          {
            created_at: date,
            description: transactionDescription,
            amount: transactionAmount,
            bank_name: bankAccount,
            transaction_status: transactionStatus,
            transaction_category: transactionCategory,
            to: toAccount,
            transaction_name: transactionName,
          },
        ])
        .select();
      console.log(data);
    }
  };

  return (
    <Dialog
      open={open}
      onAbort={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          p: 2,
          borderRadius: 2,
          width: isMobile ? "95%" : "500px",
          maxWidth: "500px",
          height: "fit-content",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        },
      }}
    >
      <Stack
        width={"100%"}
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="body1" fontSize={16} fontWeight={500}>
          Create Expense
        </Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Stack>
      <Divider sx={{ my: 1, width: "100%" }} />
      <Stack
        gap={isMobile ? 2 : 1.5}
        width={"100%"}
        sx={{
          overflowY: "auto",
          height: "fit-content",
          maxHeight: isMobile ? "95vh" : "80vh",
        }}
      >
        <FormControlLabel
          required
          sx={{ mx: 0, gap: 1, width: "100%", alignItems: "flex-start" }}
          id="transaction-name-label"
          labelPlacement="top"
          label={
            <Typography variant="body1" component={"span"} fontSize={14}>
              Transaction Date
            </Typography>
          }
          control={
            <DatePicker
              format="DD MMMM, YYYY"
              onChange={(newDateValue) => {
                setDate(newDateValue);
              }}
              defaultValue={date}
              sx={{ width: "100%", ".MuiInputBase-input": { py: 1 } }}
            />
          }
        />
        <FormControlLabel
          required
          sx={{ mx: 0, gap: 1, width: "100%", alignItems: "flex-start" }}
          id="transaction-name-label"
          labelPlacement="top"
          label={
            <Typography variant="body1" component={"span"} fontSize={14}>
              Transaction Name
            </Typography>
          }
          control={
            <TextField
              error={transactionNameError}
              helperText={
                transactionNameError && "Transaction name is required"
              }
              fullWidth
              size="small"
              id="transaction-name-input"
              name="transaction-name-input"
              value={transactionName}
              onChange={handleTransactionNameChange}
              placeholder="Enter your transaction name"
            />
          }
        />
        <FormControlLabel
          required
          sx={{ mx: 0, gap: 1, width: "100%", alignItems: "flex-start" }}
          id="transaction-description-label"
          labelPlacement="top"
          label={
            <Typography variant="body1" component={"span"} fontSize={14}>
              Transaction Description
            </Typography>
          }
          control={
            <TextField
              error={transactionDescriptionError}
              helperText={
                transactionDescriptionError &&
                "Transaction description is required"
              }
              fullWidth
              size="small"
              id="transaction-description-input"
              name="transaction-description-input"
              value={transactionDescription}
              onChange={handleTransactionDescriptionChange}
              placeholder="Enter your transaction description"
            />
          }
        />
        <FormControlLabel
          required
          sx={{ mx: 0, gap: 1, width: "100%", alignItems: "flex-start" }}
          id="transaction-amount-label"
          labelPlacement="top"
          label={
            <Typography variant="body1" component={"span"} fontSize={14}>
              Transaction Amount
            </Typography>
          }
          control={
            <TextField
              error={transactionAmountError}
              helperText={
                transactionAmountError && "Transaction amount is required"
              }
              fullWidth
              size="small"
              id="transaction-amount-input"
              name="transaction-amount-input"
              value={transactionAmount}
              onChange={handleTransactionAmountChange}
              placeholder="Enter amount (e.g., 0000.00)"
            />
          }
        />
        <FormControlLabel
          required
          sx={{ mx: 0, gap: 1, width: "100%", alignItems: "flex-start" }}
          id="transaction-category-label"
          labelPlacement="top"
          label={
            <Typography variant="body1" component={"span"} fontSize={14}>
              Transaction Category
            </Typography>
          }
          control={
            <Select
              fullWidth
              size="small"
              value={transactionCategory}
              onChange={(e) => {
                setTransactionCategory(e.target.value);
                setTransactionStatusError(false);
              }}
              displayEmpty
            >
              <MenuItem value={""} disabled>
                <Typography variant="body1" sx={{ fontSize: 14 }}>
                  Select transaction category
                </Typography>
              </MenuItem>
              <MenuItem value={"other"}>
                <Stack
                  gap={1}
                  direction={"row"}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "100%",
                      backgroundColor: "orange",
                    }}
                  />
                  <Typography variant="body1" fontSize={14}>
                    Other
                  </Typography>
                </Stack>
              </MenuItem>
              <MenuItem value={"pending"}>
                <Stack
                  gap={1}
                  direction={"row"}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "100%",
                      backgroundColor: "orange",
                    }}
                  />
                  <Typography variant="body1" fontSize={14}>
                    Pending
                  </Typography>
                </Stack>
              </MenuItem>
              <MenuItem value={"debited"}>
                <Stack
                  gap={1}
                  direction={"row"}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "100%",
                      backgroundColor: "red",
                    }}
                  />
                  <Typography variant="body1" fontSize={14}>
                    Debited
                  </Typography>
                </Stack>
              </MenuItem>
              <MenuItem value={"credited"}>
                <Stack
                  gap={1}
                  direction={"row"}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "100%",
                      backgroundColor: "green",
                    }}
                  />
                  <Typography variant="body1" fontSize={14}>
                    Credited
                  </Typography>
                </Stack>
              </MenuItem>
            </Select>
          }
        />
        {transactionStatusError && (
          <Typography color="error" fontSize={12}>
            Transaction status is required
          </Typography>
        )}
        <FormControlLabel
          required
          sx={{ mx: 0, gap: 1, width: "100%", alignItems: "flex-start" }}
          id="transaction-status-label"
          labelPlacement="top"
          label={
            <Typography variant="body1" component={"span"} fontSize={14}>
              Transaction Status
            </Typography>
          }
          control={
            <Select
              fullWidth
              size="small"
              value={transactionStatus}
              onChange={(e) => {
                setTransactionStatus(e.target.value);
                setTransactionStatusError(false);
              }}
              displayEmpty
            >
              <MenuItem value={""} disabled>
                <Typography variant="body1" sx={{ fontSize: 14 }}>
                  Select transaction status
                </Typography>
              </MenuItem>
              <MenuItem value={"pending"}>
                <Stack
                  gap={1}
                  direction={"row"}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "100%",
                      backgroundColor: "orange",
                    }}
                  />
                  <Typography variant="body1" fontSize={14}>
                    Pending
                  </Typography>
                </Stack>
              </MenuItem>
              <MenuItem value={"debited"}>
                <Stack
                  gap={1}
                  direction={"row"}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "100%",
                      backgroundColor: "red",
                    }}
                  />
                  <Typography variant="body1" fontSize={14}>
                    Debited
                  </Typography>
                </Stack>
              </MenuItem>
              <MenuItem value={"credited"}>
                <Stack
                  gap={1}
                  direction={"row"}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "100%",
                      backgroundColor: "green",
                    }}
                  />
                  <Typography variant="body1" fontSize={14}>
                    Credited
                  </Typography>
                </Stack>
              </MenuItem>
            </Select>
          }
        />
        {transactionStatusError && (
          <Typography color="error" fontSize={12}>
            Transaction status is required
          </Typography>
        )}
        <FormControlLabel
          required
          sx={{ mx: 0, gap: 1, width: "100%", alignItems: "flex-start" }}
          id="transaction-bank-account-label"
          labelPlacement="top"
          label={
            <Typography variant="body1" component={"span"} fontSize={14}>
              Bank Account
            </Typography>
          }
          control={
            <Select
              fullWidth
              size="small"
              value={bankAccount}
              onChange={(e) => {
                setBankAccount(e.target.value);
                setBankAccountError(false);
              }}
              displayEmpty
            >
              <MenuItem value={""} disabled>
                <Typography variant="body1" sx={{ fontSize: 14 }}>
                  Select transaction status
                </Typography>
              </MenuItem>
              <MenuItem value={"Monzo"}>
                <Typography
                  sx={{
                    fontSize: 14,
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="/monzo.png"
                    alt="monzo"
                    width={40}
                    style={{ marginRight: 5, maxWidth: "100%" }}
                  />
                  Monzo
                </Typography>
              </MenuItem>
              <MenuItem value={"Revoult"} sx={{ fontSize: 14 }}>
                <Typography
                  sx={{
                    fontSize: 14,
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="/revoult.png"
                    alt="revoult"
                    width={40}
                    style={{ marginRight: 5, maxWidth: "100%" }}
                  />
                  Revoult
                </Typography>
              </MenuItem>
              <MenuItem value={"Lloyds"} sx={{ fontSize: 14 }}>
                <Typography
                  sx={{
                    fontSize: 14,
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="/lloyds.png"
                    alt="lloyds"
                    width={40}
                    style={{ marginRight: 5, maxWidth: "100%" }}
                  />
                  Lloyds
                </Typography>
              </MenuItem>
              <MenuItem value={"Capital One"} sx={{ fontSize: 14 }}>
                <Typography
                  sx={{
                    fontSize: 14,
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="/capital.png"
                    alt="capital one"
                    width={40}
                    style={{ marginRight: 5, maxWidth: "100%" }}
                  />
                  Capital One
                </Typography>
              </MenuItem>
            </Select>
          }
        />
        {bankAccountError && (
          <Typography color="error" fontSize={12}>
            Bank account is required
          </Typography>
        )}
        <FormControlLabel
          required
          sx={{ mx: 0, gap: 1, width: "100%", alignItems: "flex-start" }}
          id="transaction-to-account-label"
          labelPlacement="top"
          label={
            <Typography variant="body1" component={"span"} fontSize={14}>
              To
            </Typography>
          }
          control={
            <Select
              fullWidth
              size="small"
              value={toAccount}
              onChange={(e) => {
                setToAccount(e.target.value);
                setToAccountError(false);
              }}
              displayEmpty
              renderValue={(selected) => (
                <Typography variant="body1" fontSize={14}>
                  {selected}
                </Typography>
              )}
            >
              <MenuItem value={""} disabled sx={{ fontSize: 14 }}>
                Select recipient account
              </MenuItem>
              <MenuItem value={"Kaundinya"} sx={{ fontSize: 14 }}>
                Kaundinya
              </MenuItem>
              <MenuItem value={"Shruthi"} sx={{ fontSize: 14 }}>
                Shruthi
              </MenuItem>
              <MenuItem value={"Other"} sx={{ fontSize: 14 }}>
                Other
              </MenuItem>
            </Select>
          }
        />
        {toAccountError && (
          <Typography color="error" fontSize={12}>
            Recipient account is required
          </Typography>
        )}
      </Stack>
      <Button onClick={handleSubmit} sx={{ mt: 2, width: "fit-content" }}>
        Submit
      </Button>
    </Dialog>
  );
};

export default ExpenseModalForm;

