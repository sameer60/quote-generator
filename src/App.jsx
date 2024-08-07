/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  const copyToClipboard = () => {
    const textToCopy = `${quote}, ${author}`;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        toast.success("Copied to clipboard");
      })
      .catch((error) => {
        console.error("Error copying text to clipboard:", error);
      });
  };

  const handleClick = () => {
    fetch(
      "https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en"
    )
      .then((response) => response.json())
      .then((data) => {
        setQuote(data.quoteText);
        setAuthor(data.quoteAuthor);
      })
      .catch((error) => console.error("Error fetching quote:", error));
  };

  useEffect(() => {
    handleClick();
  }, []);

  return (
    <>
      <section className="flex flex-col min-h-screen w-full bg-[#eef4f6] items-center justify-center py-8 sm:py-12 lg:py-24 px-4 sm:px-6 lg:px-12 mx-auto">
        <img className="h-64 w-64" src="/motivation.svg" alt="Motivation SVG" />
        <div className="flex flex-col items-center text-center w-full mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-5xl xl:text-7xl font-bold title-font mb-4 text-[#062a40]">
            Quote Generator
          </h1>
          <p className="w-full lg:w-2/3 xl:w-1/2 mb-4 lg:text-2xl text-slate-500 leading-relaxed tracking-wide text-base">
            Throughout recorded history, the wisdom of countless brilliant minds
            ensures that you'll inevitably encounter at least one profound quote
            that offers clarity on life or ignites the spark for extraordinary
            endeavors.
          </p>
        </div>
        <div className="rounded-xl bg-[#fff] p-4 sm:p-6 lg:p-8 w-full lg:w-1/2 text-center">
          <div
            onClick={copyToClipboard}
            className="bg-[#f1f7f9] hover:bg-[#cafaf5] cursor-pointer rounded-xl p-4 sm:p-6 border-4 border-dashed border-[#2dbcaa] mb-4"
          >
            <h5 className="mb-2 text-lg sm:text-2xl font-semibold tracking-tight text-[#2dbcaa]">
              {quote}
            </h5>
            <p className="mb-3 text-sm sm:text-base text-[#2dbcaa]">
              {" "}
              - {author}
            </p>
          </div>
          <button
            onClick={handleClick}
            className="flex mx-auto font-semibold cursor-pointer text-white bg-[#2dbcaa] border-0 py-2 px-6 sm:px-8 rounded-xl text-base sm:text-lg"
          >
            Get Quote
          </button>
        </div>
        <Toaster />
      </section>
    </>
  );
}

export default App;
