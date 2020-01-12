import React from 'react'


import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

const COND_QUERY  = gql`
{
    conditions {
        name
        description
    }
}
`

function Condition({name, description}) {
    return (
        <>
            <td>{name}</td>
            <td>{description}</td>
        </>
    )
}

function ConditionSearch() {
    return (
        <div>
        <input></input>
        <button>Search</button>
        </div>
    )
}

export default function ConditionTable() {
    const {loading, error, data} = useQuery(COND_QUERY)
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error...</p>

    return (
        <>
        <ConditionSearch/>
        <table>
            <thead>
                <tr>
                    <th style={{paddingRight: '50px'}}>Name: </th>
                    <th>Description: </th>
                </tr>
            </thead>
            <tbody>
                {data.conditions
                    .map((condition, i) => 
                        <tr key={i}>
                            <Condition 
                                name={condition.name} 
                                description={condition.description} />
                        </tr>)}
            </tbody>
        </table>
        </>
    )
}