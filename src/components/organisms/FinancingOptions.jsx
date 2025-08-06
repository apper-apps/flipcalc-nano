import React from "react";
import Card from "@/components/atoms/Card";
import FormField from "@/components/molecules/FormField";
import LenderCard from "@/components/molecules/LenderCard";
import ApperIcon from "@/components/ApperIcon";

const FinancingOptions = ({ 
  hardMoneyLenders, 
  onHardMoneyChange, 
  selectedLender,
  onLenderSelect,
  property
}) => {
const calculateLenderMetrics = (lenderTerms) => {
    const loanAmount = Math.min(
      (property.purchasePrice + property.repairCosts) * (lenderTerms.loanToValue / 100),
      property.purchasePrice + property.repairCosts
    );
    
    const monthlyRate = lenderTerms.interestRate / 100 / 12;
    const monthlyPayment = loanAmount * monthlyRate;
    const pointsCost = loanAmount * (lenderTerms.points / 100);
    const underwritingFees = lenderTerms.underwritingFees || 0;
    const totalInterest = monthlyPayment * (property.holdingPeriod || 6);
    const totalCost = pointsCost + totalInterest + underwritingFees;

    return {
      loanAmount,
      monthlyPayment,
      totalCost,
      pointsCost,
      underwritingFees
    };
  };

  const lenderMetrics = hardMoneyLenders.map(lender => calculateLenderMetrics(lender));

const handleLenderChange = (lenderIndex, field, value) => {
    const updatedLenders = [...hardMoneyLenders];
    updatedLenders[lenderIndex] = {
      ...updatedLenders[lenderIndex],
      [field]: value
    };

    if (field === "loanToValue" || field === "interestRate" || field === "points") {
      const loanAmount = Math.min(
        (property.purchasePrice + property.repairCosts) * (updatedLenders[lenderIndex].loanToValue / 100),
        property.purchasePrice + property.repairCosts
      );
      updatedLenders[lenderIndex].loanAmount = loanAmount;
      
      const monthlyRate = updatedLenders[lenderIndex].interestRate / 100 / 12;
      updatedLenders[lenderIndex].monthlyPayment = loanAmount * monthlyRate;
    }

    onHardMoneyChange(updatedLenders);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center mb-6">
          <div className="bg-gradient-to-br from-warning/10 to-orange-600/20 p-3 rounded-lg mr-4">
            <ApperIcon name="CreditCard" size={24} className="text-warning" />
          </div>
          <div>
            <h2 className="text-xl font-display font-semibold text-gray-900">Financing Options</h2>
            <p className="text-sm text-gray-600">Configure lender terms and compare options</p>
          </div>
        </div>

<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {hardMoneyLenders.map((lender, index) => {
            const metrics = lenderMetrics[index];
            return (
              <div key={index} className="space-y-4">
                <h3 className="font-display font-semibold text-lg text-gray-900 flex items-center">
                  <ApperIcon name="Zap" size={20} className="text-warning mr-2" />
                  Hard Money Lender {index + 1}
                </h3>
                
                <FormField
                  label="Lender Name"
                  type="text"
                  value={lender.name || ""}
                  onChange={(e) => handleLenderChange(index, "name", e.target.value)}
                  placeholder={`Lender ${index + 1}`}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    label="LTV Ratio"
                    type="number"
                    value={lender.loanToValue || ""}
                    onChange={(e) => handleLenderChange(index, "loanToValue", parseFloat(e.target.value) || 0)}
                    suffix="%"
                    placeholder="70"
                  />
                  
                  <FormField
                    label="Interest Rate"
                    type="number"
                    step="0.1"
                    value={lender.interestRate || ""}
                    onChange={(e) => handleLenderChange(index, "interestRate", parseFloat(e.target.value) || 0)}
                    suffix="% APR"
                    placeholder="12.0"
                  />
                  
                  <FormField
                    label="Points"
                    type="number"
                    step="0.1"
                    value={lender.points || ""}
                    onChange={(e) => handleLenderChange(index, "points", parseFloat(e.target.value) || 0)}
                    suffix="%"
                    placeholder="2.0"
                  />
                  
                  <FormField
                    label="Term"
                    type="number"
                    value={lender.term || ""}
                    onChange={(e) => handleLenderChange(index, "term", parseInt(e.target.value) || 0)}
                    suffix="months"
                    placeholder="12"
                  />
                  
                  <FormField
                    label="Underwriting Fees"
                    type="number"
                    value={lender.underwritingFees || ""}
                    onChange={(e) => handleLenderChange(index, "underwritingFees", parseFloat(e.target.value) || 0)}
                    prefix="$"
                    placeholder="1500"
                    className="col-span-2"
                  />
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Loan Amount</span>
                      <span className="font-medium">${metrics.loanAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Points Cost</span>
                      <span className="font-medium">${metrics.pointsCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Underwriting Fees</span>
                      <span className="font-medium">${metrics.underwritingFees.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Payment</span>
                      <span className="font-medium">${metrics.monthlyPayment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-200">
                      <span className="text-gray-900 font-semibold">Total Cost</span>
                      <span className="font-bold text-primary">${metrics.totalCost.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Lender Comparison */}
      <Card className="p-6">
        <div className="flex items-center mb-6">
          <div className="bg-gradient-to-br from-primary/10 to-secondary/20 p-3 rounded-lg mr-4">
            <ApperIcon name="GitCompare" size={24} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-display font-semibold text-gray-900">Lender Comparison</h2>
            <p className="text-sm text-gray-600">Compare total costs and monthly payments</p>
          </div>
        </div>

<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {hardMoneyLenders.map((lender, index) => {
            const metrics = lenderMetrics[index];
            return (
              <LenderCard
                key={index}
                title={lender.name || `Hard Money Lender ${index + 1}`}
                type="hard"
                terms={{
                  ...lender,
                  loanAmount: metrics.loanAmount
                }}
                totalCost={metrics.totalCost}
                monthlyPayment={metrics.monthlyPayment}
                isSelected={selectedLender === index}
                onSelect={() => onLenderSelect(index)}
              />
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-success/10 to-green-600/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <ApperIcon name="Lightbulb" size={16} className="text-success mt-0.5" />
            <div className="text-sm text-gray-700">
              <p className="font-medium mb-1">Financing Strategy</p>
              <p>Hard money is typically faster but more expensive. Private money offers better rates but may require stronger relationships and longer approval times.</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FinancingOptions;