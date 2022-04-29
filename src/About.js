import { Link, Outlet } from "react-router-dom";

export default function About() {
    return (
        <>
            <h1>Halaman About</h1>
            <p>Tentang kami lebih lanjut silakan klik link di bawah ini</p>
            <Link to="/about/team">Team</Link>
            <Outlet/>
        </>
    )
}