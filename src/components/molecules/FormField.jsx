import React from "react";
import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";

const FormField = ({ 
  label, 
  value, 
  onChange, 
  type = "text", 
  placeholder,
  prefix,
  suffix,
  icon,
  error,
  ...props 
}) => {
  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <ApperIcon name={icon} size={18} className="text-gray-400" />
          </div>
        )}
        {prefix && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 text-sm font-medium">{prefix}</span>
          </div>
        )}
        <Input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            ${icon ? "pl-10" : ""}
            ${prefix ? "pl-8" : ""}
            ${suffix ? "pr-12" : ""}
            ${error ? "border-error focus:ring-error" : ""}
          `}
          {...props}
        />
        {suffix && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500 text-sm font-medium">{suffix}</span>
          </div>
        )}
      </div>
      {error && (
        <p className="text-error text-xs mt-1">{error}</p>
      )}
    </div>
  );
};

export default FormField;