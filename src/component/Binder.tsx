/* eslint-disable @typescript-eslint/no-unused-vars */
import { Modal } from "@mui/material";
import { CSSProperties, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setDisplay } from "../store/reducers/display";
import BinderPage from "./BinderPage";
import BinderSkeleton from "./BinderSkeleton";
import FilterContainer from "./FilterContainer";
import PaginationContainer from "./PaginationContainer";
import PokemonCardSpotlight from "./PokemonCardSpotlight";

const classes: Record<string, CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    gap: "1rem",
  },
  widePageContainer: {
    display: "flex",
    boxSizing: "border-box",
    border: "1px solid gray",
    width: "fit-content",
    justifyContent: "center",
    flexWrap: "wrap",
  },
};

export default function Binder() {
  const display = useSelector((state: RootState) => state.display);
  const dispatch = useDispatch();

  // responsiveness
  const [openModel, setOpenModel] = useState<boolean>(false);

  const pageStyle: CSSProperties = {
    display: "grid",
    gridTemplateRows: `repeat(${display.rows},1fr)`,
    gridTemplateColumns: `repeat(${display.columns},1fr)`,
    gap: "1rem",
    padding: "1rem",
    paddingInline: "2rem",
    backgroundColor: "rgb(56, 69, 77)",
  };

  useEffect(() => {
    // update window size on change
    window.addEventListener("resize", () => dispatch(setDisplay({ isSmallScreen: window.innerWidth < 1111 })));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function changeSpotlightPokemon(spotlightPokemon: Pokemon): void {
    dispatch(setDisplay({ spotlightPokemon }));
    setOpenModel(true);
  }

  const handleModelClose = () => setOpenModel(false);

  const noData = !display.isLoading && display.pages.length === 0;
  const pagesOnScreen = display.isSmallScreen ? 1 : 2;
  return (
    <>
      <div style={classes.container}>
        <FilterContainer />
        <PaginationContainer />
        <div>{noData && <span>No cards found</span>}</div>
        <div style={classes.widePageContainer}>
          {(display.isLoading || display.pages.length === 0) && (
            <BinderSkeleton
              pageStyle={pageStyle}
              rows={display.rows}
              columns={display.columns}
              noData={noData}
              isSmallScreen={display.isSmallScreen}
            />
          )}
          {!display.isLoading &&
            display.pages
              .slice(display.page * pagesOnScreen, display.page * pagesOnScreen + pagesOnScreen)
              .map((page) => (
                <BinderPage
                  pageStyle={pageStyle}
                  binderPage={{ page, x: display.rows, y: display.columns }}
                  changeSpotlightPokemon={changeSpotlightPokemon}
                />
              ))}
        </div>
      </div>
      {display.spotlightPokemon && (
        <Modal
          open={openModel}
          onClose={handleModelClose}
          style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <PokemonCardSpotlight {...display.spotlightPokemon} />
        </Modal>
      )}
    </>
  );
}
