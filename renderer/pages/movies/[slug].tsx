import Link from "next/link";
import React from "react";
import { GetServerSideProps } from "next";

export default function MovieDetail({ movie }) {
  return (
    <>
      <Link href="/home">
        <a
          href="#"
          className="bg-blue-900 inline-block py-2 px-4 rounded m-4 color-white hover:bg-blue-700 hover:text-gray-800 transition-all "
        >
          &#8249;
        </a>
      </Link>
      <div>{movie.attributes.name}</div>
    </>
  );
}

export const getServerSideProps = async ({ params }) => {
  let movie = {};
  const res = await fetch(
    `http://localhost:1337/api/movies?populate=deep&filters[slug][$eq]=${params.slug}`
  );
  const data = await res.json();
  movie = data.data[0];

  return {
    props: {
      movie: movie,
    },
  };
};
