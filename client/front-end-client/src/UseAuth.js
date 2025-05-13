import { useState, useEffect } from "react"
import axios from "axios";
import { useNavigate } from "react-router";

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState()
  const [refreshToken, setRefreshToken] = useState()
  const [expiresIn, setExpiresIn] = useState()
  const navigate=useNavigate();
  useEffect(() => {
    axios
      .post("http://localhost:6996/login", {
        code,
      })
      .then(res => {
        setAccessToken(res.data.accessToken)
        setRefreshToken(res.data.refreshToken);
        localStorage.setItem("accessToken",res.data.accessToken);
        setExpiresIn(res.data.expiresIn)
        window.history.pushState({}, null, "/");
        navigate("/home")
      })
      .catch(() => {
        navigate("/login");
      })
  }, [code])

  useEffect(() => {
    if (!refreshToken || !expiresIn) return
    const interval = setInterval(() => {
      axios
        .post("http://localhost:6996/refresh", {
          refreshToken,
        })
        .then(res => {
          setAccessToken(res.data.accessToken)
          setExpiresIn(res.data.expiresIn)
          localStorage.setItem("accessToken",res.data.accessToken);
          navigate("/home")
        })
        .catch(() => {
          navigate("/login");
        })
    }, (expiresIn - 60) * 1000)

    return () => clearInterval(interval)
  }, [refreshToken, expiresIn])

  return accessToken
}