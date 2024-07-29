import React from "react";
import { menu_list } from "../../assets/assets";
import "./ExploreMenu.css";

const ExploreMenu = ({ activeCategory, setActiveCategory }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore Menu</h1>
      <div className="explore-menu-list">
        {menu_list.map((eachMenu, index) => (
          <div
            key={index}
            className={`explore-menu-items ${
              activeCategory === eachMenu.menu_name ? "active" : ""
            }`}
            onClick={() =>
              setActiveCategory((prev) =>
                prev === eachMenu.menu_name ? "All" : eachMenu.menu_name
              )
            }
          >
            <img
              src={eachMenu.menu_image}
              className="explore-menu-images"
              alt={eachMenu.menu_name}
            />
            <p>{eachMenu.menu_name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
