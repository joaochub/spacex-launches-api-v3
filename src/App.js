import { useEffect, useRef, useState } from "react";
import appStyles from "./App.module.css";
import ListItems from "./components/ListItems/ListItems";
import useLaunchesSearch from "./useLaunchesSearch";
import useOnScreen from "./useOnScreen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import DropDownList from "./components/DropDownList/DropDownList";
import DateRangePicker from "./components/DateRangePicker/DateRangePicker";

function App() {
  const [queryLaunches, setQueryLaunches] = useState("");
  const [querySuccessParam, setQuerySuccessParam] = useState("");
  const [queryDateParam, setQueryDateParam] = useState("");
  const [offset, setOffset] = useState(0);
  const loadingRef = useRef();
  const onScreen = useOnScreen(loadingRef, "0px", 0);
  const showLimit = 4;
  const [isWindowHigher, setIsWindowHigher] = useState(false);

  const pastUpcomingFilterOptions = [
    {
      value: "",
      text: "All launches",
    },
    {
      value: "upcoming",
      text: "Upcoming",
    },
    {
      value: "past",
      text: "Past",
    },
  ];

  const successFilterOptions = [
    {
      value: "",
      text: "Mission Success",
    },
    {
      value: "launch_success=true",
      text: "Succeeded",
    },
    {
      value: "launch_success=false",
      text: "Unsucceeded",
    },
  ];

  const startDateFilterOptions = {
    id: "start",
    label: "After",
  };

  const endDateFilterOptions = {
    id: "end",
    label: "Before",
  };

  const { launches, hasMore, loading, error } = useLaunchesSearch(
    queryLaunches,
    offset,
    showLimit,
    querySuccessParam,
    queryDateParam
  );

  const showMoreItems = () => {
    setOffset((prevOffsetNumber) => prevOffsetNumber + showLimit);
  };

  useEffect(() => {
    setIsWindowHigher(false);
    if (loading) return;
    const checkWindow = () => {
      if (
        window.innerHeight === document.documentElement.scrollHeight &&
        onScreen &&
        hasMore
      ) {
        setIsWindowHigher(true);
      }
    };
    checkWindow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    if (loading) return;
    if (onScreen && hasMore) {
      showMoreItems();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onScreen, hasMore]);

  return (
    <div className={appStyles.container}>
      <header>
        <div className={appStyles.heading_container}>
          <h1 className={appStyles.heading}>
            SpaceX <span>launches</span>
          </h1>
          <p className={appStyles.version}>API V3</p>
        </div>
        <div className={appStyles.filters_container}>
          <div className={appStyles.dropdown_container}>
            <DropDownList
              setValue={setQueryLaunches}
              setOffset={setOffset}
              options={pastUpcomingFilterOptions}
            />
            <DropDownList
              setValue={setQuerySuccessParam}
              setOffset={setOffset}
              options={successFilterOptions}
            />
          </div>
          <DateRangePicker
            setValue={setQueryDateParam}
            setOffset={setOffset}
            startOptions={startDateFilterOptions}
            endOptions={endDateFilterOptions}
          />
        </div>
      </header>
      <ListItems data={launches} />
      {isWindowHigher && (
        <div className={appStyles.show_more_container}>
          <button className={appStyles.show_more} onClick={showMoreItems}>
            Show more
          </button>
        </div>
      )}
      <div ref={loadingRef}></div>
      {loading && (
        <div className={appStyles.status_container}>
          <FontAwesomeIcon
            className={appStyles.spinner}
            icon={faSpinner}
            size="2x"
            spin
          />
        </div>
      )}
      {error && (
        <div className={appStyles.status_container}>Error fetching data!</div>
      )}
    </div>
  );
}

export default App;
