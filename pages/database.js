import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.location.href = "/database.html";
  }, []);
  return <p>Mengarahkan ke halaman HTML...</p>;
}
