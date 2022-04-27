import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { addProduct, updateProduct } from "./../../actions";

import useStyles from "./styles";
const initialState = {
  image: "",
  description: "",
  gram: "",
  karat: "",
  category: "",
  price: 0,
};
const CreateEditForm = () => {
  const history = useHistory();
  const pages = ["coins", "biscuits"];
  const pageItems = [
    [1, 2, 5, 10],
    [25, 30],
  ];
  const classes = useStyles();
  const id = new URLSearchParams(useLocation().search).get("id");

  const item = useSelector((state) =>
    id ? state.products.find((p) => p._id === id) : null
  );

  const dispatch = useDispatch();
  const [product, setProduct] = React.useState(initialState);

  React.useEffect(() => {
    if (id) {
      setProduct({
        ...product,
        id: item._id,
        image: item.image,
        description: item.description,
        price: item.price,
        gram: item.gram,
        karat: item.karat,
        category: item.category,
      });
    } else {
      setProduct(initialState);
    }
  }, [id]);

  const clear = () => {
    setProduct(initialState);
  };

  //HANDLE FORM SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(product);
    if (item) dispatch(updateProduct(product, history));
    else dispatch(addProduct(product, history));
    clear();
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3}>
        <form
          className={classes.form}
          // style={{ padding: "15px", "&>*": { marginBottom: "2px" } }}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Typography variant="h3" component="h2" gutterBottom>
            {item ? "Update" : "Create"} Product
          </Typography>

          <TextField
            required
            name="image"
            variant="outlined"
            label="Image link"
            fullWidth
            value={product.image}
            style={{ marginBottom: "10px" }}
            onChange={(e) => setProduct({ ...product, image: e.target.value })}
          ></TextField>
          <TextField
            required
            name="description"
            variant="outlined"
            label="Description"
            fullWidth
            style={{ marginBottom: "10px" }}
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
          ></TextField>

          <TextField
            style={{ marginRight: "10px" }}
            type="number"
            required
            halfWidth
            name="price"
            variant="outlined"
            label="Price"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: +e.target.value })}
          ></TextField>
          <FormControl
            sx={{ m: 1, minWidth: "50%" }}
            style={{ margin: "0", marginRight: "10px", marginBottom: "10px" }}
          >
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={product.category}
              label="Category"
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
            >
              <MenuItem value="coins">coins</MenuItem>
              <MenuItem value="biscuits">biscuits</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            sx={{ m: 1, minWidth: "48%" }}
            style={{ margin: "0", marginRight: "10px", marginBottom: "10px" }}
          >
            <InputLabel id="demo-simple-select-label">Karat</InputLabel>
            <Select
              required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={product.karat}
              label="Karat"
              onChange={(e) =>
                setProduct({ ...product, karat: e.target.value })
              }
            >
              <MenuItem value="22">22</MenuItem>
              <MenuItem value="24">24</MenuItem>
            </Select>
          </FormControl>
          {product.category && (
            <FormControl
              style={{ margin: "0", marginBottom: "10px" }}
              sx={{ m: 1, minWidth: "48%" }}
            >
              <InputLabel id="demo-simple-select-label">Grams</InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={product.gram}
                label="Grams"
                onChange={(e) =>
                  setProduct({ ...product, gram: e.target.value })
                }
              >
                {pages.indexOf(product.category) !== -1
                  ? pageItems[pages.indexOf(product.category)].map((item) => (
                      <MenuItem value={`${item}`}>{item}</MenuItem>
                    ))
                  : ""}
              </Select>
            </FormControl>
          )}
          <Button
            variant="contained"
            type="submit"
            style={{ backgroundColor: "#212529", color: "white" }}
            fullWidth
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
};
export default CreateEditForm;
