import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "90vh",
        padding: "24px",
      }}
    >
      {/* PASSPORT */}
      <Box
        sx={{
          background: "var(--surface)",
          borderRadius: "12px",
          width: "240px",
          padding: "20px",
          position: "relative",
          overflow: "hidden",
          mb: 3,
          border: "1px solid var(--border)",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography
            sx={{
              color: "#E8175D",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "2px",
            }}
          >
            TRIPNDER
          </Typography>
          <Typography sx={{ color: "#E8175D", fontSize: "11px" }}>
            TYPE: P
          </Typography>
        </Box>

        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "2px solid #E8175D",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 12px",
          }}
        >
          <Typography sx={{ color: "#E8175D", fontSize: "20px" }}>
            📍
          </Typography>
        </Box>

        <Typography
          sx={{
            color: "#E8175D",
            fontSize: "13px",
            fontWeight: 500,
            textAlign: "center",
            letterSpacing: "3px",
            mb: 2,
          }}
        >
          PASSPORT
        </Typography>

        <Box
          sx={{
            width: 70,
            height: 85,
            background: "var(--bg)",
            border: "1.5px solid #E8175D",
            borderRadius: "4px",
            margin: "0 auto 12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ fontSize: "36px" }}>👤</Typography>
        </Box>

        <Box sx={{ mb: 1 }}>
          <Typography
            sx={{
              color: "var(--text-secondary)",
              fontSize: "9px",
              letterSpacing: "1px",
            }}
          >
            SURNAME
          </Typography>
          <Typography
            sx={{ color: "var(--text)", fontSize: "11px", fontWeight: 500 }}
          >
            UNKNOWN
          </Typography>
        </Box>
        <Box sx={{ mb: 1 }}>
          <Typography
            sx={{
              color: "var(--text-secondary)",
              fontSize: "9px",
              letterSpacing: "1px",
            }}
          >
            GIVEN NAME
          </Typography>
          <Typography
            sx={{ color: "var(--text)", fontSize: "11px", fontWeight: 500 }}
          >
            TRAVELER
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Box>
            <Typography
              sx={{
                color: "var(--text-secondary)",
                fontSize: "9px",
                letterSpacing: "1px",
              }}
            >
              DATE OF EXPIRY
            </Typography>
            <Typography
              sx={{ color: "#E8175D", fontSize: "11px", fontWeight: 500 }}
            >
              29 MAY 2026
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                color: "var(--text-secondary)",
                fontSize: "9px",
                letterSpacing: "1px",
              }}
            >
              PAGE
            </Typography>
            <Typography
              sx={{ color: "var(--text)", fontSize: "11px", fontWeight: 500 }}
            >
              404
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            background: "var(--bg)",
            borderRadius: "4px",
            padding: "6px",
            mt: 1,
            fontFamily: "monospace",
            fontSize: "8px",
            color: "var(--text-secondary)",
            letterSpacing: "1px",
            lineHeight: 1.8,
          }}
        >
          P&lt;TRIPNDER&lt;UNKNOWN&lt;&lt;TRAVELER&lt;&lt;&lt;&lt;&lt;&lt;
          <br />
          4040404040TRP0001011F0001010&lt;&lt;&lt;&lt;&lt;4
        </Box>

        {/* EXPIRED STAMP */}
        <Box
          sx={{
            position: "absolute",
            width: 80,
            height: 80,
            borderRadius: "50%",
            border: "3px solid rgba(232,23,93,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: "rotate(-20deg)",
            top: "100px",
            right: "10px",
          }}
        >
          <Typography
            sx={{
              color: "rgba(232,23,93,0.8)",
              fontSize: "9px",
              fontWeight: 500,
              textAlign: "center",
              letterSpacing: "1px",
              lineHeight: 1.4,
            }}
          >
            PAGE
            <br />
            NOT
            <br />
            FOUND
          </Typography>
        </Box>
      </Box>

      <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
        Your passport has expired
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "var(--text-secondary)",
          textAlign: "center",
          maxWidth: "260px",
          mb: 3,
        }}
      >
        This page doesn't exist — or maybe it's traveling somewhere without you.
      </Typography>
      <Button
        variant="contained"
        size="large"
        onClick={() => navigate("/")}
        sx={{ borderRadius: "50px", padding: "12px 32px" }}
      >
        Take me home
      </Button>
    </Box>
  );
}

export default NotFoundPage;
