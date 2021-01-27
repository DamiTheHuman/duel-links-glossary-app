/** The message to send to the user based on the action */
const message = (action, topicCard) => {
  switch (action) {
    case 0:
      return "Welcome to the Yu-gi-oh-pedia! You can search for any card within duel links realm. Feel free to use the search box or the character icons below to help jumpstart your quest for the best cards.";
    case 1:
      if (topicCard.race === "Divine-Beast") {
        return `This is the legendary | ${topicCard.name} |! `;
      }
      if (topicCard.type === "Normal Monster") {
        return `Eh, Vanilla Monsters  dont get enough love isnt that right | ${topicCard.name} | `;
      } else if (topicCard.type === "Effect Monster") {
        return `Thats an intresting effect | ${topicCard.name} | has it might be nice to have.`;
      } else if (
        topicCard.type === "Fusion Monster" ||
        topicCard.type === "Ritual Effect Monster"
      ) {
        return `This card | ${topicCard.name} | is a fusion so it requires multiple cards to summon but is it worth it?`;
      } else if (topicCard.type === "Ritual Monster") {
        return `This is a ritual monsters offer your other monsters to unleash | ${topicCard.name} |!`;
      } else if (topicCard.type === "Toon Monster") {
        return `Use toon world to unlock these cards | ${topicCard.name} | true potential! `;
      } else if (topicCard.type === "Synchro Monster") {
        return `Use the power of Synchro Summoning to bring out | ${topicCard.name} |! `;
      } else if (topicCard.type === "XYZ Monster") {
        return `Use multiple cards of the same levels to bring out | ${topicCard.name} |! `;
      } else if (topicCard.type === "Link Monster") {
        return `Use link material to bring out | ${topicCard.name} |! `;
      } else if (topicCard.type === "Pendulum Effect Monster") {
        return `Activate | ${topicCard.name} | from the pendulum zone and put the duel in your favour! Or as a monster card choice is yours `;
      } else if (topicCard.type === "Spell Card") {
        return `Thats a strong spell | ${topicCard.name} |.`;
      } else if (topicCard.type === "Trap Card") {
        return `If there is one thing your opponent hates its a good trap card and | ${topicCard.name} | this can be just that.`;
      } else if (topicCard.type === "Token") {
        return `Token cards have their use, is | ${topicCard.name} | what you're looking for?`;
      }
      break;
    default:
      return "";
  }
};

export default message;
