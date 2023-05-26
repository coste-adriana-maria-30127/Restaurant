// import React, { useState } from "react";
// import { AsyncPaginate } from "react-select-async-paginate";
// import { GEO_API_URL, geoApiOptions } from "../../../api";

// interface Props {
//   onSearchChange: () => void;
// }

// const Search = ({ onSearchChange }: Props) => {
//   console.log(typeof onSearchChange);
//   const [search, setSearch] = useState(null);
//   const loadOptions = (inputValue) => {
//     console.log("AAAAAAAAAAAAAAAAAA", inputValue);
//     return fetch(
//       `${GEO_API_URL}/cities?minPopulation=1000000&namePreix=${inputValue}`,
//       geoApiOptions
//     )
//       .then((response) => response.json())
//       .then((response) => console.log(response))
//       .then((response) => {
//         return {
//           options: response.data.map((city) => {
//             return {
//               value: `${city.latitude} ${city.longitude}`,
//               label: `${city.name},${city.countryCode}`,
//             };
//           }),
//         };
//       })
//       .catch((err) => console.log(err));
//   };
//   console.log(loadOptions);

//   const handleOnChange = (searchData) => {
//     setSearch(searchData);
//     onSearchChange(searchData);
//   };

//   return (
//     <AsyncPaginate
//       placeholder="Search for city"
//       debounceTimeout={600}
//       value={search}
//       onChange={handleOnChange}
//       loadOptions={loadOptions}
//     />
//   );
// };

// export default Search;
import React, { useState } from "react";
// import { Autocomplete } from "@react-google-maps/api";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

const Search = () => {
  return (
    <div className="main-header-right-div">
      <Box display="flex">
        <Typography variant="h6" className="title">
          Explor new places
        </Typography>
        {/* <Autocomplete> */}
        <div className="search">
          <div className="searchIcon">
            <SearchIcon />
          </div>
          <InputBase placeholder="Search ..." />
        </div>
        {/* </Autocomplete> */}
      </Box>
    </div>
  );
};

export default Search;
