import React, { useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import SurpriseGift from "../../components/SupriseGift/SurpriseGift";

const Home = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  return (
    <div>
      <Header />
      <ExploreMenu
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <FoodDisplay activeCategory={activeCategory} />
      <SurpriseGift />
    </div>
  );
};

export default Home;
