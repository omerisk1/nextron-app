import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Masonry from "react-masonry-css";
import { BACKEND_URL_FOR_IMAGE } from "../helper/index";

function Home({ movies }) {
  const [search, setSearch] = useState("");
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const filteredMovies = movies.filter((movie) => {
    if (search === "") {
      return movie;
    }
    return movie?.attributes?.name.toLowerCase().includes(search.toLowerCase());
  });

  const films = filteredMovies.map((movie) => {
    return (
      <div className="flex justify-center p-[20px]" key={movie?.id}>
        <Link href={`/movies/${movie?.attributes?.slug}`}>
          <Image
            src={
              BACKEND_URL_FOR_IMAGE +
              movie?.attributes?.image?.data?.attributes?.url
            }
            alt={movie?.attributes?.name}
            objectFit="cover"
            width={300}
            height={450}
            className="rounded-lg  cursor-pointer"
          />
        </Link>
      </div>
    );
  });

  return (
    <>
      <Head>
        <title>Home - Nextron (with-typescript-tailwindcss)</title>
      </Head>
      <div className="flex justify-between items-center px-10">
        <div className="text-3xl font-bold text-center text-gray-400 mt-10 mb-10">
          Trend List
        </div>
        <div className="relative">
          <span className="absolute ml-2 mt-1">&#128270;</span>
          <input
            type="text"
            className="rounded text-gray-200 px-7 py-1 outline-none bg-gray-600 w-48"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      {filteredMovies.length === 0 && (
        <div className="text-center text-2xl text-gray-400 mt-20">
          No movie found
        </div>
      )}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {films}
      </Masonry>
    </>
  );
}

export default Home;

// serverside

export const getServerSideProps: GetServerSideProps = async () => {
  const req = await fetch("http://localhost:1337/api/movies?populate=deep");
  const res = await req.json();

  return {
    props: {
      movies: res.data,
    },
  };
};
