import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="bg-gradient-to-br from-error/10 to-error/20 rounded-full p-6 mb-6">
        <ApperIcon name="AlertTriangle" size={48} className="text-error" />
      </div>
      <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
        Calculation Error
      </h3>
      <p className="text-gray-600 mb-6 max-w-md">
        {message}. Please check your inputs and try again.
      </p>
      {onRetry && (
        <Button onClick={onRetry} className="bg-gradient-to-r from-primary to-secondary">
          <ApperIcon name="RefreshCw" size={16} className="mr-2" />
          Try Again
        </Button>
      )}
    </div>
  );
};

export default Error;