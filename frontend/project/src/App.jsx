
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import Dashboard from "./Dashboard.jsx";
import BusinessList from "./BusinessList.jsx";

function App() {
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all businesses from the database
  useEffect(() => {
    axios.get("http://localhost:8000/api/get-businesses")
      .then(response => {
        console.log(response.data.businesses);
        const transformedBusinesses = response.data.businesses.map(business => ({

          id: business.business_id,
          name: business.Company || `Business ${business.business_id}`,  // Default name if null
          creditScore: Math.floor(business.credit_score) ,
          riskCategory: business.credit_score > 600 ? "Low Risk" : business.credit_score > 400 ? "Medium Risk" : "High Risk",
          financialHealth: Math.round(business.Profit_Margin * 100),
          transactionScore: Math.round(business.Transaction_Intensity * 100),
          gstCompliance: business.GST_Filing_Status ? "Complete" : "Pending",
          paymentHistory: Math.round(business.Cash_Flow_Ratio * 100),
          socialScore: Math.round(business.Sentiment_Score * 100),
          industry:business.Industry ||  "Unknown",
          location: business.Location || "Unknown",
          revenue: `₹${(business.Revenue / 10000000).toFixed(1)}Cr`,
          revenueValue: business.Revenue,
          expenses: business.Expenses,
          assets: business.Assets,
          liabilities: business.Liabilities,
          netProfit: business.Net_Profit,
          cashFlow: business.Cash_Flow,
          transactions: business.Transactions,
          sentimentScore: Math.round(business.Sentiment_Score * 100),
          gstFilingStatus: business.GST_Filing_Status ? "Complete" : "Pending",
          profitMargin: Math.round(business.Profit_Margin * 100),
          debtToAssetRatio: business.Debt_to_Asset_Ratio,
          cashFlowRatio: business.Cash_Flow_Ratio,
          expenseRatio: business.Expense_Ratio,
          transactionIntensity: Math.round(business.Transaction_Intensity * 100),
        }));

        setBusinesses(transformedBusinesses);
      })
      .catch(error => {
        console.error("Error fetching business data:", error);
      });
  }, []);

  const filteredBusinesses = businesses.filter(
    business =>
      business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fetch individual business details when a card is clicked
  const handleSelectBusiness = async (business_id) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/get-details/${business_id}`);
    const business = response.data;

      console.log(business);
    // Ensure the fetched business details follow the same structure
    const transformedBusiness = {
      id: business.business_id,
      name: business.Company || `Business ${business.business_id}`,
      riskCategory: business.get_details.credit_score > 600 ? "Low Risk" : business.credit_score > 400 ? "Medium Risk" : "High Risk", 
      creditScore: Math.floor(business.get_details.credit_score),
      financialHealth: Math.round(business.get_details.Profit_Margin * 100),
      transactionScore: Math.round(business.get_details.Transaction_Intensity * 100),
      gstCompliance: business.get_details.GST_Filing_Status ? "Complete" : "Pending",
      paymentHistory: Math.round(business.get_details.Cash_Flow_Ratio * 100),
      socialScore: Math.round(business.get_details.Sentiment_Score * 100),
      industry: business.get_details.Industry || "Unknown",
      location: business.get_details.Location || "Unknown",
      revenue: `₹${(business.get_details.Revenue / 10000000).toFixed(1)}Cr`,
      revenueValue: business.get_details.Revenue,
      expenses: business.get_details.Expenses,
      assets: business.get_details.Assets,
      liabilities: business.get_details.Liabilities,
      netProfit: business.get_details.Net_Profit,
      cashFlow: business.get_details.Cash_Flow,
      transactions: business.get_details.Transactions,
      sentimentScore: Math.round(business.get_details.Sentiment_Score * 100),
      gstFilingStatus: business.get_details.GST_Filing_Status ? "Complete" : "Pending",
      profitMargin: Math.round(business.get_details.Profit_Margin * 100),
      debtToAssetRatio: business.get_details.Debt_to_Asset_Ratio,
      cashFlowRatio: business.get_details.Cash_Flow_Ratio,
      expenseRatio: business.get_details.Expense_Ratio,
      transactionIntensity: Math.round(business.get_details.Transaction_Intensity * 100),
    };

    setSelectedBusiness(transformedBusiness);
  } catch (error) {
    console.error("Error fetching business details:", error);
  }
};


  if (selectedBusiness) {
    return (
      <Dashboard
        business={selectedBusiness}
        onBack={() => setSelectedBusiness(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Business Risk Analysis
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by business name, industry, or location..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <BusinessList businesses={filteredBusinesses} onSelectBusiness={handleSelectBusiness} />
      </main>
    </div>
  );
}

export default App;
