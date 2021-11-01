import { useEffect, useState } from "react";

function useLaunchesSearch(
  queryString = "",
  offsetNumber = 0,
  limitNumber = 4,
  querySuccessParam = "",
  queryDateParam = ""
) {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLaunches([]);
    setHasMore(false);
  }, [queryString, querySuccessParam, queryDateParam, queryDateParam]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    const API_URL = `https://api.spacexdata.com/v3/launches${
      queryString && "/" + queryString
    }?limit=${limitNumber}&offset=${offsetNumber}${
      querySuccessParam && "&" + querySuccessParam
    }${queryDateParam && "&" + queryDateParam}`;

    const apiOptions = {
      method: "GET",
      redirect: "follow",
      headers: {
        "Content-Type": "Aplication/json",
      },
    };

    const response = fetch(API_URL, apiOptions)
      .then((res) => res.json())
      .then((data) => {
        setLaunches((prevLaunches) => [...prevLaunches, ...data]);
        setHasMore(data.length >= limitNumber);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error", error.message);
        setError(true);
        setLoading(false);
      });

    return response;
  }, [
    queryString,
    offsetNumber,
    limitNumber,
    querySuccessParam,
    queryDateParam,
  ]);

  return { launches, hasMore, loading, error };
}

export default useLaunchesSearch;
