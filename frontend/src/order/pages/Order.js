import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import OrderList from "../components/OrderList";

const Order = () => {
  const [loadedRestaurant, setLoadedRestaurant] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const restaurantId = useParams().rid;
  console.log(restaurantId);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const responsData = await sendRequest(
          `http://localhost:8000/api/restaurants/${restaurantId}`
        );
        setLoadedRestaurant(responsData.restaurant);
      } catch (err) {}
    };
    fetchRestaurant();
  }, [sendRequest]);
  console.log(loadedRestaurant);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}

      {!isLoading && loadedRestaurant && <OrderList items={loadedRestaurant} />}
    </React.Fragment>
  );
};

export default Order;
