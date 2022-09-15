import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

import FavListItem from "./FavListItem";

import { TFavs, TFromToArr } from "../../Types/types";

type TFavList = {
  favs: TFavs;
  setFavs: React.Dispatch<React.SetStateAction<TFavs>>;
  removeFav: (order: number) => void;
  setFromToArr: React.Dispatch<React.SetStateAction<TFromToArr>>;
  setShowFav: React.Dispatch<React.SetStateAction<boolean>>;
};

const FavList = ({
  setFromToArr,
  removeFav,
  favs,
  setFavs,
  setShowFav,
}: TFavList) => {
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (destination.index === source.index) {
      return;
    }
    const newList = [...favs];
    const add = newList[source.index];
    newList.splice(source.index, 1);
    newList.splice(destination.index, 0, add);
    setFavs(newList);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="favList">
        {(provided, snapshot) => (
          <ul ref={provided.innerRef} {...provided.droppableProps}>
            {favs?.map((fav, ind) => (
              <FavListItem
                key={fav.filter(Boolean).join("")}
                id={fav.filter(Boolean).join("")}
                fav={fav}
                ind={ind}
                removeFav={removeFav}
                setFromToArr={setFromToArr}
                setShowFav={setShowFav}
              />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default FavList;
