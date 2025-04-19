
import FinancialNews from "../components/FinancialNews";
import { useRouter } from "next/router";

export default function NewsPage() {
  const router = useRouter();

  return (
    <div className="container">
      <h1>📈 Financial News & Sentiment</h1>
      <FinancialNews />
      <button className="back-button" onClick={() => router.push("/")}>
        ⬅️ Back to Dashboard
      </button>
    </div>
  );
}
