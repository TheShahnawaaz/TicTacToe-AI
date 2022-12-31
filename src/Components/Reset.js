import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import RotateLeftRoundedIcon from "@mui/icons-material/RotateLeftRounded";

export default function Reset(props) {
  const navigate = useNavigate();
  const easy = useCallback(
    () => navigate("/easy", { replace: true }),
    [navigate]
  );
  const hard = useCallback(() => navigate("/", { replace: true }), [navigate]);
  return (
    <div>
      <RotateLeftRoundedIcon
        sx={{ fontSize: 70, alignSelf: "center", width: "100%" }}
        onClick={() => {
          if (props.difficulty === "easy") {
            hard();
            setTimeout(() => {
              easy();
            }, 50);
          } else {
            easy();
            setTimeout(() => {
              hard();
            }, 50);
          }
        }}
      />
    </div>
  );
}
