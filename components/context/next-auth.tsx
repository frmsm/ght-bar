import React, { useState, useEffect } from "react";
import Spinner from "components/spinner";
import Router from "next/router";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";

export const NextAuthContext = React.createContext({});

export const NextAuthProvider: React.FC<any> = ({ children }) => {
    const { data: session, status } = useSession();
    const [pending, setPending] = useState(true);

    useEffect(() => {
        if (status === "loading") {
            return;
        }

        const pathname = Router.pathname.toLowerCase();
        if (status === "authenticated") {
            if (pathname === "/login" || pathname === "/signup") {
                window.location.replace("/");
            } else {
                setPending(false);
            }
        } else {
            if (pathname === "/login" || pathname === "/signup") {
                setPending(false);
            } else {
                window.location.replace("/login");
            }
        }
    }, [status]);

    useEffect(() => {
        const handlePageChangeComplete = () => setPending(false);
        const handlePageChangeStart = () => setPending(true);

        Router.events.on("routeChangeStart", handlePageChangeStart);
        Router.events.on("routeChangeComplete", handlePageChangeComplete);

        return () => {
            Router.events.off("routeChangeStart", handlePageChangeStart);
            Router.events.off("routeChangeComplete", handlePageChangeComplete);
        };
    }, []);

    if (pending) {
        return <Spinner />;
    }

    return (
        <NextAuthContext.Provider value={{ session }}>
            {children}
        </NextAuthContext.Provider>
    );
};

// export async function getServerSideProps(context) {
//     const session = await getSession(context);

//     if (!session) {
//         return {
//             redirect: {
//                 destination: "/",
//                 permanent: false,
//             },
//         };
//     }

//     return {
//         props: { session },
//     };
// }
