import axios from "axios";
import authHeader from '../../AuthContext';

const url = "http://localhost:8080/api/"

export function logar(login) {
  return axios.post(`${url}usuario/login`, login, { headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2xlYXJuYnlkb2luZy5jb20iLCJ1c3VhcmlvIjoiZDhjYmZlOWYtMThiNC00OWJjLWI3MWItNzExNGM4OTZlNWQ4IiwiZXhwIjoxNjcxMDY3NzY3LCJlbWFpbCI6Imx1Y2FzX21vbml6QGhvdG1haWwuY29tIiwiaWF0IjoxNjcwNDYyOTY3LCJqdGkiOiJKVkE3OEVhZVhUcUp5UmJScjFPWXZRIn0.fcR6LkoWNWPh3DXJLlOJLr_HF9iywyhrhUx-c_ME-T_te7hNisUB38qM0Ad0Sm9PmgZJ5HChARjLVwX6w4xiLq2OnyVTM6gIEFIPsdkvSljmpAWJayU-c8jnj4iOhZMt7fEf5aYP1z_wk68liP9kA5FQVkRAsbogBg5w_NZ-f89KW1VpJbO9_LYHe4mDkQL0wLNQC2REhZO7pbMkR35nPy61G52jZKBY_N-lDc80hCZnwsKVbqEj71FFCVN532i1WSLhxWvNX7FJh6O4hMRsCDHDxSUTIA93mmxqhPWOhmgAMszA9U7J9jFAT4JcsaIoXicRtE49fKneQu28gx2ixg' } })
}


 
