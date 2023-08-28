"use client";
import "@/styles/navbar/index.css";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import TextsmsIcon from "@mui/icons-material/Textsms";
import PeopleIcon from "@mui/icons-material/People";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { NavbarRoutes } from "@/types";
import { useParams, usePathname, useRouter } from "next/navigation";
import { FormEvent, MouseEvent, useState } from "react";
import Link from "next/link";
import { IconButton } from "@mui/material";

const routes: NavbarRoutes[] = [
  {
    name: "Home",
    path: "/home",
    icon: <HomeIcon className="icon" />,
  },
  {
    name: "Posts",
    path: "/posts",
    icon: <TextsmsIcon className="icon" />,
  },
  {
    name: "Users",
    path: "/users",
    icon: <PeopleIcon className="icon" />,
  },
  {
    name: "Me",
    path: "/me",
    icon: <AccountCircleIcon className="icon" />,
  },
];

interface NavbarProps {
  children: React.ReactNode;
}

function Navbar({ children }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [sidenavIsOpen, setSidenavIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  /* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
  function openNav() {
    document.getElementById("sidebar-div")!.style.width = "200px";
    document.getElementById("main")!.style.marginRight = "200px";
    setSidenavIsOpen(true);
  }

  /* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
  function closeNav() {
    document.getElementById("sidebar-div")!.style.width = "0";
    document.getElementById("main")!.style.marginRight = "0";
    setSidenavIsOpen(false);
  }

  const handleChangeRouter = (path: string) => {
    router.push(path);
  };

  const onSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.length === 0) return;

    if (pathname === "/users") {
      router.push(`/users/search/${search}`);
      return;
    }
    router.push(`/posts/search/${search}`);
  };

  return (
    <div
      id="main"
      className="navbar-component-main column width-full height-full"
    >
      <div className="navbar bg-w-c height-80px width-full a-i-c sh-x-s j-c-s-b">
        <div className="logo a-i-c j-c-c">
          <Link href={"/home"}>
            <p className="logo-p p-f-s-700 t-d-l-u">POST.</p>
          </Link>
        </div>

        <form
          onSubmit={onSearch}
          className="input-search-form sh-x-s b-w-1px b-c b-r-5px a-i-c j-c-c padding-3px"
          style={{
            display: pathname === "/me" ? "none" : "flex",
            visibility: pathname === "/me" ? "hidden" : "visible",
          }}
        >
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="input-search padding-l-10px height-35px b-n"
            placeholder="Search user or post ... "
          />
          <IconButton type="button">
            <SearchIcon color="primary" />
          </IconButton>
        </form>

        <div className="routes-div j-c-s-a">
          {routes.map((route, i) => (
            <button
              onClick={() => router.push(route.path)}
              key={i}
              className="route-btn b-n bg-w-c c-2 font-s-16px"
            >
              {route.icon}
              <p
                className="c-2"
                style={{
                  textDecorationLine: pathname.includes(route.path)
                    ? "underline"
                    : "",
                }}
              >
                {route.name}
              </p>
            </button>
          ))}
        </div>

        <div
          id="sidebar-div"
          className="sidebar-div bg-w-c height-100vh padding-t-30px column sh-x-s gap-30px a-i-c j-c-f-s"
        >
          <a
            href="javascript:void(0)"
            className="closebtn font-s-40px"
            onClick={closeNav}
          >
            &times;
          </a>
          {routes.map((route) => (
            <a
              onClick={() => handleChangeRouter(route.path)}
              className="font-s-25px"
              style={
                pathname.includes(route.path)
                  ? {
                      textDecorationLine: "underline",
                      textDecorationColor: "#27b8f6",
                      color: "#27b8f6",
                      textDecorationThickness: "2px",
                      fontSize: "26px",
                    }
                  : {}
              }
              key={route.name}
            >
              {route.name}
            </a>
          ))}
        </div>

        <div
          className="open-menu-div padding-r-30px"
          onClick={openNav}
          hidden={sidenavIsOpen}
          style={
            sidenavIsOpen
              ? {
                  display: "none",
                  visibility: "hidden",
                }
              : {}
          }
        >
          <MenuIcon />
        </div>
      </div>
      <div className="children width-full">{children}</div>
    </div>
  );
}

export default Navbar;
