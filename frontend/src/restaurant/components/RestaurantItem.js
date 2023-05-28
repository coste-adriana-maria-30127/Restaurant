import React from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Button from "../../shared/components/FormElements/Button";
import "./RestaurantItem.css";
import Card from "../../shared/components/UIElements/Card";

const RestaurantItem = (props) => {
  console.log(props.id);
  return (
    <li>
      <Card elevation={6}>
        <CardContent>
          <Typography gutterBoottom variant="h6">
            {props.name}
          </Typography>
          <Typography gutterBoottom variant="body2">
            {props.schedule}
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1">Minim Order</Typography>
            <Typography gutterBoottom variant="subtitle1">
              {props.minimumOrder}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1">
              Standard Delivery Maximum Distance
            </Typography>
            <Typography gutterBoottom variant="subtitle1">
              {props.standardDeliveryMaximumDistance}
            </Typography>
          </Box>
        </CardContent>
        <div className="user-item__actions">
          <Button to={`/order/${props.id}`}>ORDER</Button>
        </div>
      </Card>
    </li>
  );
};

export default RestaurantItem;
