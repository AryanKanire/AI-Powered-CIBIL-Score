import React from "react"
import { Building2, MapPin, TrendingUp } from "lucide-react"

const getRiskColor = category => {
  switch (category) {
    case "Low Risk":
      return "bg-green-100 text-green-800"
    case "Medium Risk":
      return "bg-yellow-100 text-yellow-800"
    case "High Risk":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}
const BusinessList = ({ businesses, onSelectBusiness }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {businesses.map((business, index) => (
        <div
          key={business.id}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => onSelectBusiness(index + 1)} // Pass index + 1
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {business.name}
              </h2>
              <span
                className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${getRiskColor(
                  business.riskCategory
                )}`}
              >
                {business.riskCategory}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <Building2 className="h-4 w-4 mr-2" />
                <span>{business.industry}</span>
                {console.log(business)}
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{business.location}</span>
              </div>
              {/* <div className="flex items-center text-gray-600">
                <TrendingUp className="h-4 w-4 mr-2" />
                <span>{business.revenueValue}</span>
              </div> */}
            </div>

            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-2xl font-bold">
                    {business.creditScore}
                  </div>
                  <div className="text-sm text-gray-500">Credit Score</div>
                </div>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent parent click event
                    onSelectBusiness(index + 1);
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BusinessList
