import React from "react";

import RestaurantItem from "./RestaurantItem";
import Card from "../../shared/components/UIElements/Card";
import "./RestaurantList.css";

const RestaurantList = (props) => {
  console.log(props);
  if (props.items.lenght === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No restaurants found!</h2>
        </Card>
      </div>
    );
  }
  console.log(props.items);
  return (
    <ul className="users-list">
      {props.items.map((restaurant) => (
        <RestaurantItem
          key={restaurant.id}
          id={restaurant.id}
          name={restaurant.name}
          schedule={restaurant.name}
          minimumOrder={restaurant.minimumOrder}
          standardDeliveryMaximumDistance={
            restaurant.standardDeliveryMaximumDistance
          }
        />
      ))}
    </ul>
  );
};

export default RestaurantList;
