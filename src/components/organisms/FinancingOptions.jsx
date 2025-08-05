import React from "react";
import Card from "@/components/atoms/Card";
import FormField from "@/components/molecules/FormField";
import LenderCard from "@/components/molecules/LenderCard";
import ApperIcon from "@/components/ApperIcon";

const FinancingOptions = ({ 
  hardMoneyTerms, 
  privateMoneyTerms, 
  onHardMoneyChange, 
  onPrivateMoneyChange,
  selectedLender,
  onLenderSelect,
  property
}) => {
  const calculateHardMoneyMetrics = () => {
    const loanAmount = Math.min(
      (property.purchasePrice + property.repairCosts) * (hardMoneyTerms.loanToValue / 100),
      property.purchasePrice + property.repairCosts
    );
    
    const monthlyRate = hardMoneyTerms.interestRate / 100 / 12;
    const monthlyPayment = loanAmount * monthlyRate;
    const pointsCost = loanAmount * (hardMoneyTerms.points / 100);
    const totalInterest = monthlyPayment * (property.holdingPeriod || 6);
    const totalCost = pointsCost + totalInterest;

    return {
      loanAmount,
      monthlyPayment,
      totalCost,
      pointsCost
    };
  };

  const calculatePrivateMoneyMetrics = () => {
    const loanAmount = privateMoneyTerms.loanAmount || 0;
    const monthlyRate = privateMoneyTerms.interestRate / 100 / 12;
    const monthlyPayment = loanAmount * monthlyRate;
    const pointsCost = loanAmount * (privateMoneyTerms.points / 100);
    const totalInterest = monthlyPayment * (property.holdingPeriod || 6);
    const totalCost = pointsCost + totalInterest;

    return {
      loanAmount,
      monthlyPayment,
      totalCost,
      pointsCost
    };
  };

  const hardMoneyMetrics = calculateHardMoneyMetrics();
  const privateMoneyMetrics = calculatePrivateMoneyMetrics();

  const handleHardMoneyChange = (field, value) => {
    const updatedTerms = {
      ...hardMoneyTerms,
      [field]: value
    };

    if (field === "loanToValue" || field === "interestRate" || field === "points") {
      const loanAmount = Math.min(
        (property.purchasePrice + property.repairCosts) * (updatedTerms.loanToValue / 100),
        property.purchasePrice + property.repairCosts
      );
      updatedTerms.loanAmount = loanAmount;
      
      const monthlyRate = updatedTerms.interestRate / 100 / 12;
      updatedTerms.monthlyPayment = loanAmount * monthlyRate;
    }

    onHardMoneyChange(updatedTerms);
  };

  const handlePrivateMoneyChange = (field, value) => {
    const updatedTerms = {
      ...privateMoneyTerms,
      [field]: value
    };

    if (field === "loanAmount" || field === "interestRate") {
      const monthlyRate = updatedTerms.interestRate / 100 / 12;
      updatedTerms.monthlyPayment = updatedTerms.loanAmount * monthlyRate;
    }

    onPrivateMoneyChange(updatedTerms);
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Hard Money Lender */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-lg text-gray-900 flex items-center">
              <ApperIcon name="Zap" size={20} className="text-warning mr-2" />
              Hard Money Lender
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="LTV Ratio"
                type="number"
                value={hardMoneyTerms.loanToValue || ""}
                onChange={(e) => handleHardMoneyChange("loanToValue", parseFloat(e.target.value) || 0)}
                suffix="%"
                placeholder="70"
              />
              
              <FormField
                label="Interest Rate"
                type="number"
                step="0.1"
                value={hardMoneyTerms.interestRate || ""}
                onChange={(e) => handleHardMoneyChange("interestRate", parseFloat(e.target.value) || 0)}
                suffix="% APR"
                placeholder="12.0"
              />
              
              <FormField
                label="Points"
                type="number"
                step="0.1"
                value={hardMoneyTerms.points || ""}
                onChange={(e) => handleHardMoneyChange("points", parseFloat(e.target.value) || 0)}
                suffix="%"
                placeholder="2.0"
              />
              
              <FormField
                label="Term"
                type="number"
                value={hardMoneyTerms.term || ""}
                onChange={(e) => handleHardMoneyChange("term", parseInt(e.target.value) || 0)}
                suffix="months"
                placeholder="12"
              />
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Loan Amount</span>
                  <span className="font-medium">${hardMoneyMetrics.loanAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Points Cost</span>
                  <span className="font-medium">${hardMoneyMetrics.pointsCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Payment</span>
                  <span className="font-medium">${hardMoneyMetrics.monthlyPayment.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Private Money Lender */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-lg text-gray-900 flex items-center">
              <ApperIcon name="Users" size={20} className="text-info mr-2" />
              Private Money Lender
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Loan Amount"
                type="number"
                value={privateMoneyTerms.loanAmount || ""}
                onChange={(e) => handlePrivateMoneyChange("loanAmount", parseFloat(e.target.value) || 0)}
                prefix="$"
                placeholder="0"
              />
              
              <FormField
                label="Interest Rate"
                type="number"
                step="0.1"
                value={privateMoneyTerms.interestRate || ""}
                onChange={(e) => handlePrivateMoneyChange("interestRate", parseFloat(e.target.value) || 0)}
                suffix="% APR"
                placeholder="8.0"
              />
              
              <FormField
                label="Points"
                type="number"
                step="0.1"
                value={privateMoneyTerms.points || ""}
                onChange={(e) => handlePrivateMoneyChange("points", parseFloat(e.target.value) || 0)}
                suffix="%"
                placeholder="1.0"
              />
              
              <FormField
                label="Term"
                type="number"
                value={privateMoneyTerms.term || ""}
                onChange={(e) => handlePrivateMoneyChange("term", parseInt(e.target.value) || 0)}
                suffix="months"
                placeholder="24"
              />
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Loan Amount</span>
                  <span className="font-medium">${privateMoneyMetrics.loanAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Points Cost</span>
                  <span className="font-medium">${privateMoneyMetrics.pointsCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Payment</span>
                  <span className="font-medium">${privateMoneyMetrics.monthlyPayment.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LenderCard
            title="Hard Money Option"
            type="hard"
            terms={{
              ...hardMoneyTerms,
              loanAmount: hardMoneyMetrics.loanAmount
            }}
            totalCost={hardMoneyMetrics.totalCost}
            monthlyPayment={hardMoneyMetrics.monthlyPayment}
            isSelected={selectedLender === "hard"}
            onSelect={() => onLenderSelect("hard")}
          />
          
          <LenderCard
            title="Private Money Option"
            type="private"
            terms={privateMoneyTerms}
            totalCost={privateMoneyMetrics.totalCost}
            monthlyPayment={privateMoneyMetrics.monthlyPayment}
            isSelected={selectedLender === "private"}
            onSelect={() => onLenderSelect("private")}
          />
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