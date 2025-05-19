import MainArticle from "./components/heropage";
import ArticlesSection from "./components/article";
import Popular from "./components/mostpupolar";
import Partners from "./components/Partners";
export default function LandingPage() {
    return(
        <>
        <MainArticle />
        <Popular />
        <ArticlesSection />
        <Partners />
        </>
    );
}