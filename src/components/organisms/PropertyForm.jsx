import React from "react";
import Card from "@/components/atoms/Card";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";

const PropertyForm = ({ property, onPropertyChange }) => {
  const handleChange = (field, value) => {
    onPropertyChange({
      ...property,
      [field]: value
    });
  };

  return (
    <Card className="p-6">
      <div className="flex items-center mb-6">
        <div className="bg-gradient-to-br from-primary/10 to-secondary/20 p-3 rounded-lg mr-4">
          <ApperIcon name="Home" size={24} className="text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-display font-semibold text-gray-900">Property Details</h2>
          <p className="text-sm text-gray-600">Enter the basic property information</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Purchase Price"
          type="number"
          value={property.purchasePrice || ""}
          onChange={(e) => handleChange("purchasePrice", parseFloat(e.target.value) || 0)}
          prefix="$"
          placeholder="0"
        />

        <FormField
          label="After Repair Value (ARV)"
          type="number"
          value={property.arv || ""}
          onChange={(e) => handleChange("arv", parseFloat(e.target.value) || 0)}
          prefix="$"
          placeholder="0"
        />

        <FormField
          label="Estimated Repair Costs"
          type="number"
          value={property.repairCosts || ""}
          onChange={(e) => handleChange("repairCosts", parseFloat(e.target.value) || 0)}
          prefix="$"
          placeholder="0"
        />

        <FormField
          label="Holding Period"
          type="number"
          value={property.holdingPeriod || ""}
          onChange={(e) => handleChange("holdingPeriod", parseInt(e.target.value) || 6)}
          suffix="months"
          placeholder="6"
        />

        <FormField
          label="Property Address"
          value={property.address || ""}
          onChange={(e) => handleChange("address", e.target.value)}
          placeholder="123 Main St, City, State"
          icon="MapPin"
        />

        <FormField
          label="Square Feet"
          type="number"
          value={property.squareFeet || ""}
          onChange={(e) => handleChange("squareFeet", parseInt(e.target.value) || 0)}
          suffix="sq ft"
          placeholder="0"
        />

        <FormField
          label="Bedrooms"
          type="number"
          value={property.bedrooms || ""}
          onChange={(e) => handleChange("bedrooms", parseInt(e.target.value) || 0)}
          placeholder="0"
        />

        <FormField
          label="Bathrooms"
          type="number"
          step="0.5"
          value={property.bathrooms || ""}
          onChange={(e) => handleChange("bathrooms", parseFloat(e.target.value) || 0)}
          placeholder="0"
        />
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-info/10 to-blue-600/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <ApperIcon name="Info" size={16} className="text-info mt-0.5" />
          <div className="text-sm text-gray-700">
            <p className="font-medium mb-1">Pro Tip</p>
            <p>The 70% rule suggests your purchase price plus repair costs should not exceed 70% of the ARV for a profitable flip.</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PropertyForm;