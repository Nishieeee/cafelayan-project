import MainArticle from "./heropage";
import ArticlesSection from "./article";
import Popular from "./mostpupolar";
import Categories from "./categories";
export default function LandingPage() {
    return(
        <>
        <MainArticle />
        <Popular />
        <ArticlesSection />
        <Categories />
        </>
    );
}