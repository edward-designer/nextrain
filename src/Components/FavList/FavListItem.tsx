import React, { useRef } from "react";
import { Draggable } from "react-beautiful-dnd";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DragHandleIcon from "@mui/icons-material/DragHandle";

import Button from "../Common/Button";

import { TFromToArr } from "../../Types/types";

type TFavListItem = {
  ind: number;
  id: string;
  fav: TFromToArr;
  removeFav: (order: number) => void;
  setFromToArr: React.Dispatch<React.SetStateAction<TFromToArr>>;
  setShowFav: React.Dispatch<React.SetStateAction<boolean>>;
};

const FavListItem = ({
  fav,
  id,
  ind,
  setFromToArr,
  setShowFav,
  removeFav,
}: TFavListItem) => {
  return (
    <Draggable draggableId={id} index={ind}>
      {(provided, snapshot) => (
        <li
          className={`flex items-center border-b p-1 bg-background-main`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <DragHandleIcon className="text-text-notice-icon mr-2" />
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
      )}
    </Draggable>
  );
};

export default FavListItem;
