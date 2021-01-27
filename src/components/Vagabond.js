import "./Vagabond.css";
import React, { useState, useEffect } from "react";
import vagabond from "../assets/images/vagabond.png";
import vagabondMessageAPI from "../api/vagabondMessageAPI";

const Vagabond = ({ showIntro, activeCards, onFocusCardSelect }) => {
  /** The current action of the vagabond which effects the type of message to be displayed */
  const [action, setAction] = useState(0);
  /** The topic card the vagabond takes notice too */
  const [topicCard, setTopicCard] = useState({});
  /** The message the vagabond has displayed */
  const [message, setMessage] = useState("");
  /** The typed out message being displayed to the user incrementally */
  const [typedOutMessage, setTypedOutMessage] = useState("");
  /** The speed in which the typed out text is display */
  const displayTextSpeed = 30;

  useEffect(() => {
    if (activeCards.length > 0) {
      setAction(1);
      setTopicCard(activeCards[Math.floor(Math.random() * activeCards.length)]);
      setMessage("");
    }
  }, [activeCards]);

  useEffect(() => {
    if (!showIntro) {
      var messageToShow = vagabondMessageAPI(action, topicCard);
      setMessage(messageToShow);
      setTypedOutMessage("");
    }
  }, [message, action, topicCard, showIntro]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (typedOutMessage === message || !message) {
        clearInterval(interval);
        return;
      }
      setTypedOutMessage(typedOutMessage + message[typedOutMessage.length]);
    }, displayTextSpeed);
    return () => {
      clearInterval(interval); //Clear interval to avoid memory leaks
    };
  }, [typedOutMessage, message]);
  /**
   * Displays the message set to the user while further parsing its content
   * @param message The message to be dispayed to the user
   */
  const parseChatMessage = (message) => {
    if (!message) {
      return;
    }
    var baseMessage = message.split("|");
    if (action > 0 && baseMessage.length > 1) {
      return (
        <p>
          {baseMessage[0].trim() + " "}
          <span>
            <a
              href="#/"
              onClick={(event) => {
                event.preventDefault();
                onFocusCardSelect(topicCard);
              }}
            >
              {baseMessage[1].trim()}
            </a>
          </span>
          {baseMessage[2]}
        </p>
      );
    } else {
      return <p>{message}</p>;
    }
  };

  return (
    <div className="vagabond pb-4 relative">
      <div className="char">
        <img src={vagabond} alt="vagabond" className="mx-auto" />
        <div className="chat-bubble p-4 text-sm sm:text-lg">
          <div className="chat-text">{parseChatMessage(typedOutMessage)}</div>
          <div className="tag">Vagabond</div>
        </div>
      </div>
    </div>
  );
};

export default Vagabond;
