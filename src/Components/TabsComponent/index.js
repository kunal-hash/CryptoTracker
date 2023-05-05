import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { createTheme } from "@mui/material";
import Grid from "../Grid";
import './style.css';
import List from "../List";



export default function TabsComponent({coins}) {
  const [value, setValue] = React.useState("Grid");

  const style = {
    color: "var(--white)",
    width: "50vw",
     fontSize: "1.2rem",
     fontWeight: 600 ,
     fontFamily: "Inter",
  }

  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            variant="fullWidth">
            <Tab label="Grid" value="Grid" sx={style} />
            <Tab label="List" value="List" sx={style} />
          </TabList>
        </Box>
        <TabPanel value="Grid">
          <div className="grid-flex">
            {coins.map((coin, i) => {
              return <Grid coin={coin} key={i} />;
            })}
          </div>
        </TabPanel>
        <TabPanel value="List">
          
            {coins.map((item, i) => {
              return <List coin={item} key={i}></List>
            })}
          
        </TabPanel>
      </TabContext>
    </Box>
  );
}
