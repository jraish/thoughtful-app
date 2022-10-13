import React, { useState, useEffect } from 'react';
import './AuthSuccess.css';

const AuthSuccess = () => {
    const [repos, setRepos] = useState(null)

    const Repo = (props) => {
        const { repo } = props;

        return (
            <div className='repo' key={repo.name}>
                <a href={repo.url} >
                    <h3>{repo.name}</h3>
                </a>
                <p>{repo.language}</p>
            </div>
        )
    }

    useEffect(() => {
        fetch('https://api.github.com/users/jraish/repos')
            .then(response => response.json())
            .then(data => {
                setRepos(
                    data
                        .filter(x => x.visibility == "public")
                        .map(x => {
                            return {
                                "name": x.name,
                                "url": x.clone_url,
                                "language": x.language
                            }
                        }))
            })
            .catch(error => console.error(error))
    }, []);

    return (
        <div className='results'>
            <div className='intro'>
                <h2>Here are a few things I've been working on!</h2>
                <p>(Not all of these are finished! Not all of them even make sense.</p>
                <p>But click through to see some of the code I've written in the past.)</p>
            </div>
            <div className='repos'>
                {repos ? repos.map(repo => <Repo repo={repo} />) : <p>loading...</p>}
            </div>
        </div>
    )
}

export default AuthSuccess;
