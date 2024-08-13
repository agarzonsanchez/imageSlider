import { useEffect, useState } from "react";
import "./index.css";

export default function ImageSlider({ url, limit, page }) {
  const [loading, setLoading] = useState(false);
  const [dataItem, setDataItem] = useState([]);
  const [counter, setCounter] = useState(0);

  async function getImageData() {
    setLoading(true);
    try {
      const response = await fetch(`${url}?page=${page}&limit=${limit}`);
      const data = await response.json();
      //   console.log(data);
      setDataItem(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  function incrementDecrementHandler(e) {
    if (e.target.name === "increment") {
      counter < 9 ? setCounter(counter + 1) : setCounter(0);
    } else {
      e.target.name === "decrement" && counter > 0
        ? setCounter(counter - 1)
        : setCounter(9);
    }
  }

  function handlerNumericButtons(index) {
    setCounter(index);
  }

  useEffect(() => {
    getImageData();
  }, []);

  if (loading) {
    return <h1>Loading</h1>;
  }
  return (
    <div className="full-container">
      <div className="container-image">
        <div>
          <button
            className="image-slider-button"
            onClick={incrementDecrementHandler}
            name="decrement"
          >
            &lt;
          </button>
        </div>
        <div>
          {dataItem && 0 < dataItem.length
            ? dataItem.map((item, index) =>
                index === counter ? (
                  <div key={item.id} className="image-style">
                    <img
                      src={item.download_url}
                      alt={item.id}
                      style={{ width: "300px" }}
                    />
                    <div>
                      <p className="description-author">
                        Author: {item.author}
                      </p>
                    </div>
                  </div>
                ) : null
              )
            : null}
        </div>

        <div>
          <button
            className="image-slider-button"
            onClick={incrementDecrementHandler}
            name="increment"
          >
            &gt;
          </button>
        </div>
      </div>

      <div>
        {dataItem && dataItem.length > 0
          ? dataItem.map((item, index) => (
              <button
                className="numeric-buttons"
                key={index}
                onClick={() => handlerNumericButtons(index)}
              >
                {index + 1}
              </button>
            ))
          : null}
      </div>
    </div>
  );
}
