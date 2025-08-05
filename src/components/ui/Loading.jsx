import React from "react";

const Loading = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Property Input Section */}
        <div className="bg-surface rounded-lg p-6 shadow-lg">
          <div className="skeleton h-8 w-48 mb-6 rounded"></div>
          <div className="space-y-4">
            <div className="skeleton h-10 w-full rounded"></div>
            <div className="skeleton h-10 w-full rounded"></div>
            <div className="skeleton h-10 w-full rounded"></div>
            <div className="skeleton h-10 w-full rounded"></div>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-surface rounded-lg p-6 shadow-lg">
          <div className="skeleton h-8 w-36 mb-6 rounded"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <div className="skeleton h-6 w-20 mb-2 rounded"></div>
              <div className="skeleton h-8 w-24 rounded"></div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="skeleton h-6 w-16 mb-2 rounded"></div>
              <div className="skeleton h-8 w-20 rounded"></div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="skeleton h-6 w-24 mb-2 rounded"></div>
              <div className="skeleton h-8 w-28 rounded"></div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="skeleton h-6 w-18 mb-2 rounded"></div>
              <div className="skeleton h-8 w-22 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Financing Section */}
      <div className="bg-surface rounded-lg p-6 shadow-lg">
        <div className="skeleton h-8 w-56 mb-6 rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="skeleton h-6 w-32 rounded"></div>
            <div className="skeleton h-10 w-full rounded"></div>
            <div className="skeleton h-10 w-full rounded"></div>
            <div className="skeleton h-10 w-full rounded"></div>
          </div>
          <div className="space-y-4">
            <div className="skeleton h-6 w-36 rounded"></div>
            <div className="skeleton h-10 w-full rounded"></div>
            <div className="skeleton h-10 w-full rounded"></div>
            <div className="skeleton h-10 w-full rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;