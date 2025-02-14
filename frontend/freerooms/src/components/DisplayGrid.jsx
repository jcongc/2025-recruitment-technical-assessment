import { useMediaQuery } from "@mui/material";
import buildings from "../../../data.json";
import Card from "./Card";
import MobileCard from "./MobileCard";

const DisplayGrid = () => {
  const isMobile = useMediaQuery("(min-width:600px)");
  return (
    <div className="grid">
      {buildings.map((building) =>
        isMobile ? (
          <Card building={building} key={building.id} />
        ) : (
          <MobileCard building={building} key={building.id} />
        )
      )}
    </div>
  );
};

export default DisplayGrid;
