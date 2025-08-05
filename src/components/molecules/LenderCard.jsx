import React from "react";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const LenderCard = ({ 
  title, 
  type, 
  terms, 
  isSelected, 
  onSelect,
  totalCost,
  monthlyPayment
}) => {
  return (
    <Card className={`p-6 transition-all duration-200 ${isSelected ? "ring-2 ring-primary shadow-lg" : ""}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-display font-semibold text-lg text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600 capitalize">{type} Money Lender</p>
        </div>
        <div className={`p-2 rounded-lg ${type === "hard" ? "bg-gradient-to-br from-warning/10 to-orange-600/20 text-warning" : "bg-gradient-to-br from-info/10 to-blue-600/20 text-info"}`}>
          <ApperIcon name={type === "hard" ? "Zap" : "Users"} size={20} />
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Interest Rate</span>
          <span className="font-medium">{terms.interestRate}%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Points</span>
          <span className="font-medium">{terms.points}%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Term</span>
          <span className="font-medium">{terms.term} months</span>
        </div>
        {type === "hard" && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">LTV Ratio</span>
            <span className="font-medium">{terms.loanToValue}%</span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Loan Amount</span>
          <span className="font-medium">${terms.loanAmount?.toLocaleString()}</span>
        </div>
      </div>

      <div className="border-t pt-4 space-y-2 mb-6">
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Monthly Payment</span>
          <span className="font-bold text-lg">${monthlyPayment?.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-700">Total Cost</span>
          <span className="font-bold text-lg text-primary">${totalCost?.toLocaleString()}</span>
        </div>
      </div>

      <Button 
        variant={isSelected ? "success" : "outline"}
        onClick={onSelect}
        className="w-full"
      >
        {isSelected ? (
          <>
            <ApperIcon name="Check" size={16} className="mr-2" />
            Selected
          </>
        ) : (
          "Select This Option"
        )}
      </Button>
    </Card>
  );
};

export default LenderCard;