import { PrismaClient } from "@prisma/client";
import { Box, Typography, Button, IconButton, Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const prisma = new PrismaClient();

async function getLeaderboardEntries() {
  // Fetch leaderboard entries with unique scores, ordered by highest score
  const leaderboard = await prisma.leaderboard.findMany({
    include: {
      user: true, // Join the User table
      challenge: true, // Join the Challenge table
    },
    distinct: ['score'], // Ensure unique scores
    orderBy: {
      score: 'desc', // Sort by highest score
    },
    take: 3, // Limit to the top 3 distinct scores
  });

  return leaderboard;
}

export default async function LeaderboardPage() {
  const leaderboardEntries = await getLeaderboardEntries();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 4,
        backgroundColor: "#f9f9f9",
      }}
    >
      {/* Top Navigation (User Icon) */}
      <Box
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
        }}
      >
        <IconButton sx={{ color: "#003069" }} aria-label="User Profile">
          <Avatar sx={{ bgcolor: "#003069" }}>U</Avatar>
        </IconButton>
      </Box>

      {/* Title */}
      <Typography
        variant="h2"
        sx={{
          fontWeight: "bold",
          color: "#003069",
          textAlign: "center",
          marginTop: 10,
          marginBottom: 2,
          textShadow: "2px 2px 5px rgba(0,0,0,0.3)",
        }}
      >
        Leaderboard
      </Typography>

      {/* Table */}
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: "90%",
          margin: "auto",
          marginBottom: 4,
          border: "1px solid #e0e0e0",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", color: "#003069" }}>Rank</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#003069" }}>User</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#003069" }}>Challenge</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#003069" }}>Score</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#003069" }}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderboardEntries.map((entry, index) => (
              <TableRow key={entry.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{entry.user?.name}</TableCell>
                <TableCell>{entry.challenge?.title}</TableCell>
                <TableCell>{entry.score}</TableCell>
                <TableCell>{new Date(entry.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Footer */}
      <Box
        sx={{
          width: "100%",
          textAlign: "center",
          padding: 2,
          borderTop: "1px solid #e0e0e0",
          marginTop: 4,
        }}
      >
        <Button
          variant="outlined"
          sx={{
            borderColor: "#003069",
            color: "#003069",
            marginBottom: 1,
          }}
          href="/"
        >
          Back to Home
        </Button>
        <Typography variant="body2" color="textSecondary">
          © {new Date().getFullYear()} CarlGuessr
        </Typography>
      </Box>
    </Box>
  );
}

