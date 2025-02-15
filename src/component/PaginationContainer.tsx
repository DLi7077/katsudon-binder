import { Pagination, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setDisplay } from "../store/reducers/display";
import { setFilters } from "../store/reducers/filters";

export default function PaginationContainer() {
  const display = useSelector((state: RootState) => state.display);
  const filter = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch();

  const noData = !display.isLoading && display.pages.length === 0;
  return (
    <div
      style={{
        position: "fixed",
        bottom: "4rem",
        width: "fit-content",
        height: "fit-content",
        paddingInline: "1rem",
        zIndex: 99,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {!display.isLoading && !noData && (
        <div style={{ width: "100%", backgroundColor: "rgb(24, 40, 48)", borderRadius: "24px" }}>
          <Pagination
            count={Math.ceil(display.pages.length / (display.isSmallScreen ? 1 : 2))}
            onChange={(_, value) => dispatch(setDisplay({ page: value - 1 }))}
            style={{ borderBottom: "1px solid gray" }}
          />
        </div>
      )}

      <ToggleButtonGroup
        value={filter.showOwned}
        exclusive
        onChange={(_, value) => {
          dispatch(setFilters({ showOwned: value }));
        }}
        aria-label="text alignment"
      >
        {["All", "Owned", "Unowned"].map((condition) => (
          <ToggleButton value={condition}>{condition}</ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
}
