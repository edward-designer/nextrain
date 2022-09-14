import { useEffect, useState } from "react";

import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import ClearIcon from "@mui/icons-material/Clear";

import useFavourite from "../../Hooks/useFavourite";

import FavList from "../FavList";
import Button from "../Common/Button";

import { TFromToArr } from "../../Types/types";

type TFavControl = {
  fromToArr: TFromToArr;
  setFromToArr: React.Dispatch<React.SetStateAction<TFromToArr>>;
};
const FavControl = ({ fromToArr, setFromToArr }: TFavControl) => {
  const { favs, setFavs, addFav, removeFav, isFav } = useFavourite();
  const [showFav, setShowFav] = useState(false);
  const isEmptyFromToArr = fromToArr.filter(Boolean).length === 0;
  useEffect(() => {
    favs.length === 0 && setShowFav(false);
  }, [favs]);
  useEffect(() => {
    isEmptyFromToArr && favs.length !== 0 && setShowFav(true);
  }, [isEmptyFromToArr, favs]);
  return (
    <>
      <div className="flex flex-col bg-background-main">
        <div className="bg-background-form">
          <Button
            customStyle={`${
              isEmptyFromToArr ? "text-background-main" : " text-text-inactive"
            } bg-background-form`}
            clickHandler={() => setFromToArr(["", "", ""])}
            ariaLabel="clear all inputs"
          >
            <ClearIcon />
          </Button>
        </div>
        <div className="bg-background-form">
          <Button
            customStyle={`${
              isFav(fromToArr)
                ? "text-button-color  cursor-default"
                : "text-text-inactive"
            }  ${isEmptyFromToArr ? "cursor-default" : ""} bg-background-form`}
            clickHandler={() => {
              if (!isEmptyFromToArr) addFav(fromToArr);
            }}
            ariaLabel="add to saved routes"
          >
            {isFav(fromToArr) ? <BookmarkAddedIcon /> : <BookmarkAddIcon />}
          </Button>
        </div>
        <div>
          <Button
            customStyle={`${
              favs.length > 0
                ? showFav
                  ? "text-button-color"
                  : "text-text-inactive"
                : "text-background-main cursor-default"
            } bg-background-main`}
            clickHandler={() => setShowFav(!showFav)}
            ariaLabel="saved routes"
          >
            <BookmarksIcon />
          </Button>
        </div>
      </div>
      {showFav && (
        <FavList
          favs={favs}
          setFromToArr={setFromToArr}
          removeFav={removeFav}
          setShowFav={setShowFav}
          setFavs={setFavs}
        />
      )}
    </>
  );
};

export default FavControl;
