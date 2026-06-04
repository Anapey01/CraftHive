"use client";

import "./ClientReviews.css";
import { clientReviewsData } from "./clientReviewsData";

type ClientReviewItem = {
  review: string;
  clientName: string;
  clientCompany: string;
};

const ClientReviews = () => {
  return (
    <div className="client-reviews-marquee">
      <div className="marquee-track">
        {/* Render twice for seamless looping */}
        {[...clientReviewsData, ...clientReviewsData].map(
          (item: ClientReviewItem, index: number) => (
            <div
              className={`marquee-card card-color-${(index % 6) + 1}`}
              key={index}
            >
              <div className="marquee-card-content">
                <h3 className="marquee-card-text lg">"{item.review}"</h3>
                <div className="marquee-card-client-info">
                  <p className="marquee-card-client cap">{item.clientName}</p>
                  <p className="marquee-card-client-company sm">
                    {item.clientCompany}
                  </p>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ClientReviews;
