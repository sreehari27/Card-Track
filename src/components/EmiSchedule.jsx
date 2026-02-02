

const EmiSchedule = ({ schedule }) => {
  if (!schedule.length) return null;

  return (
    <div className="bg-white rounded-2xl shadow p-4 overflow-x-auto">
      <h2 className="text-lg font-semibold mb-3">EMI Schedule</h2>

      <table className="min-w-full text-sm">
        <thead className="sticky top-0 bg-slate-100">
          <tr>
            {["No", "Opening", "Principal", "Interest", "EMI", "Closing"].map(
              (h) => (
                <th key={h} className="px-3 py-2 text-right font-medium">
                  {h}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {schedule.map((row) => (
            <tr key={row.no} className="border-t">
              <td className="px-3 py-2 text-right">{row.no}</td>
              <td className="px-3 py-2 text-right">₹{row.opening}</td>
              <td className="px-3 py-2 text-right">₹{row.principal}</td>
              <td className="px-3 py-2 text-right">₹{row.interest}</td>
              <td className="px-3 py-2 text-right font-semibold">
                ₹{row.emi}
              </td>
              <td className="px-3 py-2 text-right">₹{row.closing}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmiSchedule;
