import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import supabase from "../supabase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = ({ Component, pageProps }: AppProps) => {
  supabase
    .channel("realtime: video post")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "VideoPost" },
      (payload) => {
        console.log(payload)
        toast.success("New video post added!");
      }
    )
    .subscribe();

  return (
    <SessionProvider session={pageProps.session}>
      <ToastContainer />
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default App;
