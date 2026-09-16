import enviroment from "@/config/enviroment";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWTExtended, SessionExtended, UserExtended } from "@/types/Auth";
import authServices from "@/services/auth.service";

export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  secret: enviroment.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        identifier: { label: "identifier", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials): Promise<UserExtended | null> {
        if (!credentials?.identifier || !credentials?.password) {
          return null;
        }

        try {
          const { identifier, password } = credentials;

          // 1. Request Login ke Backend API
          const result = await authServices.login({ identifier, password });

          // Ambil token dari response backend (sesuai struktur objek backend)
          const responseData = result.data?.data;
          const accessToken =
            typeof responseData === "string"
              ? responseData
              : responseData?.token || responseData?.accessToken;

          if (!accessToken) {
            console.error("Access token tidak ditemukan");
            return null;
          }

          // 2. Request User Profile menggunakan token
          const me = await authServices.getProfileWithToken(accessToken);
          const user = me.data?.data;

          if (user && (user._id || user.id)) {
            user.accessToken = accessToken;
            return user;
          }

          return null;
        } catch (error: any) {
          // Tangkap error API 400/401 agar NextAuth mengembalikan 401 secara bersih
          console.error(
            "Authorize Error:",
            error?.response?.data || error.message,
          );
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWTExtended;
      user: UserExtended | null;
    }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: SessionExtended;
      token: JWTExtended;
    }) {
      session.user = token.user;
      session.accessToken = token.user?.accessToken;
      return session;
    },
  },
});
