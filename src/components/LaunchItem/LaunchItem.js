import React, { useEffect, useState } from "react";
import LabelText from "../LabelText/LabelText";
import launchItemStyles from "./LaunchItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFavorites,
  addToFavorites,
  removeFromFavorites,
} from "../../slices/favoritesSlice";

function Item({ launch }) {
  const {
    flight_number,
    mission_name,
    launch_year,
    launch_success,
    rocket,
    links,
  } = launch;

  const favorites = useSelector(selectFavorites);
  const [favorite, setFavorite] = useState(false);
  const dispatch = useDispatch();

  const addFavorite = () => {
    const favoriteLaunch = {
      id: mission_name,
    };

    dispatch(addToFavorites(favoriteLaunch));
  };

  const removeFavorite = () => {
    dispatch(removeFromFavorites({ mission_name }));
  };

  const favoriteHandler = () => {
    !favorite ? addFavorite() : removeFavorite();
    setFavorite(!favorite);
  };

  useEffect(() => {
    favorites.forEach((fav) => {
      if (fav.id === mission_name) {
        setFavorite(true);
      }
    });
  }, [favorites, mission_name]);

  return (
    <div className={launchItemStyles.launch_item}>
      {links?.mission_patch_small ? (
        <a href={links?.article_link}>
          <div className={launchItemStyles.launch_image_container}>
            <img
              className={launchItemStyles.launch_image}
              loading="lazy"
              src={links?.mission_patch_small}
              alt=""
            />
          </div>
        </a>
      ) : (
        <a href={links?.article_link}>
          <div className={launchItemStyles.launch_image_container}>
            <p className={launchItemStyles.launch_image}>No image available</p>
          </div>
        </a>
      )}
      <div className={launchItemStyles.info_container}>
        <div className={launchItemStyles.top_info_container}>
          <LabelText
            label="Mission"
            text={mission_name}
            textStyles={{ fontSize: "1.5rem", fontWeight: "bold" }}
          />
          <LabelText label="Year" text={launch_year} />
        </div>
        <div className={launchItemStyles.bottom_labels}>
          <LabelText label="Flight Number" text={flight_number} />
          <LabelText label="Rocket Name" text={rocket?.rocket_name} />
          <LabelText
            label="Launch"
            text={
              launch_success
                ? "Success"
                : launch_success === false
                ? "Failed"
                : "Unknown"
            }
            textStyles={{
              color: `${
                launch_success
                  ? "green"
                  : launch_success === false
                  ? "red"
                  : "gray"
              }`,
              fontWeight: "bold",
            }}
          />
        </div>
      </div>
      <FontAwesomeIcon
        className={`${launchItemStyles.star} ${
          favorite && launchItemStyles.full_star
        }`}
        icon={favorite ? fasStar : farStar}
        size="lg"
        onClick={favoriteHandler}
      />
    </div>
  );
}

export default Item;
