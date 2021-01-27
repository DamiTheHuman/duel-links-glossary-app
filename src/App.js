import "./App.css";
import { useState, useEffect } from "react";
import yugiohAPI from "./api/yugiohAPI";
import yugiohRandomCardAPI from "./api/yugiohRandomCardAPI";
import Modal from "./components/Modal";
import MainHeader from "./components/MainHeader";
import Vagabond from "./components/Vagabond";
import CardLayout from "./components/CardLayout";
import Main from "./components/Main";
import CardList from "./components/CardList";
import Pagination from "./components/Pagination";
import Intro from "./components/Intro";
/**
 * Center app component which controls the component being displayed
 */
function App() {
  /** Whether to show the intro */
  const [showIntro, setShowIntro] = useState([]);
  /** The active cards currently being show */
  const [activeCards, setActiveCards] = useState([]);
  /** The random card drawn by the user */
  const [randomCard, setRandomCard] = useState({});
  /** The current state of the modal */
  const [showModal, setShowModal] = useState(false);
  /** The card the vagabond has focused on */
  const [focusCard, setFocusCard] = useState({});
  /** The card the vagaband was previously focusing on */
  const [previousFocusCard, setPreviousFocusCard] = useState(focusCard);
  /** The current page being examined the user */
  const [currentPage, setCurrentPage] = useState(0);
  /** The amount of items displayed by page */
  const itemsPerPage = 15;

  useEffect(() => {
    if (Object.getOwnPropertyNames(focusCard).length !== 0) {
      var element = document.getElementsByClassName("focus-card")[0];
      scrollToElement(element, 95);
    }
    setPreviousFocusCard(focusCard);
    return () => {
      setPreviousFocusCard({});
    };
  }, [focusCard]);

  useEffect(() => {
    setFocusCard({});
    return () => {
      var element = document.getElementsByClassName("vagabond")[0];
      scrollToElement(element, 0);
    };
  }, [currentPage]);

  /**
   * Scrolls the user display to the specified element
   * @param element the element to scroll towards
   * @param offset anyOffset applied to the scroll position
   */
  const scrollToElement = (element, offset) => {
    if (!element) {
      return;
    }
    var targetPosition = element.getBoundingClientRect().top - offset;
    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  };

  /**
   * Searches for a card via its fuzzy name
   * @param searchTerm the card to be searched from the api
   */
  const onSearchSubmit = async (searchTerm) => {
    const result = await yugiohAPI.get("", {
      params: {
        fname: searchTerm,
        format: "duel links",
      },
    });
    setFocusCard({});
    setCurrentPage(0);
    setActiveCards(result.data.data);
  };
  /**
   * Gets a random card from the API
   */
  const onRandomSubmit = async () => {
    const result = await yugiohRandomCardAPI.get("", {});
    setRandomCard(result.data);
    setShowModal(true);
  };

  /**
   * Shows the selected card on the modal
   * @param card the card shown on the modal
   */
  const showCard = (card) => {
    setRandomCard(card);
    setShowModal(true);
  };
  /**
   * Focus on the selected card
   * @param card the card the vagabond has selected
   */
  const onFocusCardSelect = (card) => {
    if (previousFocusCard !== card) {
      setFocusCard(card);
    }
    if (focusCard === card) {
      if (Object.getOwnPropertyNames(focusCard).length !== 0) {
        var element = document.getElementById("focus-card");
        if (element) {
          var headerOffset = 95;
          var elementPosition = element.getBoundingClientRect().top;
          var offsetPosition = elementPosition - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    }
  };

  return (
    <div className="App">
      <MainHeader />
      <Intro showIntro={showIntro} setShowIntro={setShowIntro} />
      <Modal
        content={<CardLayout card={randomCard} showCard={showCard} />}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <div className="lg:px-64 md:px-16 px-8 pt-8">
        <Main onSearchSubmit={onSearchSubmit} onRandomSubmit={onRandomSubmit}>
          <Vagabond
            showIntro={showIntro}
            onFocusCardSelect={onFocusCardSelect}
            activeCards={activeCards.slice(
              itemsPerPage * currentPage,
              itemsPerPage + itemsPerPage * currentPage
            )}
          />
        </Main>
        <Pagination
          activeCards={activeCards}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <CardList
          activeCards={activeCards.slice(
            itemsPerPage * currentPage,
            itemsPerPage + itemsPerPage * currentPage
          )}
          focusCard={focusCard}
          showCard={showCard}
          styling={"sm:grid-cols-3 grid-cols-2"}
        />
        <Pagination
          activeCards={activeCards}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default App;
