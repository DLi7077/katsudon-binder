import { Skeleton } from "@mui/material";
import { CSSProperties } from "react";
import { CARD_WIDTH } from "../constants";

export default function BinderSkeleton(props: {
  pageStyle: CSSProperties;
  rows: number;
  columns: number;
  noData: boolean;
  isSmallScreen: boolean;
}) {
  function Page() {
    return (
      <div style={props.pageStyle}>
        {Array(props.rows * props.columns).fill(
          <Skeleton
            variant="rectangular"
            animation={props.noData ? false : "wave"}
            width={`min(${CARD_WIDTH}px, 25vw)`}
            height={`min(${(CARD_WIDTH * 7) / 5}px, 35vw)`}
          />
        )}
      </div>
    );
  }
  return (
    <>
      <Page />
      {!props.isSmallScreen && <Page />}
    </>
  );
}
