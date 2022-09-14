import { useState, useEffect } from "react";

import { TFromToArr, TFavs } from "../Types/types";

export default function useFavourite() {
  let savedFav = [];
  const getFromLocalStorage = window.localStorage.getItem("favouriteRoutes");
  if (getFromLocalStorage) savedFav = JSON.parse(getFromLocalStorage);
  const [favs, setFavs] = useState<TFavs>(savedFav);

  const addFav = (newRoute: TFromToArr) => {
    if (!isFav(newRoute)) setFavs([newRoute, ...favs]);
  };

  const removeFav = (order: number) => {
    setFavs(favs.filter((_fav, ind) => ind !== order));
  };

  const isFav = (route: TFromToArr): boolean =>
    favs.some((fav) => JSON.stringify(fav) === JSON.stringify(route));

  useEffect(
    () => window.localStorage.setItem("favouriteRoutes", JSON.stringify(favs)),
    [favs]
  );

  return { favs, addFav, removeFav, isFav };
}
