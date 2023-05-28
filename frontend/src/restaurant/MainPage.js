import React, { useState, useEffect } from "react";
import { useHttpClient } from "../shared/hooks/http-hook";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../shared/components/UIElements/ErrorModal";
import RestaurantList from "../restaurant/components/RestaurantList";
import Card from "../shared/components/UIElements/Card";
import { Typography } from "@mui/material";

const MainPage = () => {
  const [loadedRestaurants, setLoadedRestaurants] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const responsData = await sendRequest(
          `http://localhost:8000/api/restaurants`
        );
        setLoadedRestaurants(responsData.restaurants);
      } catch (err) {}
    };
    fetchRestaurants();
  }, [sendRequest]);
  console.log(loadedRestaurants);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}

      <Card style={{ display: "flex" }}>
        <Typography>RESTAURANTS</Typography>
      </Card>

      {!isLoading && loadedRestaurants && (
        <RestaurantList items={loadedRestaurants} />
      )}
    </React.Fragment>
  );
};

export default MainPage;
