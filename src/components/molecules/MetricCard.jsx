import React from "react";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const MetricCard = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend,
  color = "primary",
  size = "default"
}) => {
  const colorClasses = {
    primary: "text-primary bg-gradient-to-br from-primary/10 to-secondary/20",
    success: "text-success bg-gradient-to-br from-success/10 to-green-600/20",
    warning: "text-warning bg-gradient-to-br from-warning/10 to-orange-600/20",
    error: "text-error bg-gradient-to-br from-error/10 to-red-600/20"
  };

  const sizeClasses = {
    small: "p-4",
    default: "p-6",
    large: "p-8"
  };

  return (
    <Card hover className={sizeClasses[size]}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className={`text-2xl font-bold font-display number-animate ${color === "primary" ? "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent" : colorClasses[color].split(" ")[0]}`}>
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            <ApperIcon name={icon} size={24} />
          </div>
        )}
      </div>
      {trend && (
        <div className="mt-4 flex items-center text-xs">
          <ApperIcon 
            name={trend > 0 ? "TrendingUp" : "TrendingDown"} 
            size={14} 
            className={trend > 0 ? "text-success mr-1" : "text-error mr-1"} 
          />
          <span className={trend > 0 ? "text-success" : "text-error"}>
            {Math.abs(trend)}%
          </span>
          <span className="text-gray-500 ml-1">vs expected</span>
        </div>
      )}
    </Card>
  );
};

export default MetricCard;