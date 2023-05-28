import React, { useEffect, useState } from "react";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import OrderItem from "../components/OrderItem";
import "./OrderList.css";

const OrderList = (props) => {
  console.log(props);
  if (props.items.lenght === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No items found!</h2>
        </Card>
      </div>
    );
  }
  console.log(props.items);
  return (
    <ul className="users-list">
      {props.items.map((item) => (
        <OrderItem
          key={item.id}
          id={item.id}
          name={item.name}
          description={item.description}
          price={item.price}
        />
      ))}
    </ul>
  );
};

export default OrderList;
