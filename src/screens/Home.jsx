import { useState } from "react";
import "../styles/Styles.css";
import EmiSchedule from "../components/EmiSchedule";

export default function Home() {
  const MONTHLY = 1;
  const QUARTERLY = 3;
  const HALF_YEARLY = 6;

  const [values, setValues] = useState({
    loanAmount: "",
    interestRate: "",
    loanTerm: "",
    repaymentCycle: "12",
    monthsToAdd: 1,
  });

  const [result, setResult] = useState({
    schedule: [],
    totalInterest: 0,
    totalPayable: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "repaymentCycle") {
      setValues((prev) => ({
        ...prev,
        repaymentCycle: value,
        monthsToAdd:
          value === "12" ? MONTHLY : value === "4" ? QUARTERLY : HALF_YEARLY,
      }));
    } else {
      setValues((prev) => ({ ...prev, [name]: value }));
    }
  };

  const getNoOfDaysInPeriod = (startDate, monthsToAdd) => {
    const endDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + monthsToAdd,
      1
    );
    return Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const loanAmount = +values.loanAmount;
    const interestRate = +values.interestRate;
    const loanTerm = +values.loanTerm;
    const repaymentCycle = +values.repaymentCycle;

    const instalments = loanTerm * repaymentCycle;
    const principal = loanAmount / instalments;
    const interestRatePerDay = interestRate / 365;

    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    const daysInPeriod = getNoOfDaysInPeriod(startDate, values.monthsToAdd);

    let outstanding = loanAmount;
    let schedule = [];
    let totalInterest = 0;
    let totalPayable = 0;

    for (let i = 1; i <= instalments; i++) {
      const interest =
        (outstanding * interestRatePerDay * daysInPeriod) / 100;
      const emi = principal + interest;

      schedule.push({
        no: i,
        opening: Math.round(outstanding),
        principal: Math.round(principal),
        interest: Math.round(interest),
        emi: Math.round(emi),
        closing: Math.round(Math.max(outstanding - principal, 0)),
      });

      outstanding -= principal;
      totalInterest += interest;
      totalPayable += emi;
    }

    setResult({
      schedule,
      totalInterest: Math.round(totalInterest),
      totalPayable: Math.round(totalPayable),
    });
  };


  const allowOnlyNumbers = (e) => {
  if (
    !/[0-9.]/.test(e.key) &&
    e.key !== "Backspace" &&
    e.key !== "Delete" &&
    e.key !== "ArrowLeft" &&
    e.key !== "ArrowRight" &&
    e.key !== "Tab"
  ) {
    e.preventDefault();
  }
};


  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <header className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            EMI Calculator
          </h1>
          <p className="text-slate-500 mt-1">
            EPM (Equated Periodic Monthly) Calculator
          </p>
        </header>

        {/* Input Card */}
        <form
  onSubmit={handleSubmit}
  className="bg-white rounded-3xl shadow-lg p-6 md:p-8 space-y-6"
>
  {/* Header */}
  <div className="text-center">
    <h2 className="text-xl md:text-2xl font-bold text-slate-800">
      Loan Details
    </h2>
    <p className="text-slate-500 text-sm mt-1">
      Enter your loan details to calculate EMI
    </p>
  </div>

  {/* Inputs */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
    
    <div className="border border-indigo-600 rounded-2xl h-16 flex items-center px-4">
  <Input
    name="loanAmount"
    prefix="₹"
    placeholder="Loan Amount  e.g. 5,00,000"
    value={values.loanAmount}
    onChange={handleChange}
    // inputClassName="text-2xl font-bold tracking-wide "
    className="text-2xl font-bold outline-none focus:outline-none focus:ring-0 ${className}"
    inputType="number"
    onKeyDown={allowOnlyNumbers}
  />
</div>

    
<div className="border border-indigo-600 rounded-2xl h-16 flex items-center px-4">
    <Input
      // label="Interest Rate"
      name="interestRate"
      suffix="%"
      step="0.01"
      placeholder="Interest Rate  e.g. 10.5"
      value={values.interestRate}
      onChange={handleChange}
      className="text-2xl font-bold outline-none focus:outline-none focus:ring-0 ${className}"
      inputType="number"
      onKeyDown={allowOnlyNumbers}
    />
    </div>
<div className="border border-indigo-600 rounded-2xl h-16 flex items-center px-4">
    <Input
      // label="Loan Term"
      name="loanTerm"
      suffix="Years"
      placeholder="Loan Term  e.g. 5"
      value={values.loanTerm}
      onChange={handleChange}
      className="text-2xl font-bold outline-none focus:outline-none focus:ring-0 ${className}"
      inputType="number"
      onKeyDown={allowOnlyNumbers}
    />
    </div>

    {/* Repayment Cycle – Segmented Control */}
    <div>
      {/* <label className="label mb-2">Repayment Cycle</label> */}
      <div className="grid grid-cols-3 bg-slate-100 rounded-xl p-1">
        {[
          { label: "Monthly", value: "12" },
          { label: "Quarterly", value: "4" },
          { label: "Half-Yearly", value: "2" },
        ].map((item) => (

          <button
            key={item.value}
            type="button"
            onClick={() =>
              handleChange({
                target: { name: "repaymentCycle", value: item.value },
              })
            }
            className={`py-2 rounded-lg text-sm font-medium transition  
              ${
                values.repaymentCycle === item.value
                  ? "bg-white shadow text-green-700 border border-green-700 border rounded-2xl h-16 px-4 "
                  : "text-slate-500 hover:text-slate-700 "
              }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  </div>

  {/* CTA */}
  <button
    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600
               text-white py-3.5 rounded-2xl font-semibold
               hover:from-green-700 hover:to-indigo-700
               active:scale-[0.98] transition"
  >
    Calculate EMI
  </button>
</form>


        {/* Summary */}
        {result.schedule.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SummaryCard title ="Loan Amount" value={`₹${values.loanAmount}`} />
            <SummaryCard title="Total Interest" value={`₹${result.totalInterest}`} />
            <SummaryCard title="Total Payable" value={`₹${result.totalPayable}`} />
            {/* <SummaryCard
              title="Instalments"
              value={result.schedule.length}
            /> */}
          </div>
        )}

        {/* EMI Table */}
        <EmiSchedule schedule={result.schedule} />
      </div>
    </div>
  );
}

/* Reusable Components */
const Input = ({ label, ...props }) => (
  <div>
    <label className="label">{label}</label>
    <input className="input" required {...props} />
  </div>
);

const SummaryCard = ({ title, value }) => (
  <div className="bg-white rounded-xl shadow p-5 text-center">
    <p className="text-slate-500 text-sm">{title}</p>
    <p className="text-xl font-bold text-slate-800 mt-1">{value}</p>
  </div>
);
