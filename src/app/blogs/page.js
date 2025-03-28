import { auth } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";

export default function Blogs() {
    const [mail, setMail] = useState("")

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setMail(user.email);
    } else {
      console.log("user is not logged in");
    }
  });

  return (
    <div>
      <h1>Blogs</h1>
      <h1>{mail}</h1>
    </div>
  );
}
