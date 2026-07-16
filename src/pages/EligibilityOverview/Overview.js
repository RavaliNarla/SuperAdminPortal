import React from "react";
import "./EligibilityOverview.css";

import useEligibilityOverview from "./hooks/useEligibilityOverview";
import OverviewCard from "./components/OverviewCard";

const EligibilityOverview = () => {
  const { cards } = useEligibilityOverview();

  return (
    <div className="overview-page">
      {/* Header */}

      <div className="overview-header">
        <div>
          <h2 className="section-title">Overview</h2>

          <p className="section-subtitle">
            Status of each eligibility policy area for this organization. Rules
            are permanent once saved — review carefully before creating.
          </p>
        </div>
      </div>

      {/* Cards */}

      <div className="row">
        {cards.map((item) => (
          <OverviewCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default EligibilityOverview;
