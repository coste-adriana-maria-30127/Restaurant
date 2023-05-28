import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import OrderList from "../components/OrderList";
import { Card } from "@mui/material";
import Typography from "@mui/material/Typography";

const Order = () => {
  const [loadedItems, setLoadedItems] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const restaurantId = useParams().rid;
  console.log(restaurantId);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const responsData = await sendRequest(
          `http://localhost:8000/api/restaurants/${restaurantId}/items`
        );
        setLoadedItems(responsData.items);
      } catch (err) {}
    };
    fetchRestaurant();
  }, [sendRequest]);
  console.log(loadedItems);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}

      <Card style={{ display: "flex", margin: "5px" }}>
        <Typography>MENU</Typography>
      </Card>

      {!isLoading && loadedItems && <OrderList items={loadedItems} />}
      <Card></Card>
    </React.Fragment>
  );
};

export default Order;
