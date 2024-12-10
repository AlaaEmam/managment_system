import React from "react";
import "../Dashboard.css";

interface Card {
  icon: string; // URL of the icon
  label: string; // Label for the card
  value: string; // Value to display
  iconBgClass: string; // CSS class for icon background
}

interface DashboardBoxProps {
  title: string; // Title of the dashboard box
  description: string; // Description of the dashboard box
  cards: Card[]; // Array of card data
}

const DashboardBox: React.FC<DashboardBoxProps> = ({
  title,
  description,
  cards,
}) => {
  return (
    <div className=" col-12 col-md-6">
      <div className="dashboard-box">
        <div className="header-text">
          <div className="fw-bold">{title}</div>
          <div className="description fw-lighter">{description}</div>
        </div>
        <div className="cards">
          {cards.map((card, index) => (
            <div className="card" key={index}>
              <div className={`icon-card ${card.iconBgClass}`}>
                <img
                  className="icon"
                  src={card.icon}
                  alt={`${card.label} Icon`}
                />
              </div>
              <div className="label">{card.label}</div>
              <div className="value">{card.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

  
  );
};

export default DashboardBox;
