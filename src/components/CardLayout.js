import React, { useState, useEffect } from "react";
import yugiohAPI from "../api/yugiohAPI";
import CardList from "./CardList";
const CardLayout = ({ card, showCard }) => {
  /** Other cards related to the card currently being queried for */
  const [relatedCards, setRelatedCards] = useState([]);

  useEffect(() => {
    if (!card) {
      return;
    }
    /**
     * Search Related Cards by its archetype
     */
    const searchRelatedCards = async () => {
      let parameters = {};
      if (card.archetype) {
        parameters = {
          params: {
            archetype: card.archetype,
          },
        };
      } else {
        parameters = {
          params: {
            type: card.type,
          },
        };
      }
      const result = await yugiohAPI.get("", parameters);
      setRelatedCards(result.data.data.slice(0, 5));
    };
    searchRelatedCards(card);
    return;
  }, [card]);
  /**
   * Converts a javascript key to a more readable form
   * @param id the Javascript key to be converted
   */
  const convertKey = (id) => {
    switch (id) {
      case "desc":
        return "Description";
      case "atk":
        return "Attack";
      case "def":
        return "Defence";
      default:
        break;
    }
    return id;
  };
  /**
   * Changes the order of a javascript  object alongside the keys displayed
   * @param id the Javascript object to be cloned
   * @param order the keys to be displayed and ordered
   */
  const preferredOrder = (obj, order) => {
    var newObject = {};
    for (var i = 0; i < order.length; i++) {
      if (obj.hasOwnProperty(order[i])) {
        newObject[order[i]] = obj[order[i]];
      }
    }
    return newObject;
  };
  /*The core data of the card to be displayed */
  const cardData = preferredOrder(card, [
    "id",
    "name",
    "attribute",
    "level",
    "race",
    "type",
    "atk",
    "def",
    "desc",
  ]);
  /**
   * Ensures that cards which contain a "●" are displayed in a more readable format to the user
   * @param description the current description of the card
   */
  const convertDescription = (description) => {
    var result = description.split("●");
    var value = result.map((v, index) => {
      return (
        <p key={index}>
          {index > 0 ? "●" : ""}
          {v}
        </p>
      );
    });
    return value;
  };
  /* The details pertaining to the card*/
  const cardDetailItems = Object.keys(cardData).map((key, index) => {
    if (typeof card[key] === "object") {
      return null;
    }
    return (
      <div
        className={`card-detail ${
          key === "id" || key === "desc" || key === "name" ? "col-span-2" : ""
        }`}
        key={index}
      >
        {convertKey(key)}
        <span>
          {key === "id" ? "#" : ""}
          {key === "desc" ? convertDescription(card[key]) : card[key]}
        </span>
      </div>
    );
  });

  return (
    <React.Fragment>
      <div className="modal-body mb-2">
        <div className="flex flex-wrap sm:flex-nowrap ">
          <div className="sm:w-1/3 w-full mr-4 mb-4 sm:mb-0">
            <img src={card.card_images[0].image_url} alt={card.name} />
          </div>
          <div className="sm:w-2/3 w-full sm:px-4 px-0 text-xs sm:text-base">
            {/* Card content*/}
            <div className="card-content grid grid-cols-2 gap-4">
              {cardDetailItems}
            </div>
          </div>
        </div>
      </div>

      <div className="modal-footer">
        <h3 className="text-2xl mb-2">Related Cards</h3>
        <div className="card-list w-full">
          <CardList
            activeCards={relatedCards}
            showCard={showCard}
            styling={"grid-cols-3 sm:grid-cols-5"}
          />
        </div>
      </div>
    </React.Fragment>
  );
};
export default CardLayout;
