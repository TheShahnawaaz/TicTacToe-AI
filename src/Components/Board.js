// import * as React from "react";
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import Button from "@mui/material/Button";

const ColorButton = styled(Button)(({ theme }) => ({
  height: "100%",
  width: "100%",

  backgroundColor: "#333232",
  // "&:hover": {
  //   backgroundColor: "#333232",
  // },
}));

export default function Board(props) {
  const [Table, setTable] = useState([
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
  ]);
  const [headi, setHeading] = useState(["Welcome! You goes first."]);
  const [dsb, setDsb] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const doStuff = () => {
    setTable([...props.board]);
    //find element by id and change its value
    document.getElementsByClassName("tit")[0].click();
    refrershDsb();
    setHeading([...props.heading]);
    document.body.style.cursor = "none";
    setTimeout(() => {
      setTable([...props.board]);
      refrershDsb();
      setHeading([...props.heading]);
      document.body.style.cursor = "default";
    }, 600);
  };

  const refrershDsb = () => {
    setTimeout(() => {
      const tempdsb = [
        !(props.board[0] === " "),
        !(props.board[1] === " "),
        !(props.board[2] === " "),
        !(props.board[3] === " "),
        !(props.board[4] === " "),
        !(props.board[5] === " "),
        !(props.board[6] === " "),
        !(props.board[7] === " "),
        !(props.board[8] === " "),
      ];

      setDsb([...tempdsb]);
    }, 50);
  };

  return (
    <div>
      <Stack
        // className="heading"
        sx={{
          width: "100%",
          p: "20px",
          justifyContent: "center",
          alignSelf: "center",
        }}
        spacing={2}
      >
        <Alert
          severity={headi[1]}
          variant="filled"
          sx={{
            width: { xs: "90vw", sm: "80vw", md: "60vw" },
            height: { xs: "40px", md: "100px" },
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
            fontSize: { xs: "13px", md: "30px" },
          }}
        >
          <div className="tit">{headi[0]}</div>
        </Alert>
      </Stack>
      {/* <h1 id="heading">{headi[0]}</h1> */}
      <Grid container justifyContent="center" spacing={2}>
        <Grid
          // className="btn"
          item
          xs={8}
          sx={{ height: { xs: "65vw", md: "34vw" } }}
          md={4}
          container
          spacing={2}
          // height="34vw"
          direction="column"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Grid item xs={4} container spacing={2}>
            <Grid item xs={4}>
              <ColorButton
                className="btn"
                disabled={dsb[0]}
                variant="contained"
                onClick={() => {
                  props.turn(0);
                  doStuff();
                }}
              >
                <h1>{Table[0]}</h1>
              </ColorButton>
            </Grid>
            <Grid item xs={4}>
              <ColorButton
                className="btn"
                disabled={dsb[1]}
                variant="contained"
                onClick={() => {
                  props.turn(1);
                  doStuff();
                }}
              >
                <h1>{Table[1]}</h1>
              </ColorButton>
            </Grid>
            <Grid item xs={4}>
              <ColorButton
                className="btn"
                disabled={dsb[2]}
                variant="contained"
                onClick={() => {
                  props.turn(2);
                  doStuff();
                }}
              >
                <h1>{Table[2]}</h1>
              </ColorButton>
            </Grid>
          </Grid>
          <Grid item xs={4} container spacing={2}>
            <Grid item xs={4}>
              <ColorButton
                className="btn"
                disabled={dsb[3]}
                variant="contained"
                onClick={() => {
                  props.turn(3);
                  doStuff();
                }}
              >
                <h1>{Table[3]}</h1>
              </ColorButton>
            </Grid>
            <Grid item xs={4}>
              <ColorButton
                className="btn"
                disabled={dsb[4]}
                variant="contained"
                onClick={() => {
                  props.turn(4);
                  doStuff();
                }}
              >
                <h1>{Table[4]}</h1>
              </ColorButton>
            </Grid>
            <Grid item xs={4}>
              <ColorButton
                className="btn"
                disabled={dsb[5]}
                variant="contained"
                onClick={() => {
                  props.turn(5);
                  doStuff();
                }}
              >
                <h1>{Table[5]}</h1>
              </ColorButton>
            </Grid>
          </Grid>
          <Grid item xs={4} container spacing={2}>
            <Grid item xs={4}>
              <ColorButton
                className="btn"
                disabled={dsb[6]}
                variant="contained"
                onClick={() => {
                  props.turn(6);
                  doStuff();
                }}
              >
                <h1>{Table[6]}</h1>
              </ColorButton>
            </Grid>
            <Grid item xs={4}>
              <ColorButton
                className="btn"
                disabled={dsb[7]}
                variant="contained"
                onClick={() => {
                  props.turn(7);
                  doStuff();
                }}
              >
                <h1>{Table[7]}</h1>
              </ColorButton>
            </Grid>
            <Grid item xs={4}>
              <ColorButton
                className="btn"
                disabled={dsb[8]}
                variant="contained"
                onClick={() => {
                  props.turn(8);
                  doStuff();
                }}
              >
                <h1>{Table[8]}</h1>
              </ColorButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
