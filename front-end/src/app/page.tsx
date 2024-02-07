"use client"

import { FormEvent, useState } from "react";
import axios from "axios";

export default function Home() {

  const [email, setEmail] = useState<string>('teste')
  const [password, setPassword] = useState<string>('dos guri')

  const login = (e: FormEvent) => {

    e.preventDefault()

    axios.post("http://localhost:8080/api/users/login", {
      email, password
    })
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  return (

    <form
      onSubmit={login}
    >
      <div>
        <label htmlFor="email">
          email
        </label>
        <input type="text" name="email" id="email" />
      </div>

      <div>
        <label htmlFor="email">
          password
        </label>
        <input type="text" name="password" id="password" />
      </div>

      <button type="submit">
        Login
      </button>
    </form>
  );
}
