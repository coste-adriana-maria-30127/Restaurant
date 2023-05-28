import React, { useState, useContext } from "react";
import Button from "../../shared/components/FormElements/Button";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { Card, CardContent } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./OrderItem.css";

const OrderItem = (props) => {
  console.log(props);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <li className="place-item">
        <Card elevation={6} className="card">
          {isLoading && <LoadingSpinner />}
          <CardContent>
            <Typography gutterBoottom variant="h6">
              {props.name}
            </Typography>
            <Typography gutterBoottom variant="body2">
              {props.description}
            </Typography>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="subtitle1">Price</Typography>
              <Typography gutterBoottom variant="subtitle1">
                {props.price}
              </Typography>
            </Box>
          </CardContent>
          <Button>ADD</Button>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default OrderItem;
