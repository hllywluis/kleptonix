import { useEffect } from "react"
import Router from "next/router"
import useSWR from "swr"

export default useUser = ({
    redirectTo = "",
    redirectIfFound = false,
} = {}) => {
    const { data: user, mutate: mutateUser } = useSWR("/api/fetch_user")

    useEffect(() => {
        // If no redirect is needed, then just return (if a user is already on homepage, for example).
        // If user data isn't ready yet (fetch is still in progress) then don't do anything yet.
        if (!redirectTo || !user) {
            return
        }

        if ((redirectTo && !redirectIfFound && !user?.isLoggedIn) || (redirectIfFound && user?.isLoggedIn)) {
            Router.push(redirectTo)
        }
    }, [user, redirectIfFound, redirectTo])

    return { user, mutateUser }
}