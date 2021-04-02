import React, { Fragment, useState } from "react";

import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Done as DoneIcon,
} from "@material-ui/icons";

import { Fab } from "@material-ui/core";

const FloatingActions = ({
  onClick,
  onSave,
  resetFields,
  edit = false,
  isAdd = false,
}) => {
  const [state, setState] = useState(null);

  return !isAdd ? (
    <Fragment>
      <Fab
        style={{
          position: "fixed",
          bottom: "40px",
          right: "40px",
          zIndex: "1000",
        }}
        onClick={
          edit
            ? () => {
                onClick[0]();
                setState(onClick[1]);
              }
            : () => {
                onClick[0]();
                resetFields(state);
              }
        }
        color="primary"
      >
        {!edit ? <CancelIcon /> : <EditIcon />}
      </Fab>
      {!edit ? (
        <Fab
          style={{
            position: "fixed",
            bottom: "40px",
            right: "128px",
            zIndex: "1000",
          }}
          onClick={() => {
            onSave();
            onClick[0]();
          }}
          color="secondary"
        >
          <SaveIcon />
        </Fab>
      ) : null}
    </Fragment>
  ) : (
    <Fab
      style={{
        position: "fixed",
        bottom: "40px",
        right: "40px",
        zIndex: "1000",
      }}
      onClick={onClick}
      color="primary"
    >
      <DoneIcon />
    </Fab>
  );
};

export default FloatingActions;
