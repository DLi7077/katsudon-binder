import { Skeleton } from "@mui/material";
import  { CSSProperties } from "react";
import { CARD_WIDTH } from "../constants";

export default function BinderSkeleton(props: {
  pageStyle: CSSProperties;
  rows: number;
  columns: number;
  noData: boolean;
}) {
  console.log(props.noData);
  function Page() {
    return (
      <div style={props.pageStyle}>
        {Array(props.rows * props.columns).fill(
          <Skeleton
            variant="rectangular"
            animation={props.noData ? false : "wave"}
            width={CARD_WIDTH}
            height={(CARD_WIDTH * 7) / 5}
          />
        )}
      </div>
    );
  }
  return (
    <>
      <Page />
      <Page />
    </>
  );
}
