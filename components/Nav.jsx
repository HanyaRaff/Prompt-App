"use client";

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {

  const {data:session} = useSession()

  const [providers, setProviders] = useState(null)
  const [toggleDropdown, setToggleDropdown] = useState(false)

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();

    // const setUpProviders = async () =>{
    //   const res = await getProviders();

    //   setProviders(res)
    // }

    // setUpProviders();

  }, [])

  // console.log(providers);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image src="assets/assets/images/logo.svg"
          alt="promptopia img"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>


      {/* Desktop nav  */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link className="black_btn" href="/create-prompt">
              Create Post
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            <Link href={"/profile"}>
              <Image src={`${session?.user.image}`}
                width={37}
                height={37}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers && Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))
            }
          </>
        )}
      </div>

      {/* mobile nav  */}

      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image src={`${session?.user.image}`}
              width={37}
              height={37}
              className="rounded-full"
              onClick={() => {
                setToggleDropdown(prev => !prev)
              }}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link href={"/profile"}
                  className="dropdown_link"
                  onClick={() => { setToggleDropdown(false) }}
                >
                  My Profile
                </Link>
                <Link href={"/create-prompt"}
                  className="dropdown_link"
                  onClick={() => { setToggleDropdown(false) }}
                >
                  Create Prompt
                </Link>
                <button
                type="button"
                onClick={()=>signOut()}
                className="mt-5 black_btn w-full"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) :
          (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                  >
                    Sign In
                  </button>
                ))
              }
            </>
          )
        }
      </div>
    </nav>
  )
}

export default Nav