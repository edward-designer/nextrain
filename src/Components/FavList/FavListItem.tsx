import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import Button from "../Common/Button";

import { TFromToArr } from "../../Types/types";

type TFavListItem = {
  ind: number;
  fav: TFromToArr;
  removeFav: (order: number) => void;
  setFromToArr: React.Dispatch<React.SetStateAction<TFromToArr>>;
  setShowFav: React.Dispatch<React.SetStateAction<boolean>>;
};
const FavListItem = ({
  fav,
  ind,
  setFromToArr,
  setShowFav,
  removeFav,
}: TFavListItem) => {
  return (
    <li key={fav.join("")} className="flex items-center border-b pl-2">
      <span
        tabIndex={0}
        className="flex-1 no-underline font-bold hover:text-button-color cursor-pointer"
        onClick={() => {
          setFromToArr(fav);
          setShowFav(false);
        }}
      >
        {fav.filter(Boolean).join(" → ")}
      </span>
      <Button
        customStyle="text-text-inactive hover:text-button-color bg-background-main"
        clickHandler={() => removeFav(ind)}
        ariaLabel="delete saved route"
      >
        <DeleteOutlineIcon />
      </Button>
    </li>
  );
};

export default FavListItem;
