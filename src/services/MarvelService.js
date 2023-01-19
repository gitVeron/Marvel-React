import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const {loading, request, error, clearError, process, setProcess} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=60c8a5621c8d1275288ffea3ad425672';
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
        let descr = '';

        if (char.description) {
            if (char.description.length > 225) {
                descr = char.description.slice(0, 225) + '...';
            } else {
                descr = char.description;
            }
        } else {
            descr = 'There is no description for this character';
        }

        return {
            id: char.id,
            name: char.name,
            description: descr,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const _transformComics = (com) => {
        return {
            id: com.id,
            title: com.title,
            description: com.description,
            thumbnail: com.thumbnail.path + '.' + com.thumbnail.extension,
            pageCount: com.pageCount,
            language: com.textObjects.language || 'en-us',
            homepage: com.urls[0].url,
            price: com.prices.price ? `${com.prices.price}$` : 'not available'
        }
    }

    return {loading, error, clearError, process, setProcess, getAllCharacters, getCharacter, getAllComics, getComic, getCharacterByName}
}

export default useMarvelService;