import React from "react";
import { FaTv } from "react-icons/fa";

function Feature() {
  return (
    <div className="card card-bordered flex flex-col gap-4 rounded-xl bg-slate-50 px-8 py-12 min-h-[300px] text-slate-900">
      <FaTv className="text-4xl bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-4 text-white" />
      <h2 className="text-2xl font-bold">Feature Title</h2>
      <p className="text-lg">Feature Description</p>
    </div>
  );
}

export default Feature;
