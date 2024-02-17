import { useEffect } from "react";

const useTitle = (title) => {

    useEffect(() => {
        const prevtitle = document.title;
        document.title=title

        return() => document.title = prevtitle //clean up func to set the originla title again

    },[title])

}
export default useTitle