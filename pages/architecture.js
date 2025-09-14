import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.location.href = "/architecture.html";
  }, []);
  return <p>Mengarahkan ke halaman HTML...</p>;
}
