const enviroment = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  AUTH_SECRET: process.env.NEXTAUTH_SECRET,
};

export default enviroment;
