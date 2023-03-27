import React, { useState } from "react";
import Drawer from "react-modern-drawer";
import { useDispatch, useSelector } from "react-redux";
import { deleteFavorite } from "../redux/features/counter/counterSlice";
import { ToastContainer, toast } from "react-toastify";

export default function FavoriList() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  const favoriList = useSelector((state) => state.counter.value);
  const notify = () => toast.info("Film Favorilerden Çıkarıldı");
  const handleCLick = (item) => {
    dispatch(deleteFavorite(item));
    notify();
  };

  return (
    <>
      <button
        onClick={toggleDrawer}
        className="m-10 bg-blue-600 p-2 rounded hover:bg-blue-400 transition-all"
        style={{ color: "black" }}
      >
        My Favorite List
      </button>
      {/* <a href="/otherList">
        <button
          className="m-10 bg-blue-600 p-2 rounded hover:bg-blue-400 transition-all"
          style={{ color: "black" }}
        >
          Other List
        </button>
      </a> */}
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="right"
        style={{ backgroundColor: "#022a5e", padding: "20px 10px" }}
      >
        {favoriList?.length > 0 ? (
          favoriList.map((item, index) => {
            return (
              <div
                key={index}
                className="flex justify-between p-2 mb-1"
                style={{ backgroundColor: "#0b70a8" }}
              >
                <p>{item}</p>
                <button
                  onClick={() => {
                    handleCLick(item);
                  }}
                >
                  X
                </button>
              </div>
            );
          })
        ) : (
          <div className="flex justify-center mt-10">Favori List Empty</div>
        )}
      </Drawer>
    </>
  );
}
