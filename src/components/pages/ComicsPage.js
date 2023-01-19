import {Helmet, HelmetProvider} from 'react-helmet-async';
import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";

const ComicsPage = () => {
    return (
        <HelmetProvider>
            <>
                <Helmet>
                    <meta
                        name='description'
                        content='Page with list of Marvel comics'/>
                    <title>Comics page</title>
                </Helmet>
                <AppBanner/>
                <ComicsList/>
            </>
        </HelmetProvider>
    )
}

export default ComicsPage;