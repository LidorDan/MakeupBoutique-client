import React from "react";
import Slider from "@mui/material/Slider";

import "../styles/FilterPanel.css";

const FilterPanel = ({
  selectedNatural,
  onNaturalChange,
  selectedCategories,
  onCategoryChange,
  value,
  setPriceRange,
  priceRange,
}) => {
  return (
    <div>
      <h2>Filters :</h2>

      <div className="filter_natural">
        <u>
          <p className="natural-title">IS NATURAL </p>
        </u>
        <div className="options_naturals">
          <label>
            <li>
              <input
                type="checkbox"
                onChange={(event) => onNaturalChange(event, "yes")}
                checked={selectedNatural.includes("yes")}
              />
              &nbsp;Yes
            </li>
            <li>
              <input
                type="checkbox"
                onChange={(event) => onNaturalChange(event, "no")}
                checked={selectedNatural.includes("no")}
              />
              &nbsp;No
            </li>
          </label>
        </div>
      </div>
      <div className="price-group">
        <u>
          <p className="price-title">PRICE RANGE</p>
        </u>
        <div className="price-input">
          <span className="range">
            Min : {priceRange[0]}&nbsp;₪ - Max : {priceRange[1]}&nbsp;₪
          </span>
        </div>
        <Slider
          value={value}
          valueLabelDisplay="auto"
          onChange={(event, value) => setPriceRange(value)}
          min={0}
          max={250}
        />
      </div>
      <div className="filter_category">
        <u>
          <p className="category-title">CATEGORY </p>
        </u>
        <div className="options_categories">
          <label>
            <li>
              <input
                type="checkbox"
                onChange={(event) => onCategoryChange(event, "All")}
                checked={selectedCategories.includes("All")}
              />
              &nbsp;All Products
            </li>
            <li>
              <input
                type="checkbox"
                onChange={(event) => onCategoryChange(event, "Make Up")}
                checked={selectedCategories.includes("Make Up")}
              />
              &nbsp;Make Up
            </li>
            <li>
              <input
                type="checkbox"
                onChange={(event) => onCategoryChange(event, "Skin Care")}
                checked={selectedCategories.includes("Skin Care")}
              />
              &nbsp;Skin Care
            </li>
            <li>
              <input
                type="checkbox"
                onChange={(event) => onCategoryChange(event, "Fragrance")}
                checked={selectedCategories.includes("Fragrance")}
              />
              &nbsp;Fragrance
            </li>
            <li>
              <input
                type="checkbox"
                onChange={(event) => onCategoryChange(event, "Hair")}
                checked={selectedCategories.includes("Hair")}
              />
              &nbsp;Hair
            </li>
            <li>
              <input
                type="checkbox"
                onChange={(event) => onCategoryChange(event, "Bath and Body")}
                checked={selectedCategories.includes("Bath and Body")}
              />
              &nbsp;Bath and Body
            </li>
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
