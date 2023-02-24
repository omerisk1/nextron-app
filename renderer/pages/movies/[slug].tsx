import Link from "next/link";
import React from "react";
import ModalImage from "react-modal-image";
import { BACKEND_URL_FOR_IMAGE } from "../../helper";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

function MovieDetail({ movie }) {
  console.log(movie);
  return (
    <>
      <Link href="/home">
        <a
          href="#"
          className="bg-blue-900 inline-block py-2 px-4 rounded m-4 color-white hover:bg-blue-700 hover:text-gray-800 transition-all"
        >
          &#8249;
        </a>
      </Link>
      <div className="flex p-20 ">
        <div className="w-2/4 rounded-2xl">
          <ModalImage
            small={
              BACKEND_URL_FOR_IMAGE +
              movie?.attributes?.image?.data?.attributes?.url
            }
            large={
              BACKEND_URL_FOR_IMAGE +
              movie?.attributes?.image?.data?.attributes?.url
            }
            hideDownload={true}
            hideZoom={true}
            className="rounded-2xl"
          />
        </div>
        <div className="p-10 w-2/4">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold mb-5">
              {movie?.attributes?.name}
            </h1>
            <div className="w-10 h-10 bg-blue-700 flex justify-center items-center rounded-full hover:bg-blue-500 transition-all cursor-pointer">
              <ThumbUpIcon />
            </div>
          </div>
          <span className="p-2 border mt-4 rounded">
            {movie?.attributes?.ageLimit}
          </span>
          <span className="ml-3">{movie?.attributes?.date}</span>
          <p></p>
          <div className="flex">
            {movie?.attributes?.categories?.data?.length > 0 &&
              movie?.attributes?.categories?.data?.map((category) => (
                <p className="ml-3 mt-7">{category?.attributes?.name}</p>
              ))}
          </div>
          <div className="flex items-center  space-x-5 ">
            <CircularProgressbar
              className="w-20 mt-10"
              value={movie?.attributes?.score}
              text={`${movie?.attributes?.score}%`}
              strokeWidth={10}
              styles={buildStyles({
                rotation: 0.25,
                strokeLinecap: "butt",
                textSize: "20px",
                pathTransitionDuration: 0.5,
                pathColor: `rgba(62, 152, 19, ${
                  movie?.attributes?.score / 100
                })`,
                textColor: "#fff",
                trailColor: "#d6d6d6",
                backgroundColor: "#3e98c7",
              })}
            />
            <p className="text-center mt-10">
              User
              <br /> Score
            </p>
          </div>
          <p className="mt-10 font-bold text-xl">Overview</p>
          <p className="mt-3">{movie?.attributes?.description}</p>
          <p className="mt-10 font-bold text-xl">Creator</p>
          <p className="mt-1">{movie?.attributes?.creator}</p>
        </div>
      </div>
    </>
  );
}

export default MovieDetail;

/*BACKEND TARAFINDA */
export const getServerSideProps = async ({ params }) => {
  const slug = params.slug;
  const res = await fetch(
    `http://localhost:1337/api/movies?populate=deep&filters[slug][$eq]=${params.slug}`
  );
  const data = await res.json();

  return {
    props: {
      movie: data.data[0],
    },
  };
};
