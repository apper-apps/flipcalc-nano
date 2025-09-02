import React from "react";
import Card from "@/components/atoms/Card";
import MetricCard from "@/components/molecules/MetricCard";
import ApperIcon from "@/components/ApperIcon";
import Empty from "@/components/ui/Empty";

const ResultsDashboard = ({ analysis, property }) => {
  if (!property.purchasePrice || !property.arv) {
    return (
      <Card className="p-6">
        <Empty 
          title="Ready to Calculate"
          message="Enter purchase price and ARV to see your deal analysis"
          icon="BarChart3"
        />
      </Card>
    );
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0
    }).format(amount || 0);
  };

  const formatPercentage = (percentage) => {
    return `${(percentage || 0).toFixed(1)}%`;
  };

const getRuleStatus = () => {
    const maxOfferPrice = (property.arv * 0.70) - property.repairCosts;
    if (property.purchasePrice <= maxOfferPrice) {
      return { status: "good", color: "success", text: "Good to Go" };
    } else {
      return { status: "bad", color: "error", text: "No Go" };
    }
  };

  const rule = getRuleStatus();

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="bg-gradient-to-br from-success/10 to-green-600/20 p-3 rounded-lg mr-4">
              <ApperIcon name="BarChart3" size={24} className="text-success" />
            </div>
            <div>
              <h2 className="text-xl font-display font-semibold text-gray-900">Deal Analysis</h2>
              <p className="text-sm text-gray-600">Real-time profitability metrics</p>
            </div>
          </div>
<div className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${
            rule.color === "success" ? "from-success/20 to-green-600/20 text-success" :
            "from-error/20 to-red-600/20 text-error"
          }`}>
            {rule.text}
          </div>
        </div>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <MetricCard
            title="Max Offer Price"
            value={formatCurrency((property.arv * 0.70) - property.repairCosts)}
            icon="Calculator"
            color="primary"
          />
          
          <MetricCard
            title="Your Offer"
            value={formatCurrency(property.purchasePrice)}
            icon="DollarSign"
            color={property.purchasePrice <= ((property.arv * 0.70) - property.repairCosts) ? "success" : "error"}
          />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Purchase + Repairs</span>
              <ApperIcon name="Calculator" size={16} className="text-gray-400" />
            </div>
            <p className="text-lg font-bold text-gray-900 mt-1">
              {formatCurrency(property.purchasePrice + property.repairCosts)}
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">70% of ARV</span>
              <ApperIcon name="Target" size={16} className="text-gray-400" />
            </div>
            <p className="text-lg font-bold text-gray-900 mt-1">
              {formatCurrency(property.arv * 0.7)}
            </p>
          </div>
          
<div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">70% Rule Compliance</span>
              <ApperIcon name="Shield" size={16} className="text-gray-400" />
            </div>
            <p className="text-lg font-bold text-gray-900 mt-1">
              {property.purchasePrice <= ((property.arv * 0.70) - property.repairCosts) ? "✓ Compliant" : "✗ Non-Compliant"}
            </p>
</div>
        </div>
      </Card>

      {analysis && analysis.selectedLender && (
        <Card className="p-6">
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-br from-warning/10 to-orange-600/20 p-3 rounded-lg mr-4">
              <ApperIcon name="CreditCard" size={24} className="text-warning" />
            </div>
            <div>
              <h2 className="text-xl font-display font-semibold text-gray-900">Financing Costs</h2>
              <p className="text-sm text-gray-600">Total cost over {property.holdingPeriod || 6} months</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MetricCard
              title="Monthly Payment"
              value={formatCurrency(analysis.selectedLender.monthlyPayment)}
              icon="Calendar"
              color="warning"
              subtitle={`For ${property.holdingPeriod || 6} months`}
            />
            
            <MetricCard
              title="Total Loan Cost"
              value={formatCurrency(analysis.selectedLender.totalCost)}
              icon="DollarSign"
              color="error"
              subtitle="Points + Monthly Payments + Fees"
            />
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Points Cost</span>
                <ApperIcon name="Percent" size={16} className="text-gray-400" />
              </div>
              <p className="text-lg font-bold text-gray-900 mt-1">
                {formatCurrency(analysis.selectedLender.pointsCost)}
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Total Monthly Payments</span>
                <ApperIcon name="Calculator" size={16} className="text-gray-400" />
              </div>
              <p className="text-lg font-bold text-gray-900 mt-1">
                {formatCurrency(analysis.selectedLender.totalMonthlyPayments)}
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Underwriting Fees</span>
                <ApperIcon name="FileText" size={16} className="text-gray-400" />
              </div>
              <p className="text-lg font-bold text-gray-900 mt-1">
                {formatCurrency(analysis.selectedLender.underwritingFees)}
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ResultsDashboard;