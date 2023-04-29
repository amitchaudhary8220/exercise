import React, { useEffect, useState } from "react";
import axios from "axios";
import "./display.css";

const DisplayData = () => {
  const [displayData, setDisplayData] = useState([]);
  const [page, setPage] = useState(1);
  const fetchData = async () => {
    // const queryparam = `?skip=${(page - 1) * 10}&limit=10`;
    try {
      const response = await axios.get("https://www.reddit.com/r/reactjs.json");
      const data = response?.data?.data?.children;
      setDisplayData(data);
    } catch (error) {
      console.error("error is ", error);
    }
  };

  //   const onPrevButtonHandler = () => {
  //     setPage((prevData) => prevData - 1);
  //   };
  //   const onNextButtonHandler = () => {
  //     setPage((prevData) => prevData + 1);
  //   };

  useEffect(() => {
    fetchData();
  }, [page]);
  return (
    <>
      <div>
        {displayData.length > 0 &&
          displayData.map((item, index) => (
            <ul key={index}>
              <li>
                <h3>Title</h3> - {item?.data?.title}
              </li>
              <li>
                <h3>SelfText_HTML</h3> -
                <div
                  dangerouslySetInnerHTML={{
                    __html: `${item?.data?.selftext_html}`,
                  }}
                />
              </li>
              <li>
                <h3>url &nbsp; </h3>{" "}
                <a href={`${item?.data?.url}`} target="_blank">
                  {" "}
                  Redirect to Url{" "}
                </a>
              </li>
              <li>
                <h3>Score </h3> - {item?.data?.score}
              </li>
            </ul>
          ))}
      </div>
      {/* <div>
        <button onClick={onPrevButtonHandler}>prev</button>
        <button onClick={onNextButtonHandler}>Next</button>
      </div> */}
    </>
  );
};

export default DisplayData;
