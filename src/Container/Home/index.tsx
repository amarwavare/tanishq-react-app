import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  displayDialogFormAction,
  setDataAction,
  getIdAction,
  displayUserDataDialogAction,
 } from "./reducer";
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
import { fetchUserData } from "../../Middleware/middleware";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


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

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

function Home() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();

  // const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const openInputDialog = useSelector((state: any) => state.homeReducer.openInputDialog);
  const userDataDialog = useSelector((state:any) => state.homeReducer.userDataDialog);
  const openUserDialog = useSelector((state:any) => state.homeReducer.openUserDialog);
  const selectedUserId = useSelector((state:any) => state.homeReducer.selectedUserId);
  const userData = useSelector((state:any) => state.homeReducer.userData); // Contains data fetched on mount

  useEffect(() => {
    // mounting
    fetchUserData()
    .then(data => {
      dispatch(setDataAction({userData:data?.data}));
      console.log(data?.data);
    })
    .catch(err => console.log(err)) // TODO
    
  
    return () => {
      // unmont
    }
  }, [])
  

  const handleClickOpen = () => {
    dispatch(displayDialogFormAction({ toDisplay: true }));
  };

  const handleClose = () => {
    dispatch(displayDialogFormAction({ toDisplay: false }));
    dispatch(displayUserDataDialogAction({ toDisplay: false }));
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
        open={openInputDialog}
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
      <br/>
      <hr/>
      <br/>
      <div style={{display:'grid', gridTemplateColumns: 'auto auto auto auto'}}>
      {
        userData?.map((data:any) => (
          <Card sx={{ width: 'auto', m:5 }} key={data.id}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {data.id}
            </Typography>
            <Typography variant="h5" component="div">
              {data.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {data.username} from {data.address.city}
            </Typography>
            <Typography variant="body2">
              {data.email}
              <br />
              {data.phone}
              <br />
              {data.website}
            </Typography>
          </CardContent>
          <CardActions>
            <Button 
            size="small" 
            onClick={() => {
              console.log(data.id);
              dispatch(getIdAction({id:data.id-1}));
              dispatch(displayUserDataDialogAction({toDisplay:true}));
              // setSelectedUserId(data.id-1);
              console.log(userData[selectedUserId]?.name);
              
            }}>Open</Button>
          </CardActions>
        </Card>
        ))
      }
      </div>
      <Dialog
        fullScreen={fullScreen}
        fullWidth={true}
        open={userDataDialog}
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
              value={userData[selectedUserId]?.name}
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
