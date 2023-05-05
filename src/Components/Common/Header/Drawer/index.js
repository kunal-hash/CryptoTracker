import * as React from "react";
import Drawer from "@mui/material/Drawer";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";

export default function TemporaryDrawer() {
    const [drawer, setDrawer] = React.useState(false);
    return (
      <div>
        <IconButton onClick={() => setDrawer(true)}>
          <MenuRoundedIcon className="link" />
        </IconButton>
        <Drawer
          anchor={"right"}
          open={drawer}
          onClose={() => {
            setDrawer(false);
          }}
        >
          <div className="drawer-div">
            <Link to="/" className="link">
              <p>Home</p>
            </Link>
            <Link to="/compare" className="link">
              <p>Compare</p>
            </Link>
            <Link to="/watchlist" className="link">
              <p>Watchlist</p>
            </Link>
            <Link to="/dashboard" className="link">
              <p>Dashboard</p>
            </Link>
          </div>
        </Drawer>
      </div>
    );
}