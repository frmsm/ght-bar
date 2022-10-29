import React, { useContext } from "react";
import type { NextPage } from "next";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "components/context/auth";

const Profile: NextPage = () => {
    const [user, setUser] = useState<any>({});
    const ctx = useContext(AuthContext) as any;
    const uid = ctx.currentUser.displayName;

    const db = getDatabase();

    useEffect(() => {
        (async () => {
            const dataRef = ref(db, `users/${uid}`);
            onValue(dataRef, (snapshot) => {
                try {
                    const user = snapshot.val();
                    console.log(user);
                    setUser(user);
                } catch {
                    alert("no user");
                }
            });
        })();
    }, [db, uid]);

    return <div>{user?.username ?? "null"}</div>;
};

export default Profile;
