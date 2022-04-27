import React from "react";
import { Button, Grid, TextField } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";

//import { Commerce } from "../../lib/commerce";
const AddressForm = ({ next }) => {
  const { register, handleSubmit } = useForm();

  return (
    <FormProvider>
      <form onSubmit={handleSubmit((data) => next(data))}>
        <Grid
          container
          spacing={3}
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "10px",
            alignItems: "center",

            justifyContent: "center",
            margin: "0 auto",
          }}
        >
          <TextField
            {...register("firstname")}
            required
            label="First name"
            fullWidth
            style={{ marginBottom: "10px" }}
          />
          <TextField
            {...register("lastname")}
            required
            label="Last name"
            fullWidth
            style={{ marginBottom: "10px" }}
          />
          <TextField
            {...register("email")}
            required
            label="Email"
            fullWidth
            style={{ marginBottom: "10px" }}
          />
          <TextField
            {...register("address1")}
            required
            label="Address"
            fullWidth
            style={{ marginBottom: "10px" }}
          />
          <TextField
            {...register("city")}
            style={{ marginBottom: "10px" }}
            required
            label="City"
            fullWidth
          />
          <TextField
            {...register("zip")}
            style={{ marginBottom: "10px" }}
            required
            label="Zip"
            fullWidth
          />
        </Grid>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined">back</Button>
          <Button type="submit" variant="contained">
            next
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default AddressForm;
