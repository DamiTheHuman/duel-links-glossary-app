import React from "react";
/**
 * Displays a list of cards
 */
const CardList = ({ activeCards, focusCard, showCard, styling }) => {
  /** The format each card is displayed */
  const content = activeCards.map((activeCard) => {
    return (
      <div
        key={activeCard.id}
        className={`card ${focusCard === activeCard ? "focus-card" : ""}`}
      >
        <a
          href="/#"
          onClick={(event) => {
            event.preventDefault();
            showCard(activeCard);
          }}
        >
          <img
            src={activeCard.card_images[0].image_url}
            alt={activeCard.name}
          />
        </a>
      </div>
    );
  });
  return (
    <div className="card-list w-full mb-4">
      <div className={`grid ${styling} gap-4`}>{content}</div>
    </div>
  );
};
CardList.defaultProps = {
  styling: "grid-cols-3",
};

export default CardList;
