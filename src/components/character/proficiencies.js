import React from 'react'
import {
    Switch,
    Link,
    Route,
    useRouteMatch,
    useParams
} from 'react-router-dom'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

const PROF_TYPES = gql`
{
    proficiencies {
        type
    }
}
`
const PROFS = gql`
{
    proficiencies(type:$type) {
        name
        classes
        races
    }
}
`

export default function ProficiencTypeList() {
    const {loading, error, data} = useQuery(PROF_TYPES)
    let match = useRouteMatch()

    if(loading) return <p>Loading...</p>
    if(error) return <p>Error</p>
    const types = data.proficiencies.reduce((accu, curr) => {
        if(!accu.includes(curr.type))
            accu.push(curr.type)
        return accu
    }, [])
    console.log(types)
    return (
        <>
            <ul>
                {types.map(type => 
                    <li key={type}>
                        <Link to={`${match.path}/${type}`}>{type}</Link>
                    </li>
                )}
            </ul>
            <Switch>
                <Route path={`${match.path}/:type`}>
                    <ProficiencyType />
                </Route>
                <Route path={match.path}>
                    <h2>Not a valid option</h2>
                </Route>
            </Switch>
        </>
    )
}

function Other() {
    let {type} = useParams()
    return <p>{type}</p>
}

function ProficiencyType() {
    let {type} = useParams()
    console.log(type)
    const {loading, error, data} = useQuery(PROFS, {
        variables: {type}
    })

    if(loading) return <p>Loading...</p>
    if(error) return <p>Error</p>
    return (
        <div>
            {data.proficiencies.map(prof =>
                <Proficiency prof={prof}/>
            )}
        </div>
    )

}

function Proficiency({prof}) {
    return (
        <li>
            <h3>Name: {prof.name}</h3>
            <p>type: {prof.type}</p>
            <p>Classes: </p>
            <ul>
                {(prof.classes.length) ? prof.classes.map((theClass, i) =>
                    <li key={i}>{theClass}</li>
                ) : <p></p>}
            </ul>
            <p>Races: </p>
            <ul>
                {(prof.races.length) ? prof.races.map((race, i) =>
                    <li key={i}>{race}</li>
                ) : <p></p>}
            </ul>
        </li>
    )
}