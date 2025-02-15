import { Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setDisplay } from "../store/reducers/display";

export default function PaginationContainer() {
  const display = useSelector((state: RootState) => state.display);
  const dispatch = useDispatch();

  const noData = !display.isLoading && display.pages.length === 0;
  return (
    <div
      style={{
        position: "fixed",
        bottom: "4rem",
        backgroundColor: "rgb(47, 61, 69)",
        width: "fit-content",
        height: "fit-content",
        paddingInline: "1rem",
        borderRadius: "24px",
        zIndex: 99,
        border: "1px solid gray",
      }}
    >
      {!display.isLoading && !noData && (
        <div style={{ width: "100%" }}>
          <Pagination
            count={Math.ceil(display.pages.length / (display.isSmallScreen ? 1 : 2))}
            onChange={(_, value) => dispatch(setDisplay({ page: value - 1 }))}
            style={{ borderBottom: "1px solid gray" }}
          />
        </div>
      )}
    </div>
  );
}
