import cors from "cors"

const corsOptions = {
  origin: "https://authproject-omega.vercel.app", // Vite dev server
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}

export default cors(corsOptions)
