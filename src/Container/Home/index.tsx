import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { displayDialogFormAction } from "./reducer";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField } from "@mui/material";

interface AddressFields {
  street: String;
  suite: String;
  city: String;
  zipcode: String;
}

interface CompanyFields {
  name: String;
  catchPhrase: String;
  bs: string;
}

interface IFormInput {
  id: number;
  name: String;
  username: String;
  email: String;
  address: AddressFields;
  phone: String;
  website: String;
  company: CompanyFields;
}

function Home() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();

  const open = useSelector((state: any) => state.homeReducer.open);

  const handleClickOpen = () => {
    dispatch(displayDialogFormAction({ toDisplay: true }));
  };

  const handleClose = () => {
    dispatch(displayDialogFormAction({ toDisplay: false }));
  };

  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <h1>CRUD App - Tanishq Patil</h1>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button variant="outlined" onClick={handleClickOpen}>
          Open responsive dialog
        </Button>
      </div>
      <Dialog
        fullScreen={fullScreen}
        fullWidth={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              size={"small"}
              fullWidth={true}
              id="outlined-name"
              label="Name"
              {...register("name")}
            />
            <br />
            <br />
            <TextField
              fullWidth={true}
              size={"small"}
              id="outlined-name"
              label="Username"
              {...register("username")}
            />
            <br />
            <br />
            <TextField
              fullWidth={true}
              size={"small"}
              id="outlined-name"
              label="Email"
              {...register("email")}
            />
            <br />
            <br />
            <TextField
              fullWidth={true}
              size={"small"}
              id="outlined-name"
              label="Street"
              {...register("address.street")}
            />
            <br />
            <br />
            <TextField
              fullWidth={true}
              size={"small"}
              id="outlined-name"
              label="Address"
              {...register("address.suite")}
            />
            <br />
            <br />
            <input type="submit" />
            <br />
            <br />
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Home;
