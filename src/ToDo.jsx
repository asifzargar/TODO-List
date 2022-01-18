import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import { ListItem } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import "./ToDo.css";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Typography from "@material-ui/core/Typography";

let Items = { fruit: "", index: -1 };
const ToDo = () => {
  const [data, setData] = useState(Items);
  const [list, setList] = useState([]);
  return (
    <>
      <div className="todo">
        <Typography
          variant="h3"
          style={{ marginInline: "70px", color: "white" }}
        >
          TO-DO List
        </Typography>
        <Paper
          style={{
            width: "400px",
            height: "500px",
            justifyContent: "center",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <TextField
              label="Add Item.."
              name="fruit"
              type="text"
              variant="filled"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              style={{ width: "300px", backgroundColor: "#ffffff" }}
            />
            <IconButton
              onClick={() => {
                if (data.index === -1) {
                  let dataIndex = list.length;
                  setList([...list, { ...data, index: dataIndex }]);
                  setData(Items);
                } else {
                  let itemList = [...list].map((n, index) => {
                    if (n.index === data.index) {
                      return data;
                    } else {
                      return n;
                    }
                  });
                  setList(itemList);
                  setData(Items);
                }
              }}
            >
              <AddCircleOutlineIcon
                style={{ width: "40px", height: "40px", color: "black" }}
              />
            </IconButton>

            <div
              style={{
                overflowY: "scroll",
                height: "400px",
                backgroundColor: " #c0c0a5",
              }}
            >
              {list.map((data, i) => {
                return (
                  <>
                    <div className="list">
                      <List>
                        <ListItem>
                          <ListItemText primary={data.name} />
                          <ListItemSecondaryAction>
                            <IconButton
                              onClick={() => {
                                var item = [...list];
                                item.splice(i, 1);
                                setList(item);
                              }}
                            >
                              <DeleteIcon style={{ color: "black" }} />
                            </IconButton>
                            <IconButton
                              onClick={() => {
                                setData({ ...data, i: i });
                              }}
                            >
                              <EditIcon style={{ color: "black" }} />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      </List>
                    </div>
                    <Divider />
                  </>
                );
              })}
            </div>
          </div>
        </Paper>
      </div>
    </>
  );
};

export default ToDo;
