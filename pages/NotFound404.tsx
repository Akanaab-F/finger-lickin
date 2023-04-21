import React from "react";
import States from "../components/States";
import { Link } from "react-router-dom";

const NotFound404 = () => {
  return (
    <section className="max-h-[70vh] h-[70vh] flex flex-col items-center justify-evenly">
      <States type="notfound" />
      <div className="flex flex-col items-center justify-between h-1/5">
        <h2 className="font-mediumFont text-2xl text-primary400">
          Sorry!, It seems you're lost.
        </h2>
        <div className="text-center text-slate-400 px-8">
          Please go back to the main page and try again!
        </div>
        <Link
          className="font-mediumFont text-lg text-primary300 hover:bg-primary300 hover:text-white transition-colors duration-200 capitalize px-4 py-1 rounded-full border border-primary300"
          to="/"
        >
          hompage
        </Link>
      </div>
    </section>
  );
};

export default NotFound404;
