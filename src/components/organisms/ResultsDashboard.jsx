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
    const seventyPercentRule = (property.purchasePrice + property.repairCosts) / property.arv;
    if (seventyPercentRule <= 0.7) {
      return { status: "excellent", color: "success", text: "Meets 70% Rule" };
    } else if (seventyPercentRule <= 0.8) {
      return { status: "good", color: "warning", text: "Above 70% Rule" };
    } else {
      return { status: "risky", color: "error", text: "High Risk Deal" };
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
            rule.color === "warning" ? "from-warning/20 to-orange-600/20 text-warning" :
            "from-error/20 to-red-600/20 text-error"
          }`}>
            {rule.text}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Net Profit"
            value={formatCurrency(analysis.netProfit)}
            icon="DollarSign"
            color={analysis.netProfit > 0 ? "success" : "error"}
          />
          
          <MetricCard
            title="ROI"
            value={formatPercentage(analysis.roi)}
            icon="TrendingUp"
            color={analysis.roi > 15 ? "success" : analysis.roi > 10 ? "warning" : "error"}
          />
          
          <MetricCard
            title="Total Investment"
            value={formatCurrency(analysis.totalInvestment)}
            icon="Wallet"
            color="primary"
          />
          
          <MetricCard
            title="Monthly Carry"
            value={formatCurrency(analysis.monthlyCarryCost)}
            icon="Calendar"
            color="warning"
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
              <span className="text-sm font-medium text-gray-600">Profit Margin</span>
              <ApperIcon name="Percent" size={16} className="text-gray-400" />
            </div>
            <p className="text-lg font-bold text-gray-900 mt-1">
              {formatPercentage((analysis.netProfit / property.arv) * 100)}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ResultsDashboard;