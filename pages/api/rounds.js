export async function handler(req, res) {
    const { round } = req.query; // Get the round number from the query
  
    try {
      // Hardcoded fallback data
      const hardcodedChallenges = {
        1: {
          x: 150,
          y: 220,
          imageUrl: "https://images.app.goo.gl/MpE87dAPdWN4tnmL9",
        },
        2: {
          x: 320,
          y: 180,
          imageUrl: "https://images.app.goo.gl/MpE87dAPdWN4tnmL9",
        },
        3: {
          x: 80,
          y: 300,
          imageUrl: "https://images.app.goo.gl/MpE87dAPdWN4tnmL9",
        },
      };
  
      const roundNumber = parseInt(round);
      if (!hardcodedChallenges[roundNumber]) {
        return res.status(400).json({ message: 'Invalid round' });
      }
  
      const roundData = hardcodedChallenges[roundNumber];
  
      return res.status(200).json(roundData); // Return the data for the selected round
    } catch (error) {
      console.error('Error fetching round data:', error);
      res.status(500).json({ message: 'Error fetching round data' });
    }
  }