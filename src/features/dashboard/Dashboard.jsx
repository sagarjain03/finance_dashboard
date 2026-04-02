import SummaryCards from "./SummaryCards";
import BalanceChart from "./BalanceChart";
import CategoryChart from "./CategoryChart";

function Dashboard() {
  return (
    <div className="space-y-10">
      
      {/* Overview Block */}
      <section>
        <h2 className="text-xl font-bold tracking-tight text-metallic mb-6 ml-2">Overview</h2>
        <SummaryCards />
      </section>

      {/* Analytics Block */}
      <section>
        <div className="flex items-center justify-between mb-6 ml-2 pr-2">
          <h2 className="text-xl font-bold tracking-tight text-metallic">Analytics</h2>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <BalanceChart />
          <CategoryChart />
        </div>
      </section>

    </div>
  );
}

export default Dashboard;