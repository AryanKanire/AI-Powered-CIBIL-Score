import React, { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import {
  BarChart3,
  Building2,
  CircleDollarSign,
  FileSpreadsheet,
  MessageSquareText,
  ShieldCheck,
  ArrowLeft
} from "lucide-react"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts"

const COLORS = ["#22c55e", "#eab308", "#ef4444", "#3b82f6", "#8b5cf6"]

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

const getCreditScoreColor = score => {
  if (score >= 600) return "#22c55e"
  if (score >= 400) return "#eab308"
  return "#ef4444"
}

const formatCurrency = value => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  }).format(value)
}

const Speedometer = ({ value }) => {
  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      rotate: (value / 850) * 180 - 90,
      transition: { duration: 1, type: "spring" }
    })
  }, [value, controls])

  return (
    <div className="relative w-48 h-24 mx-auto">
      <div className="absolute w-48 h-48 -top-24">
        <div
          className="w-48 h-48 border-[24px] border-gray-200 rounded-full"
          style={{ clipPath: "inset(50% 0 0 0)" }}
        />
        <div
          className="absolute top-0 w-48 h-48 border-[24px] rounded-full"
          style={{
            clipPath: "inset(50% 0 0 0)",
            borderColor: getCreditScoreColor(value)
          }}
        />
        <motion.div
          className="absolute top-[72px] left-[96px] w-1 h-16 bg-gray-800 origin-top"
          animate={controls}
        />
        <motion.div
          className="absolute top-[88px] w-full text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-3xl font-bold">{value}</div>
          <div className="text-sm text-gray-500">Credit Score</div>
        </motion.div>
      </div>
    </div>
  )
}

const MetricCard = ({ title, value, icon: Icon, color = "blue" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-4 rounded-lg shadow"
  >
    <div className="flex items-center gap-3 mb-2">
      <Icon className={`w-5 h-5 text-${color}-600`} />
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
    </div>
    <div className="flex items-end gap-2">
      <span className="text-2xl font-bold">{value}%</span>
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-${color}-600 rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1 }}
        />
      </div>
    </div>
  </motion.div>
)

const FinancialMetrics = ({ business }) => {
  const data = [
    { name: "Revenue", value: business.revenueValue },
    { name: "Expenses", value: business.expenses },
    { name: "Net Profit", value: business.netProfit },
    { name: "Cash Flow", value: business.cashFlow }
  ]

  const ratios = [
    { name: "Profit Margin", value: business.profitMargin },
    { name: "Debt to Asset", value: business.debtToAssetRatio * 100 },
    { name: "Cash Flow Ratio", value: business.cashFlowRatio * 100 },
    { name: "Expense Ratio", value: business.expenseRatio * 100 }
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Financial Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={value => formatCurrency(value)} />
            <Legend />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Financial Ratios</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={ratios}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {ratios.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

const Dashboard = ({ business, onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {console.log(business)}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Business List
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            Business Risk Dashboard
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-2">{business.name}</h2>
            <span
              className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${getRiskColor(
                business.riskCategory
              )}`}
            >
              {business.riskCategory}
            </span>
          </div>

          <div className="mb-8">
            <Speedometer value={business.creditScore} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MetricCard
              title="Financial Health"
              value={business.financialHealth}
              icon={CircleDollarSign}
              color="green"
            />
            <MetricCard
              title="Transaction Score"
              value={business.transactionScore}
              icon={BarChart3}
              color="blue"
            />
            <MetricCard
              title="GST Compliance"
              value={business.gstCompliance}
              icon={FileSpreadsheet}
              color="purple"
            />
            <MetricCard
              title="Payment History"
              value={business.paymentHistory}
              icon={Building2}
              color="yellow"
            />
            <MetricCard
              title="Social Score"
              value={business.socialScore}
              icon={MessageSquareText}
              color="pink"
            />
            <MetricCard
              title="Overall Risk Score"
              value={Math.round(
                (business.financialHealth +
                  business.transactionScore +
                  // business.gstCompliance +
                  business.paymentHistory +
                  business.socialScore) /5
              )}
              icon={ShieldCheck}
              color="indigo"
            />
          </div>

          <FinancialMetrics business={business} />

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Key Metrics</h3>
              <dl className="space-y-4">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Assets</dt>
                  <dd className="font-semibold">
                    {formatCurrency(business.assets)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Liabilities</dt>
                  <dd className="font-semibold">
                    {formatCurrency(business.liabilities)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Transactions</dt>
                  <dd className="font-semibold">
                    {business.transactions}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">GST Filing Status</dt>
                  <dd className="font-semibold">{business.gstFilingStatus}</dd>
                </div>
              </dl>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Risk Indicators</h3>
              <dl className="space-y-4">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Transaction Intensity</dt>
                  <dd className="font-semibold">
                    {business.transactionIntensity}%
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Sentiment Score</dt>
                  <dd className="font-semibold">
                    {business.sentimentScore}/100
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Profit Margin</dt>
                  <dd className="font-semibold">{business.profitMargin}%</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Debt to Asset Ratio</dt>
                  <dd className="font-semibold">
                    {(business.debtToAssetRatio * 100).toFixed(1)}%
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

export default Dashboard
