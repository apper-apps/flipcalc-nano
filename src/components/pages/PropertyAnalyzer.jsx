import React, { useState, useEffect } from "react";
import PropertyForm from "@/components/organisms/PropertyForm";
import ResultsDashboard from "@/components/organisms/ResultsDashboard";
import FinancingOptions from "@/components/organisms/FinancingOptions";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { toast } from "react-toastify";

const PropertyAnalyzer = () => {
  const [property, setProperty] = useState({
    purchasePrice: 0,
    arv: 0,
    repairCosts: 0,
    address: "",
    squareFeet: 0,
    bedrooms: 0,
    bathrooms: 0,
    holdingPeriod: 6
  });

const [hardMoneyLenders, setHardMoneyLenders] = useState([
    {
      name: "Lender 1",
      loanToValue: 70,
      interestRate: 12,
      points: 2,
      term: 12,
      underwritingFees: 1500,
      loanAmount: 0,
      monthlyPayment: 0
    },
    {
      name: "Lender 2", 
      loanToValue: 75,
      interestRate: 11,
      points: 2.5,
      term: 12,
      underwritingFees: 2000,
      loanAmount: 0,
      monthlyPayment: 0
    },
    {
      name: "Lender 3",
      loanToValue: 65,
      interestRate: 13,
      points: 1.5,
      term: 12,
      underwritingFees: 1200,
      loanAmount: 0,
      monthlyPayment: 0
    }
  ]);

const [selectedLender, setSelectedLender] = useState(0);
const [analysis, setAnalysis] = useState({
    seventyPercentRule: {
      maxOfferPrice: 0,
      meetsRule: false,
      difference: 0
    }
  });

const calculateAnalysis = () => {
    // 70% Rule: ARV x 0.70 - Estimated repair costs
    const maxOfferPrice = (property.arv * 0.70) - property.repairCosts;
    const meetsRule = property.purchasePrice <= maxOfferPrice;
    const difference = maxOfferPrice - property.purchasePrice;

    setAnalysis({
      seventyPercentRule: {
        maxOfferPrice,
        meetsRule,
        difference
      }
    });
  };

  useEffect(() => {
    if (property.purchasePrice > 0 && property.arv > 0) {
      calculateAnalysis();
    }
  }, [property, hardMoneyLenders, selectedLender]);

  const handleClearData = () => {
    setProperty({
      purchasePrice: 0,
      arv: 0,
      repairCosts: 0,
      address: "",
      squareFeet: 0,
      bedrooms: 0,
      bathrooms: 0,
      holdingPeriod: 6
    });
    
setHardMoneyLenders([
      {
        name: "Lender 1",
        loanToValue: 70,
        interestRate: 12,
        points: 2,
        term: 12,
        underwritingFees: 1500,
        loanAmount: 0,
        monthlyPayment: 0
      },
      {
        name: "Lender 2",
        loanToValue: 75,
        interestRate: 11,
        points: 2.5,
        term: 12,
        underwritingFees: 2000,
        loanAmount: 0,
        monthlyPayment: 0
      },
      {
        name: "Lender 3",
        loanToValue: 65,
        interestRate: 13,
        points: 1.5,
        term: 12,
        underwritingFees: 1200,
        loanAmount: 0,
        monthlyPayment: 0
      }
    ]);
    
    setSelectedLender(0);

    toast.success("Analysis cleared successfully");
  };

  const handleSaveAnalysis = () => {
const analysisData = {
      property,
      hardMoneyLenders,
      selectedLender,
      analysis,
      savedAt: new Date().toISOString()
    };
    
    localStorage.setItem("flipcalc-analysis", JSON.stringify(analysisData));
    toast.success("Analysis saved successfully");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg mr-4">
                <ApperIcon name="Calculator" size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold text-white">FlipCalc Pro</h1>
                <p className="text-blue-100 text-sm">Real Estate Flip Analyzer</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="secondary" onClick={handleSaveAnalysis}>
                <ApperIcon name="Save" size={16} className="mr-2" />
                Save Analysis
              </Button>
              <Button 
                variant="outline" 
                onClick={handleClearData}
                className="border-white/30 text-white hover:bg-white/10"
              >
                <ApperIcon name="RotateCcw" size={16} className="mr-2" />
                Clear All
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Property Form */}
          <PropertyForm 
            property={property}
            onPropertyChange={setProperty}
          />

{/* Results Dashboard */}
          <ResultsDashboard 
            analysis={{
              ...analysis,
              selectedLender: hardMoneyLenders[selectedLender] ? {
                ...hardMoneyLenders[selectedLender],
                monthlyPayment: hardMoneyLenders[selectedLender].monthlyPayment || 0,
                totalMonthlyPayments: (hardMoneyLenders[selectedLender].monthlyPayment || 0) * (property.holdingPeriod || 6),
                totalCost: (hardMoneyLenders[selectedLender].loanAmount || 0) * (hardMoneyLenders[selectedLender].points || 0) / 100 + 
                          ((hardMoneyLenders[selectedLender].monthlyPayment || 0) * (property.holdingPeriod || 6)) + 
                          (hardMoneyLenders[selectedLender].underwritingFees || 0),
                pointsCost: (hardMoneyLenders[selectedLender].loanAmount || 0) * (hardMoneyLenders[selectedLender].points || 0) / 100,
                underwritingFees: hardMoneyLenders[selectedLender].underwritingFees || 0
              } : null
            }}
            property={property}
          />
        </div>

        {/* Financing Options */}
<FinancingOptions 
          hardMoneyLenders={hardMoneyLenders}
          onHardMoneyChange={setHardMoneyLenders}
          selectedLender={selectedLender}
          onLenderSelect={setSelectedLender}
          property={property}
        />

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 text-sm text-gray-500 bg-gray-50 px-6 py-3 rounded-full">
            <ApperIcon name="Shield" size={16} />
            <span>Calculations are estimates. Consult with financial professionals for investment decisions.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyAnalyzer;