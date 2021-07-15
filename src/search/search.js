import React, {useState} from "react";

export const Search = () => {
    const [search, setSearch] = useState(null);

    /*
    MediaWiki API Demos
    Demo of `Search` module: Search for a text or title

    MIT License
*/

    let url = "https://en.wikipedia.org/w/api.php";

    const params = {
        action: "query",
        list: "search",
        srsearch: "Nelson Mandela",
        format: "json"
    };

    url = url + "?origin=*";
    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

    fetch(url)
        .then(function(response){return response.json();})
        .then(function(response) {
            if (response.query.search[0].title === "Nelson Mandela"){
                console.log("Your search page 'Nelson Mandela' exists on English Wikipedia" );
            }
        })
        .catch(function(error){console.log(error);});


    const onSubmit = () => {
        fetch(() => {

        })
    }

    return(
        <>
            <button onSubmit={}>Info o roślinie</button>
        </>
    );
}