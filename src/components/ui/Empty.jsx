import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "Start Your Analysis", 
  message = "Enter property details to begin analyzing your real estate flip opportunity.",
  icon = "Calculator"
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="bg-gradient-to-br from-primary/10 to-secondary/20 rounded-full p-8 mb-6">
        <ApperIcon name={icon} size={56} className="text-primary" />
      </div>
      <h3 className="text-2xl font-display font-semibold text-gray-900 mb-3">
        {title}
      </h3>
      <p className="text-gray-600 max-w-md leading-relaxed">
        {message}
      </p>
      <div className="mt-8 flex items-center space-x-2 text-sm text-gray-500">
        <ApperIcon name="Info" size={16} />
        <span>Real-time calculations update as you type</span>
      </div>
    </div>
  );
};

export default Empty;