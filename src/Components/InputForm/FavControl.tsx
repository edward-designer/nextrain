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
              isEmptyFromToArr
                ? "text-text-inactive  cursor-default"
                : " text-button-color"
            } bg-background-form`}
            clickHandler={() => setFromToArr(["", "", ""])}
            ariaLabel="clear all inputs"
            label="Clear"
          >
            <ClearIcon />
          </Button>
        </div>
        <div className="bg-background-form">
          <Button
            customStyle={`${
              isFav(fromToArr) || isEmptyFromToArr
                ? "text-text-inactive cursor-default"
                : "text-button-color"
            }  bg-background-form`}
            clickHandler={() => {
              if (!isEmptyFromToArr) addFav(fromToArr);
            }}
            ariaLabel="add to saved routes"
            label={isFav(fromToArr) ? "Added" : "Add to Saved"}
          >
            {isFav(fromToArr) ? <BookmarkAddedIcon /> : <BookmarkAddIcon />}
          </Button>
        </div>
        <div>
          <Button
            customStyle={`${
              favs.length > 0
                ? showFav
                  ? "text-text-inactive"
                  : "text-button-color"
                : "text-background-main cursor-default"
            } bg-background-main`}
            clickHandler={() => setShowFav(!showFav)}
            ariaLabel="saved routes"
            label="Saved Routes"
          >
            <BookmarksIcon />
          </Button>
        </div>
      </div>

      <div
        className={`${
          showFav ? "max-h-[2000px]" : "max-h-0"
        } basis-full transition-all duration-1000 ease-in-out overflow-hidden`}
      >
        {showFav && (
          <FavList
            favs={favs}
            setFromToArr={setFromToArr}
            removeFav={removeFav}
            setShowFav={setShowFav}
            setFavs={setFavs}
          />
        )}
      </div>
    </>
  );
};

export default FavControl;
