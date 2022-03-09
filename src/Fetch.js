import { useEffect, useState } from "react";
import { Blob } from "react-blob";

export const Fetch = () => {
  let url =
    "https://raw.githubusercontent.com/Ninjaondra321/pro-biology-sources/master/hymz-nedokonala-premena/3.png";

  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        return res.blob();
      })
      .then((imageBlob) => {
        const imageObjectURL = URL.createObjectURL(imageBlob);
        console.log(imageObjectURL);
        setFetchedData(imageObjectURL);
      });
  }, []);

  return (
    <div>
      <h1>CusBusAutobus</h1>
      <img  src={fetchedData} alt="obrazek nebo tak něco "  width="120px" height="120px" />
    </div>
  );
};
