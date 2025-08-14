import { Outlet } from "react-router";
import { Header } from "../sections/header/header";
import { Footer } from "../sections/footer/footer";
import { ChatAI } from "../sections/ai-chat/chat-ai";

export const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <ChatAI />
      <Footer />
    </>
  );
};
