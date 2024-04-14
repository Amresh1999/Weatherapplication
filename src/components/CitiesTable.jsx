import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import '../styles/style.css';

const sortData = (data, sortConfig) => {
  if (!sortConfig || !sortConfig.key) return data;
  const sortedData = [...data];
  sortedData.sort((a, b) => {
    if (a.fields[sortConfig.key] < b.fields[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a.fields[sortConfig.key] > b.fields[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });
  return sortedData;
};

const CitiesTable = () => {
  const [cities, setCities] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [sortConfig, setSortConfig] = useState(null);

  useEffect(() => {
    if (query === "") {
      setCities([]);
      setPage(1);
      setHasMore(true);
    }
  }, [query]);

  useEffect(() => {
    const fetchCities = async () => {
      const start = (page - 1) * 20;
      const response = await axios.get(
        `https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&q=${encodeURIComponent(
          query
        )}&rows=20&start=${start}`
      );

      if (response.data.records.length > 0) {
        const newCities =
          page === 1
            ? response.data.records
            : [...cities, ...response.data.records];
        setCities(sortData(newCities, sortConfig));
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    };

    fetchCities();
  }, [page, query, sortConfig]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setPage(1);
    setHasMore(true);
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="background">
      <div class="search-container">
        <h3>Type here to search your city</h3>
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search cities..."
          className="search-box"
        />
      </div>

      <InfiniteScroll
        dataLength={cities.length}
        next={() => setPage((prevPage) => prevPage + 1)}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <table className="table">
          <thead>
            <tr>
              <th onClick={() => handleSort("name")}>City Name</th>
              <th onClick={() => handleSort("country")}>Country</th>
              <th onClick={() => handleSort("timezone")}>Timezone</th>
            </tr>
          </thead>
          <tbody>
            {cities.map((city) => (
              <tr key={city.recordid}>
                <td>
                  <Link
                    to={`/weather/${city.fields.name}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    {city.fields.name}
                  </Link>
                </td>
                <td>{city.fields.timezone}</td>
                <td>{city.fields.timezone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </InfiniteScroll>
    </div>
  );
};

export default CitiesTable;
