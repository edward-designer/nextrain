import FavListItem from "./FavListItem";

import { TFavs, TFromToArr } from "../../Types/types";

type TFavList = {
  favs: TFavs;
  removeFav: (order: number) => void;
  setFromToArr: React.Dispatch<React.SetStateAction<TFromToArr>>;
  setShowFav: React.Dispatch<React.SetStateAction<boolean>>;
};

const FavList = ({ setFromToArr, removeFav, favs, setShowFav }: TFavList) => {
  return (
    <div className="basis-[100%] bg-background-main">
      <ul>
        {favs.map((fav, ind) => (
          <FavListItem
            fav={fav}
            ind={ind}
            removeFav={removeFav}
            setFromToArr={setFromToArr}
            setShowFav={setShowFav}
          />
        ))}
      </ul>
    </div>
  );
};

export default FavList;
